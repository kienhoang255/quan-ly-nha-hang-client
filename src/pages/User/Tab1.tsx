import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import moment from "moment";
import {
  setAddress,
  setBirth,
  setEmail,
  setPhone,
  setSex,
  setUser,
  setUsername,
} from "../../features/user/userSlice";
import services from "../../services";
import utils from "../../utils";

interface Props {
  value: any;
  handleTriggerAlert?: any;
}

const Tab1: React.FC<Props> = ({ value, handleTriggerAlert }) => {
  const styles = {
    container: {
      width: "1100px",
      display: "grid",
      gridTemplateColumns: "30% 1fr",
    },
    left: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "260px",
      margin: "0 auto",
      header: {
        height: "130px",
        width: "130px",
        margin: "0 0 28px 0",
        backgroundColor: "red",
        borderRadius: "50%",
      },
      body: {
        width: "260px",
        height: "130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        detail: {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
      footer: {
        marginTop: "25px",
        width: "260px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        btnSave: {
          color: "white",
          background: "#ff720d",
          "&:hover": {
            backgroundColor: "#ff720d",
          },
        },
        btnCancel: {
          color: "#ff720d",
          background: "white",
          "&:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    right: {
      width: "716px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px",
      margin: "auto 0 0 auto",
      title: {
        gridColumn: "span 2",
        border: "1px solid #ff720d",
        color: "#ff720d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "6px",
        height: "45px",
      },
    },
    iconCoin: {
      color: "#ff720d",
    },
    alert: {
      position: "absolute",
    },
  };
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState<{
    username?: string;
    email?: string;
    phone?: string;
    err?: string;
  }>({});

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

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: "130px",
        width: "130px",
        margin: "0 0 28px 0",
        fontSize: "30px",
        textTransform: "uppercase",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const handleChange = (event: any) => {
    dispatch(setSex(event.target.value));
  };

  const handleCancelUpdate = () => {
    if (user?._id)
      services.getClient(user?._id).then((res) => {
        dispatch(setUser(res.data));
        console.log(res.data);
      });
  };

  const handleUpdateInfo = () => {
    if (!utils.validateNull(user.username)) {
      setErrMsg((prev) => ({ ...prev, username: "Không được để trống!" }));
    } else {
      setErrMsg((prev) => ({ ...prev, username: "" }));
    }

    if (!utils.validateNull(user.email) && !utils.validateNull(user.phone)) {
      setErrMsg((prev) => ({
        ...prev,
        email: "Email/SĐT dùng để đăng nhập, vui lòng điền 1 trong 2",
        phone: "Email/SĐT dùng để đăng nhập, vui lòng điền 1 trong 2",
      }));
    } else if (
      utils.validateNull(user.email) &&
      !utils.validateEmail(user.email)
    ) {
      setErrMsg((prev) => ({ ...prev, email: "Email không hợp lệ!" }));
    } else if (
      utils.validateNull(user.phone) &&
      !utils.validatePhoneNumber(user.phone)
    ) {
      setErrMsg((prev) => ({ ...prev, phone: "Số điện thoại không hợp lệ!" }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        email: "",
        phone: "",
      }));
      services
        .updateClient(user)
        .then((res) => {
          console.log(res.data);
          handleTriggerAlert();
        })
        .catch((err) => {
          switch (err.response.status) {
            case 400:
              setErrMsg((prev) => ({
                ...prev,
                email: "Email/SĐT bạn vừa cập nhật đã có người khác sử dụng!",
                phone: "Email/SĐT bạn vừa cập nhật đã có người khác sử dụng!",
              }));
              break;
            case 401:
              setErrMsg((prev) => ({
                ...prev,
                email: "Email đã có người sử dụng!",
              }));
              break;
            case 402:
              setErrMsg((prev) => ({
                ...prev,
                phone: "Số điện thoại đã có người sử dụng!",
              }));
              break;
            case 403:
              setErrMsg((prev) => ({
                ...prev,
                email: "Không được để trống",
                phone: "Không được để trống",
              }));
              break;

            default:
              break;
          }
        });
    }
  };
  return (
    <>
      {value === 0 && (
        <Box sx={styles.container}>
          <Box sx={styles.left}>
            {/* <Box sx={styles.left.header}></Box> */}
            <Avatar {...stringAvatar(`${user.username}`)} />
            <Box sx={styles.left.body}>
              <Box sx={styles.left.body.detail}>
                <Typography variant="body1">ID:</Typography>
                <Typography variant="body1">{user?._id}</Typography>
              </Box>
              <Box sx={styles.left.body.detail}>
                <Typography variant="body1">Coin</Typography>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  0<MonetizationOnOutlinedIcon sx={styles.iconCoin} />
                </Typography>
              </Box>
              <Box sx={styles.left.body.detail}>
                <Typography variant="body1">Level</Typography>
                <Typography variant="body1">0</Typography>
              </Box>
              <Box sx={styles.left.body.detail}>
                <Typography variant="body1">Ngày bắt đầu</Typography>
                <Typography variant="body1">
                  {moment(user?.createdAt).format("DD-MM-YYYY")}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.left.footer}>
              <Button
                sx={styles.left.footer.btnCancel}
                variant="outlined"
                color="inherit"
                onClick={() => {
                  handleCancelUpdate();
                }}
              >
                Hủy
              </Button>
              <Button
                sx={styles.left.footer.btnSave}
                variant="contained"
                onClick={() => handleUpdateInfo()}
              >
                Lưu
              </Button>
            </Box>
          </Box>
          <Box sx={styles.right}>
            <Box sx={styles.right.title}>
              <Typography variant="body1">Thông tin</Typography>
            </Box>
            <TextField
              error={!!errMsg?.username}
              helperText={errMsg?.username}
              id="standard-basic"
              label="Họ tên"
              variant="standard"
              value={user.username}
              onChange={(e) => {
                dispatch(setUsername(e.target.value));
              }}
            />
            <TextField
              error={!!errMsg?.email}
              helperText={errMsg?.email}
              id="standard-basic"
              label="Email"
              variant="standard"
              value={user.email}
              onChange={(e) => {
                dispatch(setEmail(e.target.value));
              }}
            />
            <TextField
              error={!!errMsg?.phone}
              helperText={errMsg?.phone}
              id="standard-basic"
              label="Số điện thoại"
              variant="standard"
              value={user?.phone}
              onChange={(e) => {
                dispatch(setPhone(e.target.value));
              }}
            />
            <TextField
              id="standard-basic"
              label="Ngày sinh"
              variant="standard"
              value={user.birth ? user?.birth : "yyyy-MM-dd"}
              type="date"
              onChange={(e) => {
                dispatch(setBirth(e.target.value));
              }}
            />
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Giới tính
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={user?.sex || "empty"}
                onChange={handleChange}
                label="Sex"
              >
                <MenuItem value="empty">Trống</MenuItem>
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Địa chỉ"
              variant="standard"
              value={user?.address ? user?.address : ""}
              onChange={(e) => {
                dispatch(setAddress(e.target.value));
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Tab1;
