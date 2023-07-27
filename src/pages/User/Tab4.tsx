import React, { useEffect, useMemo, useState } from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import services from "../../services";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import moment from "moment";

interface Props {
  value: any;
}
const Tab4: React.FC<Props> = ({ value }) => {
  const styles = {
    container: {
      width: "920px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    billItem: {
      width: "100%",
      border: "1px solid gray",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    right: {
      padding: "24px",
      width: "50%",
      // height: "160px",
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
    left: {
      margin: "24px",
      // height: "160px",
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

  const [booking, setBooking] = useState([]);
  const [nameTable, setNameTable] = useState({});

  const user = useAppSelector((state) => state.user._id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    user &&
      services.getBookingByIdClient(user).then((res) => {
        setBooking(res.data);
      });
  }, []);

  useEffect(() => {
    if (booking[0]) {
      booking.forEach((e) => {
        services
          .getTableById(e.id_table)
          .then((res) =>
            setNameTable((prev: any) => ({ ...prev, [e._id]: res.data.name }))
          );
      });
    }
  }, [booking]);

  return (
    <>
      {value === 3 && (
        <Box sx={styles.container}>
          {booking?.map((e, key) => (
            <Box sx={styles.billItem} key={key}>
              <Box sx={styles.left}>
                <Typography variant="h6" gutterBottom>
                  Mã đặt bàn #{e?._id}
                </Typography>
                <Box sx={styles.left.content}>
                  <Box sx={styles.left.total}>
                    <Typography sx={styles.subTitle} variant="body2">
                      Bàn
                    </Typography>
                    <Typography sx={styles.subTitle} variant="body2">
                      {nameTable[e?._id] ? nameTable[e?._id] : "loading..."}
                    </Typography>
                  </Box>
                  <Box sx={styles.left.total}>
                    <Typography sx={styles.subTitle} variant="body2">
                      Ngày check in:
                    </Typography>
                    <Typography sx={styles.subTitle} variant="body2">
                      {moment(e?.createdAt).format("DD-MM-YYYY")}
                    </Typography>
                  </Box>
                  <Box sx={styles.left.total}>
                    <Typography sx={styles.subTitle} variant="body2">
                      Thời gian check in:
                    </Typography>
                    <Typography sx={styles.subTitle} variant="body2">
                      {e.timeCheckIn.slice(0, 2)}h{e.timeCheckIn.slice(2, 4)}
                    </Typography>
                  </Box>
                  <Box sx={styles.left.total}>
                    <Typography sx={styles.subTitle} variant="body2">
                      Yêu cầu đặc biệt:
                    </Typography>
                    <Typography sx={styles.subTitle} variant="body2">
                      {e.specialRequired
                        ? e.specialRequired
                        : "Không có yêu cầu!"}
                    </Typography>
                  </Box>
                  <Box sx={styles.left.total}>
                    <Typography sx={styles.subTitle} variant="body2">
                      Trạng thái:
                    </Typography>
                    <Typography sx={styles.subTitle} variant="body2">
                      {e?.status === "pending"
                        ? "Chưa check in"
                        : "Đã check in"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={styles.right}>
                <Typography variant="h6">Đánh giá về nhà hàng</Typography>
                <Box sx={styles.right.emoIcon}>
                  <Button sx={styles.right.emoIcon.bad}>
                    <SentimentDissatisfiedOutlinedIcon sx={styles.right.icon} />
                  </Button>

                  <Button sx={styles.right.emoIcon.average}>
                    <SentimentNeutralOutlinedIcon sx={styles.right.icon} />
                  </Button>

                  <Button sx={styles.right.emoIcon.ok}>
                    <SentimentSatisfiedAltOutlinedIcon sx={styles.right.icon} />
                  </Button>

                  <Button sx={styles.right.emoIcon.good}>
                    <EmojiEmotionsOutlinedIcon sx={styles.right.icon} />
                  </Button>

                  <Button sx={styles.right.emoIcon.awesome}>
                    <SentimentVerySatisfiedOutlinedIcon
                      sx={styles.right.icon}
                    />
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default Tab4;
