import { Box, Divider, Typography, Button } from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import ModalBill from "../Modal/ModalBill";
import moment from "moment";
import { useMemo } from "react";
interface Props {
  billInfo: {
    _id: string;
    createdAt: any;
    totalPrice: string;
  };
}

const BillItem: React.FC<Props> = ({ billInfo }) => {
  const styles = {
    billItem: {
      width: "100%",
      border: "1px solid gray",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    left: {
      padding: "24px",
      width: "50%",
      height: "170px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      icon: { width: "50px", height: "50px" },
      emoIcon: {
        bad: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          color: "gray",
          "&:hover": {
            color: "red",
            backgroundColor: "transparent",
          },
        },
        average: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          color: "gray",
          "&:hover": {
            color: "orange",
            backgroundColor: "transparent",
          },
        },
        ok: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          color: "gray",
          "&:hover": {
            color: "blue",
            backgroundColor: "transparent",
          },
        },
        good: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          color: "gray",
          "&:hover": {
            color: "green",
            backgroundColor: "transparent",
          },
        },
        awesome: {
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          color: "gray",
          "&:hover": {
            color: "pink",
            backgroundColor: "transparent",
          },
        },
      },
    },
    right: {
      margin: "24px",
      height: "170px",
      width: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "start",
      content: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
      btn: {
        width: "100%",
        backgroundColor: "#ff720d",
        color: "#231f20 ",

        "&:hover": {
          backgroundColor: "#231f20",
          color: "#ff720d ",
        },
      },
      total: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    subTitle: { color: "gray" },
  };

  const time = useMemo(
    () => moment(billInfo.createdAt).format("HH:mm:ss"),
    [billInfo]
  );
  const date = useMemo(
    () => moment(billInfo.createdAt).format("DD/MM/YYYY"),
    [billInfo]
  );

  return (
    <Box sx={styles.billItem}>
      <Box sx={styles.left}>
        <Typography variant="h6">Đánh giá về nhà hàng</Typography>
        <Box sx={styles.left.emoIcon}>
          <Button sx={styles.left.emoIcon.bad}>
            <SentimentDissatisfiedOutlinedIcon sx={styles.left.icon} />
          </Button>

          <Button sx={styles.left.emoIcon.average}>
            <SentimentNeutralOutlinedIcon sx={styles.left.icon} />
          </Button>

          <Button sx={styles.left.emoIcon.ok}>
            <SentimentSatisfiedAltOutlinedIcon sx={styles.left.icon} />
          </Button>

          <Button sx={styles.left.emoIcon.good}>
            <EmojiEmotionsOutlinedIcon sx={styles.left.icon} />
          </Button>

          <Button sx={styles.left.emoIcon.awesome}>
            <SentimentVerySatisfiedOutlinedIcon sx={styles.left.icon} />
          </Button>
        </Box>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box sx={styles.right}>
        <Typography variant="h6" gutterBottom>
          Hóa đơn: {billInfo?._id}
        </Typography>
        <Box sx={styles.right.content}>
          <Box sx={styles.right.total}>
            <Typography variant="body1">Thời gian: {time}</Typography>
            <Typography variant="body1">Ngày: {date}</Typography>
          </Box>

          <Box sx={styles.right.total}>
            <Typography sx={styles.subTitle} variant="body2">
              Tổng đã trả: {billInfo.totalPrice}
            </Typography>
            <Typography sx={styles.subTitle} variant="body2">
              Coin
            </Typography>
          </Box>
        </Box>
        <ModalBill sx={styles.right.btn} label="Xem chi tiết" />
      </Box>
    </Box>
  );
};

export default BillItem;
