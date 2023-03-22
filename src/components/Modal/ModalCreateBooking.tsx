import React, { SetStateAction, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Logo from "../Logo/Logo";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  status?: string;
  setStep: React.Dispatch<React.SetStateAction<any>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateStatus: React.Dispatch<React.SetStateAction<any>>;
}

const ModalCreateBooking: React.FC<Props> = ({
  open = false,
  status,
  setStep,
  setIsCreate,
  setCreateStatus,
}) => {
  const styles = {
    container: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "white",
      borderRadius: "16px",
      padding: "16px",
    },

    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "300px",
      height: "260px",
    },

    icon: { width: "calc(100px + 19.67%)", height: "calc(100px + 19.67%)" },
    success: { color: "#28a745" },
    error: { color: "#dc3545" },

    link: {
      textDecoration: "none",
    },

    btnContent: {
      margin: "16px",
      width: "calc(100% - 16px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    continueBtn: {
      color: "#231f20",
      backgroundColor: "#ff720d",
      "&:hover": {
        backgroundColor: "#231f20",
        color: "#ff720d ",
      },
    },
    homeBtn: {
      color: "#ff720d",
      border: "1px solid #ff720d",
      "&:hover": {
        backgroundColor: "0",
        border: "1px solid #ff720d",
      },
    },
  };

  const renderStatus = () => {
    switch (status) {
      case "success":
        return <CheckCircleOutlineIcon sx={[styles.icon, styles.success]} />;
      case "error":
        return <HighlightOffIcon sx={[styles.icon, styles.error]} />;
      default:
        return <CircularProgress size={"100px"} />;
    }
  };

  return (
    <Modal open={open}>
      <Box sx={styles.container}>
        <Box sx={styles.content}>
          {/* <Logo width="80px" height="80px" /> */}
          {renderStatus()}
          {status === "error" && (
            <Typography variant="h6" component="h2">
              Có lỗi vui lòng liên hệ tổng đài!
            </Typography>
          )}
          <Box sx={styles.btnContent}>
            <Link to="/" style={styles.link}>
              <Button sx={styles.homeBtn} variant="outlined">
                Trang chủ
              </Button>
            </Link>
            {status === "success" && (
              <Button
                sx={styles.continueBtn}
                variant="contained"
                onClick={() => {
                  setStep(0);
                  setIsCreate(false);
                  setCreateStatus("");
                }}
              >
                Đặt tiếp
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCreateBooking;
