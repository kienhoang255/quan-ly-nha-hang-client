import React from "react";
import { Box } from "@mui/material";

interface Props {
  value: number;
}
const Tab2: React.FC<Props> = ({ value }) => {
  return <>{value === 1 && <Box>Bạn chưa có voucher nào</Box>}</>;
};

export default Tab2;
