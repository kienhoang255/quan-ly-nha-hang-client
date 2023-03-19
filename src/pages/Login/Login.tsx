import React, { CSSProperties, FormEvent, SyntheticEvent, memo } from "react";
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
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.BaseSyntheticEvent<any>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());

    services.login(form).then((res) => {
      const decodedToken: any = decodeToken(res.data.createToken);
      // Create time expire for cookie base on TOKEN
      const expired = new Date(
        moment.unix(decodedToken.exp).format("YYYY-MM-DD HH:mm:ss")
      ).toUTCString();

      // Set userInfo to redux
      dispatch(
        setUser({ _id: decodedToken._id, username: decodedToken.username })
      );

      // Set to cookie
      document.cookie = `token=${res.data.createToken}; expires=${expired}`;

      //Redirect to / (main page)
      navigate("/");
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
          />
          <TextField
            name="password"
            label="Mật khẩu"
            type="password"
            variant="standard"
          />
          <Button type="submit" sx={styles.btn}>
            Đăng nhập
          </Button>
          <Link to="/register">
            <Button sx={styles.register}>Đăng ký ?</Button>
          </Link>
        </form>
      </Paper>
    </Box>
  );
};

export default memo(Login);
