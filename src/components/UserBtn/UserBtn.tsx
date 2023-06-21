import React from "react";
import {
  Button,
  Popover,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeUser } from "../../features/user/userSlice";
import { setTab } from "../../features/tab/tabSlice";

const UserBtn = () => {
  const styles = {
    container: {
      padding: "20px",
      width: "250px",
      height: "340px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    header: {
      display: "grid",
      gridTemplateRows: "1fr 1fr",
      gridTemplateColumns: "35% 1fr",
      avatar: {
        gridRow: "span 2",
        backgroundColor: "red",
        marginRight: "16px",
        borderRadius: "50%",
      },
      editBtn: {
        backgroundColor: "#ff720d",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#ff720d",
        },
        color: "white",
      },
    },

    body: {
      width: "100%",
      btn: {
        width: "100%",
        display: "flex",
        justifyContent: "start",
        color: "black",
        textTransform: "none",
        "&:hover": {
          color: "#ff720d",
          backgroundColor: "white",
        },
      },
    },
    logoutBtn: {
      color: "#ff720d",
      "&:hover": {
        backgroundColor: "#231f20",
      },
    },
    btnShow: {
      height: "18px",
    },
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const handleOnLogout = () => {
    dispatch(removeUser(undefined));
    document.cookie = "token_cus" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/user");
    navigate("/");
  };

  function stringAvatarXS(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: "24px",
        height: "24px",
        fontSize: "12px",
        textTransform: "uppercase",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  function stringAvatarMD(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: "70px",
        height: "70px",
        fontSize: "24px",
        textTransform: "uppercase",
        gridRow: "span 2",
        marginRight: "16px",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <>
      <Avatar
        {...stringAvatarXS(`${username}`)}
        onClick={(e: any) => {
          handleClick(e);
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={styles.container}>
          <Box sx={styles.header}>
            <Avatar {...stringAvatarMD(`${username}`)} />
            {/* <Box sx={styles.header.avatar}></Box> */}
            <Typography>{username}</Typography>
            <Link
              to="/user"
              onClick={handleClose}
              style={{ textDecoration: "none" }}
            >
              <Button sx={styles.header.editBtn}>Chỉnh sửa</Button>
            </Link>
          </Box>
          <Divider />
          <Box sx={styles.body}>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <Button
                sx={styles.body.btn}
                variant="text"
                onClick={() => {
                  handleClose();
                  dispatch(setTab(0));
                }}
              >
                Thông tin tài khoản
              </Button>
            </Link>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <Button
                sx={styles.body.btn}
                onClick={() => {
                  handleClose();
                  dispatch(setTab(1));
                }}
              >
                Ưu đãi của tôi
              </Button>
            </Link>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <Button
                sx={styles.body.btn}
                onClick={() => {
                  handleClose();
                  dispatch(setTab(2));
                }}
              >
                Lịch sử giao dịch
              </Button>
            </Link>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <Button
                sx={styles.body.btn}
                onClick={() => {
                  handleClose();
                  dispatch(setTab(3));
                }}
              >
                Lịch sử đặt bàn
              </Button>
            </Link>
          </Box>
          <Divider />
          <Button
            sx={styles.logoutBtn}
            variant="outlined"
            color="inherit"
            onClick={handleOnLogout}
          >
            Đăng xuất
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default UserBtn;
