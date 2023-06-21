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
  label: string;
  data?: any;
}

const ModalBill: React.FC<Props> = ({ children, sx, label, data }) => {
  const styles = {
    container: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      width: "550px",
      height: "605px",
      borderRadius: "10px",
      padding: "40px",
      overflow: "hidden",
      overflowY: "auto",
    },
    header: {
      title: {
        fontWeight: "bold",
        fontSize: "22px",
      },
      subTitle: {},
      closeBtn: {
        position: "absolute",
        top: "20px",
        right: "20px",
        color: "black",
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
    logo: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    body: {
      width: "100%",
    },
    details: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    gray: {
      color: "#6c6e6b",
    },
    expandDetail: { margin: "5px" },
    bold: { fontWeight: "bold" },
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.container}>
          <Box sx={styles.header}>
            <Typography sx={styles.header.title} variant="h6" gutterBottom>
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Đơn hàng: #{data._id}
            </Typography>
            <Button sx={styles.header.closeBtn} onClick={handleClose}>
              <ClearIcon />
            </Button>
          </Box>
          <Rating />
          <Box sx={styles.logo}>
            <Logo height="100px" width="100px" />
          </Box>

          <Box sx={styles.body}>
            <Box sx={styles.details}>
              <Typography sx={styles.bold} variant="subtitle2">
                Chi tiết hóa đơn
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                24/02/2023 19:26:48
              </Typography>
            </Box>
            <Accordion sx={styles.expandDetail}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Chi tiết món ăn đã dùng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableFoodBill orders={data.orders} />
              </AccordionDetails>
            </Accordion>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Số tiền giảm giá
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Phí dịch vụ
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                VAT
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Sử dụng voucher
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Số tiền đã đưa
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Số tiền thừa
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Số đồng tích luỹ
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
            <Box sx={styles.details}>
              <Typography sx={styles.gray} variant="subtitle2">
                Số điểm tích luỹ
              </Typography>
              <Typography sx={styles.gray} variant="subtitle2">
                0
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={styles.details}>
            <Typography sx={styles.bold} variant="subtitle1">
              Tổng số tiền phải trả
            </Typography>
            <Typography sx={styles.bold} variant="subtitle1">
              {utils.formatVND(Number(data.totalPrice))}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalBill;
