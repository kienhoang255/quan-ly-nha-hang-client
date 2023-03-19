import React from "react";
import { Box, Skeleton } from "@mui/material";

const TableItemSkeleton = () => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        display: "grid",
        gridTemplateColumns: "200px 1fr 15%",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Skeleton
        variant="rounded"
        style={{
          height: "200px",
          width: "200px",
          borderRadius: "8px",
          margin: "none",
        }}
      />
      <Box>
        <Skeleton
          sx={{ width: "100px", margin: "0 0 0 12px", height: "20px" }}
        />
        <Skeleton
          sx={{ width: "110px", margin: "0 0 0 12px", height: "20px" }}
        />
        <Skeleton
          sx={{ width: "140px", margin: "0 0 0 12px", height: "20px" }}
        />
        <Skeleton
          sx={{ width: "140px", margin: "0 0 0 12px", height: "20px" }}
        />
      </Box>
    </Box>
  );
};

export default TableItemSkeleton;
