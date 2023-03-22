import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface Props {
  // userInfo: any;
  timePickList: [];
  // setUserInfo: any;
  minDate: any;
  maxDate: any;
  errorMessage?: any;
  setErrorMessage: any;
  formSearch: any;
  setFormSearch: any;
  stage: any;
  styles: any;
  handleOnSearch: any;
}

const SearchMobile: React.FC<Props> = ({
  // userInfo,
  timePickList,
  // setUserInfo,
  minDate,
  maxDate,
  errorMessage,
  setErrorMessage,
  setFormSearch,
  formSearch,
  stage,
  handleOnSearch,
  styles,
}) => {
  return (
    <Accordion
      sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">Tìm</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: { xs: "grid", sm: "grid", md: "none", lg: "none" },
          // flexDirection: "column",
          gridTemplateColumns: "1fr 1fr",
          // border: "1px solid rgba(0, 0, 0, 0.2)",
          // borderRadius: "6px",
          // width: "calc(100% - 16px * 2)",
          gap: "12px",
          // padding: "16px",
        }}
      >
        <Autocomplete
          id="time"
          // value={userInfo.timeCheckIn}
          isOptionEqualToValue={(option, value) => {
            return value === option || option === "09:00";
          }}
          options={timePickList?.map((option: any) => option)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Thời gian CheckIn"
              // helperText={errorMessage.errTimeCheckIn.msg}
              // error={errorMessage.errTimeCheckIn.notification}
            />
          )}
          onChange={(event: any, newValue: string | null) => {
            // setUserInfo((prev: any) => ({
            //   ...prev,
            //   timeCheckIn: newValue,
            // }));
          }}
          sx={{ width: "100%" }}
        />

        <DesktopDatePicker
          label="Ngày CheckIn"
          inputFormat="DD/MM/YYYY"
          minDate={minDate}
          maxDate={maxDate}
          value={minDate}
          onChange={() => {}}
          renderInput={(params) => (
            <TextField
              {...params}
              // helperText={errorMessage.errDateCheckIn.msg}
              // error={errorMessage.errDateCheckIn.notification}
            />
          )}
        />
        <TextField
          id="numOfPeople"
          label="Số lượng người"
          variant="outlined"
          type="text"
          helperText={errorMessage.numOfPeople.message}
          error={errorMessage.numOfPeople.notification}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // Check value is existed
            if (event.target.value.length > 0) {
              // Value can't bigger 12 or value must be number
              if (+event.target.value > 12 || !Number(event.target.value)) {
                // Set error message
                setErrorMessage((prev: any) => ({
                  ...prev,
                  numOfPeople: {
                    message: "Tầng phải là số và tối đa 12",
                    notification: true,
                  },
                }));
              } else {
                // Set formSearch
                setFormSearch((prev: any) => ({
                  ...prev,
                  numOfPeople: +event.target.value,
                }));
              }
            }
            // Set default
            else {
              setErrorMessage((prev: any) => ({
                ...prev,
                numOfPeople: { message: "", notification: false },
              }));

              // Remove numOfPeople
              setFormSearch((prev: any) => {
                const { numOfPeople, ...rest } = prev;
                return rest;
              });
            }
          }}
        />
        <Autocomplete
          id="stage"
          value={formSearch.stage}
          isOptionEqualToValue={(option, value) => {
            return value === option || option === "1";
          }}
          options={stage?.map((option: any) => option.toString())}
          renderInput={(params) => <TextField {...params} label="Tầng" />}
          onChange={(event: any, newValue: string | null) => {
            setFormSearch((prev: any) => ({ ...prev, stage: newValue }));
          }}
          sx={{ width: "100%" }}
        />
        <Button
          sx={{
            gridColumn: "span 2",
            backgroundColor: "#ff720d",
            "&:hover": {
              backgroundColor: "#231f20",
              color: "#ff720d ",
            },
          }}
          variant="contained"
          onClick={handleOnSearch}
        >
          Tìm
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default SearchMobile;
