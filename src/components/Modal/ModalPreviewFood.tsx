import React from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Rating from "../Rating/Rating";
import Logo from "../Logo/Logo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableFoodBill from "../TableFoodBill/TableFoodBill";
import ClearIcon from "@mui/icons-material/Clear";
import utils from "../../utils";

interface Props {
  children?: JSX.Element;
  sx?: {};
  label?: string;
  data?: any;
}

const ModalPreviewFood: React.FC<Props> = ({ children, sx, label, data }) => {
  const styles = {
    container: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      width: "720px",
      //   height: "580px",
      borderRadius: "10px",
      padding: "40px",
      overflow: "hidden",
      overflowY: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {children ? (
        <div style={sx} onClick={handleOpen}>
          {children}
        </div>
      ) : (
        <Button sx={sx} onClick={handleOpen}>
          {label ? label : "Open modal"}
        </Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.container}>
          <Box
            sx={{
              backgroundImage: `url(${data?.image})`,
              width: "400px",
              height: "400px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>
          <Box
            sx={{
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "20px",
              }}
            >
              {data?.name}
            </Typography>
            <Typography>Giá: {utils.formatVND(data?.price)}</Typography>
            <Typography sx={{ flexGrow: "1" }}>
              Mô tả: {data?.description}
            </Typography>
            <Button
              sx={{
                color: "#231f20",
                backgroundColor: "#ff720d",
                margin: "0 0 10px 0",
                "&:hover": {
                  backgroundColor: "#231f20",
                  color: "#ff720d ",
                },
              }}
              onClick={handleClose}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalPreviewFood;
