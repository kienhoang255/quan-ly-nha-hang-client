import React, { memo, useState } from "react";
import { Slide, Typography, CircularProgress, Paper, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  step: Number;
  slideDirection: any;
}

const BookingStepFinal: React.FC<Props> = ({ step, slideDirection }) => {
  const styles = {
    content: {
      width: "450px",
      height: "500px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      height: "100px",
      width: "100px",
      borderRadius: "50%",
    },
    checkIcon: {
      color: "#ff720d",
      height: "100%",
      width: "100%",
    },
  };
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const direction = step === 3 ? slideDirection[0] : slideDirection[1];
  return (
    <Slide
      direction={direction}
      in={step === 3 ? true : false}
      mountOnEnter
      unmountOnExit
    >
      <Paper sx={styles.content}>
        {loading ? (
          <Box>
            <Box sx={styles.box}>
              <CheckIcon sx={styles.checkIcon} />
            </Box>
            Hoàn tất đặt bàn
          </Box>
        ) : (
          <CircularProgress size={100} sx={{ color: "#ff720d" }} />
        )}
      </Paper>
    </Slide>
  );
};

export default memo(BookingStepFinal);
