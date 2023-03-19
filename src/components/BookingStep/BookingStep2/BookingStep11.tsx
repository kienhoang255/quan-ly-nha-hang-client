import React, { memo } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Slide,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import TableItem from "../../TableItem";

interface Props {
  step: number;
  slideDirection: any;
  userInfo: any;
  setUserInfo: any;
  errorMessage: any;
  minDate: moment.Moment | string;
  maxDate: moment.Moment | string;
  handleChangeDatePicker: Function;
}

const BookingStep1: React.FC<Props> = ({
  step,
  slideDirection,
  userInfo,
  setUserInfo,
  errorMessage,
  minDate,
  maxDate,
  handleChangeDatePicker,
}) => {
  const styles = {
    container: {
      width: "1140px",
      display: "grid",
      gridTemplateColumns: "280px 1fr",
      gap: "12px",
    },
    search: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    content: {},
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
    step === 0 ? slideDirection[0] : step === 1 && slideDirection[1];

  return (
    <Slide
      direction={direction}
      in={step === 0 ? true : false}
      mountOnEnter
      unmountOnExit
    >
      {/* <Paper elevation={3} sx={{ gap: "20px" }}> */}
      <Box sx={styles.container}>
        <Box sx={styles.search}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "6px",
              width: "calc(100% - 16px * 2)",
              gap: "12px",
              padding: "16px",
            }}
          >
            <div>Tìm</div>
            <Autocomplete
              id="time"
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
            <TextField
              id="numOfPeople"
              label="Số lượng người"
              variant="outlined"
            />
            <Autocomplete
              id="stage"
              value={userInfo.timeCheckIn}
              isOptionEqualToValue={(option, value) => {
                return value === option || option === "09:00";
              }}
              options={timePickList.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tầng"
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
            <Button
              sx={{
                height: "52px",
                backgroundColor: "#ff720d",
                "&:hover": {
                  backgroundColor: "#231f20",
                  color: "#ff720d ",
                },
              }}
              variant="contained"
            >
              Tìm
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "6px",
              width: "calc(100% - 16px * 2)",
              padding: "16px",
            }}
          >
            <div>Lọc</div>
            <Box
              sx={{ height: "240px", overflow: "hidden", overflowY: "auto" }}
            >
              <FormControlLabel label="View bien" control={<Checkbox />} />
              <FormControlLabel label="View ban cong" control={<Checkbox />} />
              <FormControlLabel label="Ngoai troi" control={<Checkbox />} />
              <FormControlLabel label="Trong nha" control={<Checkbox />} />
              <FormControlLabel label="Trong nha" control={<Checkbox />} />
              <FormControlLabel label="Trong nha" control={<Checkbox />} />
              <FormControlLabel label="Trong nha" control={<Checkbox />} />
              <FormControlLabel label="View thanh pho" control={<Checkbox />} />
            </Box>
          </Box>
        </Box>
        <Box sx={styles.content}>
          <div>Tim thay</div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "820px",
              overflow: "hidden",
              overflowY: "auto",
              gap: "12px",
            }}
          >
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
          </Box>
        </Box>
      </Box>
      {/* </Paper> */}
    </Slide>
  );
};

export default memo(BookingStep1);
