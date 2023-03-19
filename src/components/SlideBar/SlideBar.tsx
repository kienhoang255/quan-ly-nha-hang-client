import React, { useState } from "react";
import { Drawer, IconButton, Box, Button, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { listPages } from "../../routes/listPages";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  anchor?: any;
}

const defaultProps: Props = {
  anchor: "right",
};

const SlideBar: React.FC<Props> = ({ anchor }) => {
  const styles = {
    container: {
      width: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
    },
    btnLink: {
      textDecoration: "none",
      width: "100%",
    },
    bottomBtn: {
      position: "absolute",
      bottom: "0px",
      left: "0px",
      backgroundColor: "#ff720d",
      width: "100%",
      height: "50px",
      borderRadius: "0px",
      "&:hover": {
        backgroundColor: "#231f20",
        color: "#ff720d ",
      },
    },
    pagesBtn: {
      // textAlign: "left",
      padding: "32px 90px 0 40px",
    },
    closeBtn: {
      width: "auto",
      height: "40px",
      fontSize: "32px",
      padding: "55px 90px 24px 0",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    closeIcon: {
      marginRight: "90px",
      fontSize: "32px",
    },
  };
  const [isOpen, setOpen] = useState(false);

  const pagesBtn = listPages.map((e, key) => (
    <Link key={key} style={styles.btnLink} to={e.path}>
      <Button
        sx={{
          color: "black",
          fontWeight: "bold",
          width: "100%",
          justifyContent: "start",
        }}
        onClick={() => setOpen(!isOpen)}
      >
        {e.namePage}
      </Button>
    </Link>
  ));

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ color: "black" }}
        onClick={() => setOpen(!isOpen)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={anchor} open={isOpen} onClose={() => setOpen(!isOpen)}>
        <Box sx={styles.container}>
          <Box sx={styles.closeBtn} onClick={() => setOpen(!isOpen)}>
            <CloseIcon sx={styles.closeIcon} />
          </Box>
          <Divider />
          <Box sx={styles.pagesBtn}>{pagesBtn}</Box>
          <Link style={styles.btnLink} to="/booking">
            <Button
              sx={styles.bottomBtn}
              variant="contained"
              onClick={() => setOpen(!isOpen)}
            >
              Đặt bàn
            </Button>
          </Link>
        </Box>
      </Drawer>
    </>
  );
};

SlideBar.defaultProps = defaultProps;

export default SlideBar;
