import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import moment from "moment";
import BookingStep1 from "../../components/BookingStep/BookingStep1";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styles } from "./styles";
import BookingStep2 from "../../components/BookingStep/BookingStep2";
import BookingStep3 from "../../components/BookingStep/BookingStep3";
import services from "../../services";
import ModalRequiredLogin from "../../components/Modal/ModalRequiredLogin";
import ModalCreateBooking from "../../components/Modal/ModalCreateBooking";

const steps = ["Chọn bàn", "Thông tin cá nhân", "Xác nhận"];

const Booking = () => {
  const [step, setStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState(["left", "right"]);
  const [tablePick, setTablePick] = useState("web");
  const [isLogin, setIsLogin] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [createStatus, setCreateStatus] = useState<string | null>();
  const booking = useAppSelector((state) => state.booking);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleChangeTable = useCallback(
    (e: React.MouseEvent<HTMLElement>, newTable: string) => {
      setTablePick(newTable);
    },
    [tablePick]
  );

  const handleBackStep = useCallback(() => {
    if (step > 0) {
      setSlideDirection(["right", "left"]);
      setStep(step - 1);
    }
  }, [step]);

  const handleNextStep = useCallback(() => {
    setSlideDirection(["left", "right"]);
    if (step === 0) {
      // const fullName = checkFullName(setErrorMessage, userInfo);

      // const date = checkDateCheckIn(setErrorMessage, userInfo);
      // if (fullName && email && phoneNumber && nop && time && date) {
      //   dispatch(changeUserInfo(userInfo));
      setStep(step + 1);
      // }
    }

    if (step === 1) {
      setStep(step + 1);
    }
    if (step === 2) {
      // if (license.privacy === true && license.cancel === true) {
      // }
      const data = {
        id_table: booking.table?._id,
        timeCheckIn: booking.timeCheckIn,
        dateCheckIn: moment(booking.dateCheckIn).format("YYYY-MM-DD"),
        specialRequired: booking.specialRequired,
        id_client: user._id,
      };
      setIsCreate(true);
      services
        .createBooking(data)
        .then((e) => {
          setCreateStatus("success");
        })
        .catch((e) => {
          setCreateStatus("error");
        });
    }
  }, [step]);

  useEffect(() => {
    document.cookie
      .split(";")
      .map((e) => e.split("="))
      .forEach((e) =>
        e[0].trim() === "token_cus" ? setIsLogin(false) : setIsLogin(true)
      );
  }, []);

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
        <ModalRequiredLogin open={isLogin} />
        <ModalCreateBooking
          open={isCreate}
          status={createStatus!}
          setStep={setStep}
          setIsCreate={setIsCreate}
          setCreateStatus={setCreateStatus}
        />
      </Box>
      <Box sx={styles.formContent}>
        <BookingStep1
          step={step}
          slideDirection={slideDirection}
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
    </Box>
  );
};

export default Booking;
