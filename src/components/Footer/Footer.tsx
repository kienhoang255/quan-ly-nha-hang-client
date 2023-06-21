import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const styles = {
    container: {
      // position: { sm: "none", md: "absolute" },
      left: "0px",
      bottom: "0px",
      backgroundColor: "#231f20",
      height: { sm: "auto", md: "180px" },
      color: "white",
      width: "100%",
      maxWidth: { sm: "sm", md: "100%" },
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
    },

    content: {
      display: "grid",
      gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
    },
    styleLeft: {
      margin: "20px 0",
      name: {},
      subtitle: {
        color: "gray",
      },
    },
    styleRight: {
      margin: "20px 0",
      display: "flex",
      justifyContent: "flex-end",
    },
  };
  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        <Box sx={styles.content}>
          <Box sx={styles.styleLeft}>
            <Typography variant="h6" gutterBottom>
              CÔNG TY CỔ PHẦN TẬP ĐOÀN MỘT THÀNH VIÊN
            </Typography>
            <Typography variant="body2" sx={styles.styleLeft.subtitle}>
              Trụ sở: 180 Cao Lỗ, Phường 4, Quận 8, TPHCM.
            </Typography>
            <Typography variant="body2" sx={styles.styleLeft.subtitle}>
              Luận văn tốt nghiệp 08/2023
            </Typography>
            <Typography variant="body2" sx={styles.styleLeft.subtitle}>
              Email: DH51804901@student.stu.edu.vn
            </Typography>
          </Box>
          <Box sx={styles.styleRight}>
            <Typography variant="subtitle2">
              © 2023 STU Ho Chi Minh City University of Technology and Education
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
