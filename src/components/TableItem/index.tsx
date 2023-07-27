import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { Box, Button, Divider, Typography, Modal } from "@mui/material";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CarouselComponent from "./../Carousel/index";

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
  handleOnSelectedTable: Function;
}

const TableItem: React.FC<Props> = ({
  tableInfo,
  handleGetTableImage,
  tableImage,
  handleOnSelectedTable,
}) => {
  const [modal, setModal] = useState(false);
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
          cursor: "pointer",
          "&:hover": {
            opacity: 0.7,
          },
        }}
        onClick={() => {
          tableImage && setModal(!modal);
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
          handleOnSelectedTable(tableInfo);
        }}
      >
        Đặt ngay
      </Button>
      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
          }}
        >
          <CarouselComponent image={tableImage} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TableItem;
