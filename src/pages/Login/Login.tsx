import React, {
  CSSProperties,
  FormEvent,
  SyntheticEvent,
  memo,
  useState,
} from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import services from "../../services";
import { decodeToken } from "react-jwt";
import moment from "moment";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../features/user/userSlice";

const Login = () => {
  const styles = {
    container: {
      height: "676px",
      width: "100%",
      display: "flex",
      placeItems: "center",
      placeContent: "center",
    },
    content: {
      width: "400px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      borderRadius: "8px",
      position: "relative",
    },
    title: {
      textAlign: "center",
      textTransform: "uppercase",
      color: "#ff720d ",
    },
    form: {
      height: "300px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    btn: {
      color: "#231f20",
      backgroundColor: "#ff720d",
      "&:hover": {
        backgroundColor: "#231f20",
        color: "#ff720d ",
      },
    },
    register: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    err: {
      color: "red",
      fontSize: "18px",
      display: "grid",
      placeItems: "center",
    },
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errMes, setErrMes] = useState<{
    email: string;
    password: string;
    err: string;
  }>({
    email: "",
    password: "",
    err: "",
  });

  const handleSubmit = (e: React.BaseSyntheticEvent<any>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());

    // Check data is empty
    const checkData = () => {
      if (!form.email || !form.password) {
        if (!form.email)
          setErrMes((prev) => ({ ...prev, email: "Không được để trống!" }));
        if (!form.password)
          setErrMes((prev) => ({ ...prev, password: "Không được để trống!" }));
        return false;
      }

      return true;
    };

    if (checkData())
      services
        .login(form)
        .then((res) => {
          const { createToken, ...rest } = res.data;
          const decodedToken: any = decodeToken(createToken);
          // Create time expire for cookie base on TOKEN
          const expired = new Date(
            moment.unix(decodedToken.exp).format("YYYY-MM-DD HH:mm:ss")
          ).toUTCString();

          // Set userInfo to redux
          dispatch(
            setUser({
              _id: decodedToken._id,
              username: decodedToken.username,
              ...rest,
            })
          );

          // Set to cookie
          document.cookie = `token_cus=${createToken}; expires=${expired}`;

          //Redirect to / (booking page)
          navigate("/booking");
        })
        .catch((err) => {
          const status = err.response.status;

          switch (status) {
            case 402:
              setErrMes((prev) => ({
                ...prev,
                err: "Quý khách lần đầy sử dụng website, vui lòng đăng ký email/sdt vừa nhập",
              }));
              break;
            case 404:
              setErrMes((prev) => ({
                ...prev,
                err: "Email không tồn tại hoặc mật khẩu không chính xác!",
              }));
              break;

            default:
              setErrMes((prev) => ({
                ...prev,
                err: "Email/số điện thoại không xác định!",
              }));
              break;
          }
        });
  };
  return (
    <Box sx={styles.container}>
      <Paper sx={styles.content}>
        <Typography sx={styles.title} variant="h4" gutterBottom>
          Đăng nhập
        </Typography>
        <form style={styles.form as CSSProperties} onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            defaultValue=""
            variant="standard"
            error={!!errMes!.email}
            helperText={errMes!.email}
            onChange={(e) => {
              if (!e.target.value) {
                setErrMes((prev) => ({
                  ...prev,
                  email: "Không được để trống!",
                }));
              } else setErrMes((prev) => ({ ...prev, email: "" }));
            }}
          />
          <TextField
            name="password"
            label="Mật khẩu"
            type="password"
            variant="standard"
            error={!!errMes!.password}
            helperText={errMes!.password}
            onChange={(e) => {
              if (!e.target.value) {
                setErrMes((prev) => ({
                  ...prev,
                  password: "Không được để trống!",
                }));
              } else setErrMes((prev) => ({ ...prev, password: "" }));
            }}
          />
          <Button type="submit" sx={styles.btn}>
            Đăng nhập
          </Button>
          <Link to="/register">
            <Button sx={styles.register}>Đăng ký ?</Button>
          </Link>
          <span style={styles.err}>{errMes.err}</span>
        </form>
      </Paper>
    </Box>
  );
};

export default memo(Login);
