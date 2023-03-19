import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  const styles = {
    container: {
      display: "flex",
      placeItems: "center",
      placeContent: "center",
    },
  };
  return (
    <Box sx={styles.container}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
