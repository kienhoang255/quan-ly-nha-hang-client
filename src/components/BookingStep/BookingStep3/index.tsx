import React, { useState } from "react";
import {
  Box,
  Slide,
  Typography,
  Divider,
  Button,
  Chip,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Popover,
} from "@mui/material";
import styles from "./styles";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FormatQuoteSharpIcon from "@mui/icons-material/FormatQuoteSharp";

import { useAppSelector } from "../../../store/hooks";
import { Link } from "react-router-dom";
import moment from "moment";

interface Props {
  step: Number;
  slideDirection: any;
  handleNextStep: Function;
  handleBackStep: Function;
}
const BookingStep3: React.FC<Props> = ({
  step,
  slideDirection,
  handleNextStep,
  handleBackStep,
}) => {
  const booking = useAppSelector((state) => state.booking);
  const user = useAppSelector((state) => state.user);
  const tableImage = useAppSelector(
    (state) => state.table.tableImage[booking.table?._id!]
  );
  const [license, setLicense] = useState(false);

  const handleValidateNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (license) {
      handleNextStep();
    } else {
      setAnchorEl(e.currentTarget);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const direction =
    step === 2 ? slideDirection[0] : step === 3 ? slideDirection[1] : "left";

  return (
    <Slide
      direction={direction}
      in={step === 2 ? true : false}
      mountOnEnter
      unmountOnExit
    >
      <Box sx={styles.container}>
        <Box sx={styles.leftContainer}>
          <Box sx={styles.leftDetail}>
            <Typography gutterBottom sx={styles.leftDetail.title}>
              Chi tiết đặt bàn của bạn
            </Typography>
            <Box sx={styles.leftDetail.content}>
              <Box>
                <Typography
                  sx={styles.leftDetail.content.wrap.titleWrap}
                  gutterBottom
                >
                  Check in
                </Typography>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  {moment(booking?.dateCheckIn).format(
                    "ddd, DD [tháng] MM YYYY "
                  )}
                </Typography>

                <Typography sx={styles.leftDetail.content.wrap.titleWrap}>
                  Từ {booking.timeCheckIn}
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "110px" }}
              />
              <Box>
                <Typography
                  sx={styles.leftDetail.content.wrap.titleWrap}
                  gutterBottom
                >
                  Check out
                </Typography>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  {moment(booking?.dateCheckIn).format(
                    "ddd, DD [tháng] MM YYYY "
                  )}
                </Typography>

                <Typography sx={styles.leftDetail.content.wrap.titleWrap}>
                  Cho đến{" "}
                  {`${Number(booking.timeCheckIn?.split(":")[0]) + 4}:${
                    booking.timeCheckIn?.split(":")[1]
                  }`}
                </Typography>
              </Box>
            </Box>
          </Box>

          {booking.specialRequired && (
            <Box sx={styles.leftDetail}>
              <Typography gutterBottom sx={styles.leftDetail.title}>
                Yêu cầu đặc biệt của bạn
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography sx={styles.leftDetail.content.wrap.text}>
                  <FormatQuoteSharpIcon sx={{ transform: "rotate(180deg)" }} />
                  {booking.specialRequired}
                  <FormatQuoteSharpIcon />
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={styles.rightContainer}>
          <Box sx={styles.rightDetailTable}>
            <Box
              sx={{
                width: "160px",
                height: "160px",
                backgroundColor: "black",
                backgroundImage: `url(${tableImage?.image1})`,
                backgroundSize: "cover",
              }}
            ></Box>
            <Box sx={{ margin: "0 0 0 16px" }}>
              <Typography variant="h6" sx={styles.rightDetailTable.name}>
                Bàn {booking.table?.name}
              </Typography>
              <Typography sx={styles.rightDetailTable.numOfPeople}>
                Số người {booking.table?.numOfPeople}
                <PeopleAltIcon sx={styles.rightDetailTable.numOfPeople.icon} />
              </Typography>
              <Box sx={styles.rightDetailTable.numOfPeople.detail}>
                <Divider orientation="vertical" flexItem />
                <Box>
                  {tableImage?.options?.map((e: string, key: number) => (
                    <Box key={key}>{e}</Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={styles.box}>
            <Typography sx={styles.box.title}>
              Thông tin chi tiết của bạn
            </Typography>
            <Chip
              sx={styles.box.chip}
              label="Gần xong rồi! Chỉ cần xác nhận thông tin"
            />
            <Box sx={styles.box.content}>
              <TextField
                disabled
                sx={styles.box.input}
                id="username"
                label="Họ tên*"
                variant="outlined"
                value={user.username}
              />
              <TextField
                disabled
                sx={styles.box.input}
                id="phoneNumber"
                label="Số điện thoại*"
                variant="outlined"
                value={user.phone}
              />
              <TextField
                disabled
                sx={styles.box.input}
                id="email"
                label="Email*"
                variant="outlined"
                value={user.email}
              />
              <Button onClick={() => handleBackStep()}>Quay lại</Button>
            </Box>
          </Box>
          <FormGroup sx={{ padding: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLicense(e.target.checked);
                  }}
                />
              }
              label={
                <p>
                  Bạn đồng ý với <Link to="#">điều khoản chung</Link> và
                  <Link to="#"> chính sách bảo mật</Link>.
                </p>
              }
            />
          </FormGroup>
        </Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Vui lòng đồng ý với điều khoản chung và chính sách bảo mật.
          </Typography>
        </Popover>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#ff720d",
            "&:hover": {
              backgroundColor: "#231f20",
              color: "#ff720d ",
            },
            gridColumn: "span 2",
            justifySelf: "end",
            margin: "0 12px 0 0",
          }}
          onClick={handleValidateNextStep}
        >
          Tiếp theo &gt;
        </Button>
      </Box>
    </Slide>
  );
};

export default BookingStep3;
