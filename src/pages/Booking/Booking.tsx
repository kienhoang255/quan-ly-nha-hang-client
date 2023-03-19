import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import moment from "moment";
import BookingStep1 from "../../components/BookingStep/BookingStep1";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styles } from "./styles";
import {
  checkDateCheckIn,
  checkEmail,
  checkFullName,
  checkNumberOfPeople,
  checkPhoneNumber,
  checkTimeCheckIn,
} from "./validateBooking";
import BookingStep2 from "../../components/BookingStep/BookingStep2";
import BookingStep3 from "../../components/BookingStep/BookingStep3";

const steps = ["Chọn bàn", "Thông tin cá nhân", "Xác nhận"];

const Booking = () => {
  const [step, setStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState(["left", "right"]);
  const [tablePick, setTablePick] = useState("web");
  const agreeLicense = useAppSelector((state) => state.booking.agreeLicense);
  const userInfoSlice = useAppSelector((state) => state.booking.userInfo);

  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState({
    fullName: userInfoSlice.fullName || "",
    phoneNumber: userInfoSlice.phoneNumber || "",
    email: userInfoSlice.email || "",
    timeCheckIn: userInfoSlice.timeCheckIn,
    dateCheckIn: userInfoSlice.dateCheckIn,
  });

  const [license, setLicense] = useState({
    privacy: agreeLicense.privacy,
    cancel: agreeLicense.cancel,
  });

  const handleChangeDatePicker = useCallback(
    (e: object | any) => {
      const date = moment(e).format("MM/DD/YYYY");
      setUserInfo((prev: any) => ({
        ...prev,
        dateCheckIn: date,
      }));
    },
    [userInfo.dateCheckIn]
  );

  const handleChangeTable = useCallback(
    (e: React.MouseEvent<HTMLElement>, newTable: string) => {
      setTablePick(newTable);
    },
    [tablePick]
  );

  const handleChangeLicenseCancel = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLicense((prev) => ({ ...prev, cancel: e.target.checked }));
  };
  const handleChangeLicensePrivacy = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLicense((prev) => ({ ...prev, privacy: e.target.checked }));
  };

  const handleBackStep = useCallback(() => {
    if (step > 0) {
      setSlideDirection(["right", "left"]);
      setStep(step - 1);
    }
  }, [step]);

  const handleNextStep = useCallback(() => {
    if (step === 0) {
      // const fullName = checkFullName(setErrorMessage, userInfo);
      // const email = checkEmail(setErrorMessage, userInfo);
      // const phoneNumber = checkPhoneNumber(setErrorMessage, userInfo);
      // const nop = checkNumberOfPeople(setErrorMessage, userInfo);
      // const time = checkTimeCheckIn(setErrorMessage, userInfo);
      // const date = checkDateCheckIn(setErrorMessage, userInfo);
      // if (fullName && email && phoneNumber && nop && time && date) {
      //   dispatch(changeUserInfo(userInfo));
      //   setSlideDirection(["left", "right"]);
      setStep(step + 1);
      // }
    }

    if (step === 1) {
      setStep(step + 1);
    }
    if (step === 2) {
      if (license.privacy === true && license.cancel === true) {
        setStep(step + 1);
      }
    }
  }, [step, userInfo, license]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.containerHeader}>
        <Stepper
          activeStep={step}
          sx={{
            "& .MuiStepLabel-root .Mui-completed": {
              color: "#ff720d", // circle color (COMPLETED)
            },
            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
              {
                color: "grey.500", // Just text label (COMPLETED)
              },
            "& .MuiStepLabel-root .Mui-active": {
              color: "#ff720d", // circle color (ACTIVE)
            },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
              color: "common.white", // Just text label (ACTIVE)
            },
            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
              fill: "common.white", // circle's number (ACTIVE)
            },

            display: { xs: "none", sm: "none", md: "flex" },
          }}
        >
          {steps.map((label, index) => {
            const labelProps: {
              optional?: React.ReactNode;
              error?: boolean;
            } = {};
            return (
              <Step key={index}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <a href="tel:02473007990" style={styles.hotline}>
          <Button sx={styles.btn} variant="contained">
            Đặt bàn ngay HOTLINE: 02473007990
          </Button>
        </a>
      </Box>
      <Box sx={styles.formContent}>
        <BookingStep1
          step={step}
          slideDirection={slideDirection}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleNextStep={handleNextStep}
        />
        <BookingStep2
          step={step}
          slideDirection={slideDirection}
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
        <BookingStep3
          step={step}
          slideDirection={slideDirection}
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
        />
        {/* <BookingStep3
          step={step}
          slideDirection={slideDirection}
          userInfo={userInfo}
          license={license}
          handleChangeLicensePrivacy={handleChangeLicensePrivacy}
          handleChangeLicenseCancel={handleChangeLicenseCancel}
        />
        <BookingStepFinal slideDirection={slideDirection} step={step} /> */}
      </Box>
      {/* <Box sx={{ display: step === 0 ? "none" : "block" }}>
        <Box sx={styles.actionBtn}>
          {step !== 3 && (
            <Button
              sx={styles.btn}
              variant="contained"
              onClick={handleBackStep}
            >
              Quay lại
            </Button>
          )}
          {step === 3 && (
            <Button
              sx={styles.btn}
              variant="contained"
              style={{ margin: "auto" }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Trang chủ
              </Link>
            </Button>
          )}
          <Box sx={styles.actionBtn.right}>
            {step === 1 && (
              <Button sx={styles.btn} variant="contained">
                Tự động chọn
              </Button>
            )}
            {step !== 3 && (
              <Button
                sx={styles.btn}
                variant="contained"
                onClick={handleNextStep}
              >
                Tiếp tục
              </Button>
            )}
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Booking;
