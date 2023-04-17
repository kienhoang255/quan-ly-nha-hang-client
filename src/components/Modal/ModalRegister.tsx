import React, { FC } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  name: string;
  handleLogin: Function;
}

const ModalRegister: React.FC<Props> = ({
  open,
  name = "bạn",
  handleLogin,
}) => {
  const styles = {
    container: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      height: 300,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    placeCenter: {
      display: "grid",
      placeItems: "center",
    },

    name: {
      textTransform: "capitalize",
    },

    action: { width: "100%", display: "flex", justifyContent: "space-around" },

    loginBtn: {
      color: "black",
      border: "1px solid #ff720d",
      backgroundColor: "#ff720d",
      "&:hover": {
        color: "#ff720d",
        backgroundColor: "black",
        border: "1px solid black",
      },
    },

    homeBtn: {
      border: "1px solid #ff720d",
      color: "#ff720d",
      "&:hover": {
        color: "black",
        border: "1px solid black",
      },
    },
  };
  return (
    <Modal open={open}>
      <Box sx={styles.container}>
        <Typography sx={styles.placeCenter} variant="h6" component="h2">
          Đăng ký tài khoản thành công!
        </Typography>
        <Box sx={styles.placeCenter}>
          <Logo height="100px" width="100px" />
        </Box>
        <Typography sx={styles.placeCenter}>
          Chào mừng bạn đến với nhà hàng của chúng tôi
        </Typography>
        <Box sx={styles.action}>
          <Link to="/" style={{ outline: "none", textDecoration: "none" }}>
            <Button sx={styles.homeBtn} variant="outlined">
              Trang chủ
            </Button>
          </Link>
          <Button
            sx={styles.loginBtn}
            variant="contained"
            onClick={() => handleLogin()}
          >
            Đăng nhập ngay
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalRegister;
