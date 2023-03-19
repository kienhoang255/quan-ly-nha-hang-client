import { Container, Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useAppSelector } from "../store/hooks";

interface Props {}

const MainLayout: React.FC<Props> = () => {
  const userId = useAppSelector((state) => state.user._id);
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    content: {
      margin: "20px 0",
      flexGrow: "1",
    },
  };

  const login = useMemo(() => {
    let value;
    document.cookie
      .split(";")
      .map((e) => e.split("="))
      .forEach((e) =>
        e[0].trim() === "token" ? (value = e[1]) : (value = undefined)
      );
    return value;
  }, [userId]);

  return (
    <Box sx={styles.container}>
      <Header login={login!} />
      <Container sx={styles.content} maxWidth="lg">
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
