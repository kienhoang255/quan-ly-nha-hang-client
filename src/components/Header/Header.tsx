import {
  AppBar,
  Button,
  Toolbar,
  Container,
  Divider,
  Box,
} from "@mui/material";
import React from "react";
import Logo from "../Logo/Logo";
import SlideBar from "../SlideBar/SlideBar";

import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import UserBtn from "../UserBtn/UserBtn";

interface Props {
  login?: string | undefined;
}

const Header: React.FC<Props> = ({ login }) => {
  const styles = {
    styleAppBar: {
      backgroundColor: "white",
      borderRadius: "0 0 5px 5px",
      maxWidth: { sm: "sm", md: "md", lg: "100%" },
      margin: "0 auto",
      height: { xs: "60px", sm: "60px", md: "92px", lg: "92px" },
    },

    topHeader: {
      height: "30px",
      position: "absolute",
      left: "0",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
      width: "100%",
      display: { xs: "none", sm: "none", md: "block", lg: "block" },
      content: {
        height: "100%",
        display: "flex",
        justifyContent: "end",
        gap: "20px",
        alignItems: "center",
        "a:last-child": {
          paddingRight: "12px",
        },
      },
      btn: {
        textDecoration: "none",
        color: "gray",
      },
    },

    toolBar: {
      padding: "0px !important",
      marginTop: { xs: "0", sm: "0", md: "30px" },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    styleListBtn: {
      flexGrow: 1,
      display: "flex",
      justifyContent: { xs: "end", sm: "end", md: "center", lg: "center" },
      margin: "0 15px 0 0",
    },

    styleLink: {
      textDecoration: "none",
      color: "black",
    },

    styleBtn: {
      fontSize: "16px",
      padding: "16px 48px",
      fontWeight: "600",
      display: { xs: "none", sm: "none", md: "block" },
      color: "black",
      ":hover": {
        backgroundColor: "transparent",
        color: "#ff720d",
      },
      textTransform: "capitalize",
    },
    login: {
      display: { xs: "flex", sm: "flex", md: "none" },
    },
  };

  return (
    <AppBar position="sticky" sx={styles.styleAppBar}>
      <Container maxWidth="lg">
        <Box sx={styles.topHeader}>
          <Container maxWidth="lg" sx={styles.topHeader.content}>
            {login ? (
              <UserBtn />
            ) : (
              <>
                <Link to="/register" style={styles.topHeader.btn}>
                  Đăng ký
                </Link>
                <Divider orientation="vertical" flexItem />
                <Link to="/login" style={styles.topHeader.btn}>
                  Đăng nhập
                </Link>
              </>
            )}
          </Container>
        </Box>
        <Toolbar sx={styles.toolBar}>
          <Logo />
          <Box sx={styles.styleListBtn}>
            <Link to="/" style={styles.styleLink}>
              <Button sx={styles.styleBtn}>Trang Chủ</Button>
            </Link>
            <Link to="/menu" style={styles.styleLink}>
              <Button sx={styles.styleBtn}>Thực Đơn</Button>
            </Link>
            <Link to="/booking" style={styles.styleLink}>
              <Button sx={styles.styleBtn}>Đặt Bàn</Button>
            </Link>
            {login ? (
              <Box sx={styles.login}>
                <UserBtn />
              </Box>
            ) : (
              <Link to="/login" style={styles.styleLink}>
                <Button sx={styles.login}>
                  <PersonIcon />
                </Button>
              </Link>
            )}
          </Box>
          <SlideBar anchor={"right"} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
