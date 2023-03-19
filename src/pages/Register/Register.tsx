import React, { memo } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
  };
  return (
    <Box sx={styles.container}>
      <Paper sx={styles.content}>
        <Typography sx={styles.title} variant="h4" gutterBottom>
          Đăng ký
        </Typography>
        <Box sx={styles.form}>
          <TextField
            id="name"
            label="Họ tên"
            defaultValue=""
            variant="standard"
          />
          <TextField
            id="email"
            label="Email"
            defaultValue=""
            variant="standard"
          />

          <TextField
            id="password"
            label="Mật khẩu"
            type="password"
            variant="standard"
          />
          <Button sx={styles.btn}>Đăng ký ?</Button>
          <Link to="/login">
            <Button sx={styles.register}>Đăng nhập</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default memo(Register);
