import React from "react";
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
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useAppSelector } from "../../store/hooks";

interface Props {
  value: number;
}

const Tab1: React.FC<Props> = ({ value }) => {
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
  };
  const user = useAppSelector((state) => state.user);
  const [age, setAge] = React.useState("");

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
    setAge(event.target.value);
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
                <Typography variant="body1">1231512</Typography>
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
                <Typography variant="body1">Level</Typography>
              </Box>
              <Box sx={styles.left.body.detail}>
                <Typography variant="body1">Ngay bat dau</Typography>
                <Typography variant="body1">Level</Typography>
              </Box>
            </Box>
            <Box sx={styles.left.footer}>
              <Button
                sx={styles.left.footer.btnCancel}
                variant="outlined"
                color="inherit"
              >
                Huy
              </Button>
              <Button sx={styles.left.footer.btnSave} variant="contained">
                Luu
              </Button>
            </Box>
          </Box>
          <Box sx={styles.right}>
            <Box sx={styles.right.title}>
              <Typography variant="body1">Level</Typography>
            </Box>
            <TextField
              id="standard-basic"
              label="Họ tên"
              variant="standard"
              defaultValue={user.username}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              defaultValue={user.email}
            />
            <TextField
              id="standard-basic"
              label="Số điện thoại"
              variant="standard"
              defaultValue={user?.phone}
            />
            <TextField
              id="standard-basic"
              label="Ngày sinh"
              variant="standard"
              defaultValue={user?.birth}
            />
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Giới tính
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={user?.sex}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>Trống</em>
                </MenuItem>
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Địa chỉ"
              variant="standard"
              defaultValue={user?.address}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Tab1;
