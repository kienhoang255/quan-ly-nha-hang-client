import React, { memo } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Slide,
  Autocomplete,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";

interface Props {
  handleChangeDatePicker: Function;
  minDate: moment.Moment | string;
  maxDate: moment.Moment | string;
  step: Number;
  slideDirection: any;
  userInfo: any;
  errorMessage: any;
  setUserInfo: any;
}

const BookingStep1: React.FC<Props> = ({
  handleChangeDatePicker,
  minDate,
  maxDate,
  step,
  slideDirection,
  userInfo,
  errorMessage,
  setUserInfo,
}) => {
  const styles = {
    title: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: { xs: "16px", sm: "20px", md: "30px", lg: "40px" },
    },
    person: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      justifyItems: "center",
      gap: "20px",
      marginBottom: "20px",
    },
    dateTimePicker: {
      gridColumn: "span 2",
    },
  };

  const timePickList = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
  ];

  const direction =
    step === 1 ? slideDirection[0] : step === 2 ? slideDirection[1] : "left";

  return (
    <Box sx={{ height: "630px", display: "flex", alignItems: "center" }}>
      <Slide
        direction={direction}
        in={step === 1 ? true : false}
        mountOnEnter
        unmountOnExit
      >
        <Paper
          elevation={3}
          sx={{
            padding: {
              xs: "20px 32px",
              sm: "30px 50px",
              md: "40px 64px",
              lg: "50px 81px",
            },
            gap: "20px",
          }}
        >
          <Typography
            sx={styles.title}
            gutterBottom
            variant="h4"
            color="text.primary"
          >
            thông tin khách hàng
          </Typography>
          <Box sx={styles.person}>
            <TextField
              required
              id="standard-required"
              label="Họ tên"
              variant="standard"
              error={errorMessage.errFullName.notification}
              helperText={errorMessage.errFullName.msg}
              defaultValue={userInfo.fullName}
              onChange={(e) => {
                setUserInfo((prev: any) => ({
                  ...prev,
                  fullName: e.target.value,
                }));
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Số điện thoại"
              variant="standard"
              error={errorMessage.errPhoneNumber.notification}
              helperText={errorMessage.errPhoneNumber.msg}
              defaultValue={userInfo.phoneNumber}
              onChange={(e) => {
                setUserInfo((prev: any) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Email"
              variant="standard"
              error={errorMessage.errEmail.notification}
              helperText={errorMessage.errEmail.msg}
              defaultValue={userInfo.email}
              onChange={(e) => {
                setUserInfo((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
            <TextField
              required
              id="standard-required"
              label="Số người"
              variant="standard"
              error={errorMessage.errNumberOfPeople.notification}
              helperText={errorMessage.errNumberOfPeople.msg}
              defaultValue={userInfo.numberOfPeople}
              onChange={(e) => {
                setUserInfo((prev: any) => ({
                  ...prev,
                  numberOfPeople: e.target.value,
                }));
              }}
            />
            <Autocomplete
              id="time"
              // defaultValue={timePickList[0]}
              value={userInfo.timeCheckIn}
              isOptionEqualToValue={(option, value) => {
                return value === option || option === "09:00";
              }}
              options={timePickList.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Thời gian CheckIn"
                  helperText={errorMessage.errTimeCheckIn.msg}
                  error={errorMessage.errTimeCheckIn.notification}
                />
              )}
              onChange={(event: any, newValue: string | null) => {
                setUserInfo((prev: any) => ({
                  ...prev,
                  timeCheckIn: newValue,
                }));
              }}
              sx={{ width: "100%" }}
            />

            <DesktopDatePicker
              label="Ngày CheckIn"
              inputFormat="MM/DD/YYYY"
              minDate={minDate}
              maxDate={maxDate}
              value={userInfo.dateCheckIn}
              onChange={(e) => handleChangeDatePicker(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={errorMessage.errDateCheckIn.msg}
                  error={errorMessage.errDateCheckIn.notification}
                />
              )}
            />
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default memo(BookingStep1);
