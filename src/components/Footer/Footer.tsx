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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
            <Typography variant="body2" sx={styles.styleLeft.subtitle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, et.
            </Typography>
            <Typography variant="body2" sx={styles.styleLeft.subtitle}>
              GPĐK: 0102721191 cấp ngày 09/04/2008
            </Typography>
            <Typography variant="body2" sx={styles.styleLeft.subtitle}>
              ĐT: 043 222 3000 Email: support.hn@ggg.com.vn
            </Typography>
          </Box>
          <Box sx={styles.styleRight}>
            <Typography variant="subtitle2">
              © 2011 Golden Gate ., JSC. All rights reserved
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
