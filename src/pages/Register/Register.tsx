import React, { CSSProperties, memo, useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { decodeToken } from "react-jwt";
import moment from "moment";

import ModalRegister from "../../components/Modal/ModalRegister";

import utils from "../../utils";
import services from "../../services";

import { setUser } from "../../features/user/userSlice";

const Register = () => {
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errMes, setErrMes] = useState<{
    username: string;
    email: string;
    password: string;
    err: string;
  }>({ username: "", email: "", password: "", err: "" });

  const [form, setForm] = useState<{
    email: string;
    username: string;
    password: string;
  }>({ email: "", username: "", password: "" });

  const handleRegister = (e: React.BaseSyntheticEvent<any>) => {
    e.preventDefault();

    // Check data is correct
    const checkData = () => {
      // Check isEmpty
      if (!form.email || !form.password || !form.username) {
        if (!form.email)
          setErrMes((prev) => ({ ...prev, email: "Không được để trống!" }));
        if (!form.password)
          setErrMes((prev) => ({ ...prev, password: "Không được để trống!" }));
        if (!form.username)
          setErrMes((prev) => ({ ...prev, username: "Không được để trống!" }));

        return false;
      }

      // Validate
      if (form.email || form.password) {
        if (form.username.length < 4) {
          setErrMes((prev) => ({
            ...prev,
            username: "Tên khách hàng phải có ít nhất 4 ký tự!",
          }));
          return false;
        }
        if (!utils.validateEmail(form.email)) {
          setErrMes((prev) => ({ ...prev, email: "Email không hợp lệ!" }));
          return false;
        }
        if (form.password.length < 8) {
          setErrMes((prev) => ({
            ...prev,
            password: "Mật khẩu phải có ít nhất 8 ký tự!",
          }));
          return false;
        }

        return true;
      }

      return true;
    };
    if (checkData())
      services
        .register(form)
        .then((res) => {
          // Set open Modal
          setIsOpenModal(true);
        })
        .catch((err) => {
          const status = err.response.status;

          switch (status) {
            case 400:
              setErrMes((prev) => ({
                ...prev,
                err: "Tài khoản đã tồn tại!",
              }));
              break;

            default:
              break;
          }
        });
  };

  const handleLogin = () => {
    services.login(form).then((res) => {
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
    });
  };

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.content}>
        <Typography sx={styles.title} variant="h4" gutterBottom>
          Đăng ký
        </Typography>
        <form style={styles.form as CSSProperties} onSubmit={handleRegister}>
          <TextField
            label="Họ tên"
            value={form.username}
            variant="standard"
            error={!!errMes!.username}
            helperText={errMes!.username}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, username: e.target.value }));
              if (!e.target.value) {
                setErrMes((prev) => ({
                  ...prev,
                  username: "Không được để trống!",
                }));
              } else setErrMes((prev) => ({ ...prev, username: "" }));
            }}
          />
          <TextField
            label="Email"
            variant="standard"
            value={form.email}
            error={!!errMes!.email}
            helperText={errMes!.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              if (!e.target.value) {
                setErrMes((prev) => ({
                  ...prev,
                  email: "Không được để trống!",
                }));
              } else setErrMes((prev) => ({ ...prev, email: "" }));
            }}
          />

          <TextField
            label="Mật khẩu"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={form.password}
            error={!!errMes!.password}
            helperText={errMes!.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
              if (!e.target.value) {
                setErrMes((prev) => ({
                  ...prev,
                  password: "Không được để trống!",
                }));
              } else setErrMes((prev) => ({ ...prev, password: "" }));
            }}
          />
          <Button type="submit" sx={styles.btn}>
            Đăng ký ?
          </Button>
          <Link to="/login">
            <Button sx={styles.register}>Đăng nhập</Button>
          </Link>
          <span style={styles.err}>{errMes.err}</span>
        </form>
        <ModalRegister
          open={isOpenModal}
          name={form.username}
          handleLogin={handleLogin}
        />
      </Paper>
    </Box>
  );
};

export default memo(Register);
