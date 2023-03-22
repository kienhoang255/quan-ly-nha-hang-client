import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  open?: boolean;
}

const ModalRequiredLogin: React.FC<Props> = ({ open = false }) => {
  const style = {
    container: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "white",
      borderRadius: "16px",
      padding: "16px",
    },
    title: {
      display: "grid",
      placeItems: "center",
    },
    action: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      textDecoration: "none",
    },
    btnLogin: {
      color: "#231f20",
      backgroundColor: "#ff720d",
      margin: "0 0 10px 0",
      "&:hover": {
        backgroundColor: "#231f20",
        color: "#ff720d ",
      },
    },
    btnHome: {
      color: "#ff720d",
      border: "1px solid #ff720d",
      "&:hover": {
        backgroundColor: "0",
        border: "1px solid #ff720d",
      },
    },
    link: {
      textDecoration: "none",
    },
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.container}>
          <Typography variant="h4" component="h2" gutterBottom sx={style.title}>
            Thông báo
          </Typography>
          <Typography sx={{ m: 2 }} gutterBottom>
            Vì chính sách mới, quý khách cần đăng nhập trước khi đặt bàn
          </Typography>
          <Box sx={style.action}>
            <Link to="/" style={style.link}>
              <Button sx={style.btnHome} variant="outlined">
                Trang chủ
              </Button>
            </Link>
            <Link to="/login" style={style.link}>
              <Button sx={style.btnLogin} variant="contained">
                Đăng nhập
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalRequiredLogin;
