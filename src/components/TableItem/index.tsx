import React, { useEffect } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Box, Button, Divider, Typography } from "@mui/material";

interface Props {
  tableInfo: {
    numOfPeople: number;
    name: string;
    status: string;
    stage: number;
    _id: string;
  };
  handleGetTableImage: Function;
  tableImage: any;
  handleNextStep: Function;
  handleOnSelectedTable: Function;
}

const TableItem: React.FC<Props> = ({
  tableInfo,
  handleGetTableImage,
  tableImage,
  handleNextStep,
  handleOnSelectedTable,
}) => {
  useEffect(() => {
    handleGetTableImage(tableInfo._id);
  }, []);
  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "180px 1fr 120px",
          md: "180px 1fr 150px",
          lg: "200px 1fr 15%",
        },
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          height: { xs: "160px", sm: "180px", md: "180px", lg: "200px" },
          width: { xs: "160px", sm: "180px", md: "180px", lg: "200px" },
          borderRadius: "8px",
          backgroundSize: "cover",
          backgroundImage: `url(${tableImage?.image1})`,
        }}
      ></Box>
      <Box sx={{ margin: "0 0 0 12px" }}>
        <Typography variant="h6">Bàn {tableInfo?.name}</Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          Số người {tableInfo?.numOfPeople}
          <PeopleAltIcon sx={{ fontSize: "18px", paddingLeft: "6px" }} />
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "12px 1fr",
            gap: "12px",
            margin: "20px 0 0 0",
          }}
        >
          <Divider orientation="vertical" flexItem />
          <Box>
            {tableImage?.options?.map((e: string, key: number) => (
              <Box key={key}>{e}</Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          height: "40px",
          alignSelf: "flex-end",
          backgroundColor: "#ff720d",
          "&:hover": {
            backgroundColor: "#231f20",
            color: "#ff720d ",
          },
          margin: { xs: "12px 0 0 0", sm: "0" },
          gridColumn: { xs: "span 2", sm: "none" },
        }}
        onClick={() => {
          handleNextStep();
          handleOnSelectedTable(tableInfo);
        }}
      >
        Đặt ngay
      </Button>
    </Box>
  );
};

export default TableItem;
