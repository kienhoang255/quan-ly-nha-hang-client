import React from "react";
import { Box, Divider, Typography } from "@mui/material";

interface Props {
  value: number;
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
      height: "170px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    left: {
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
  return (
    <>
      {value === 3 && (
        <Box sx={styles.container}>
          <Box sx={styles.billItem}>
            <Box sx={styles.left}>
              <Typography variant="h5" gutterBottom>
                Mã đặt bàn #734351
              </Typography>
              <Box sx={styles.left.content}>
                <Box sx={styles.left.total}>
                  <Typography variant="body1">Tên khách hàng:</Typography>
                  <Typography variant="body1">Kien</Typography>
                </Box>
                <Box sx={styles.left.total}>
                  <Typography sx={styles.subTitle} variant="body2">
                    Ngày check in:
                  </Typography>
                  <Typography sx={styles.subTitle} variant="body2">
                    Coin
                  </Typography>
                </Box>
                <Box sx={styles.left.total}>
                  <Typography sx={styles.subTitle} variant="body2">
                    Thời gian check in:
                  </Typography>
                  <Typography sx={styles.subTitle} variant="body2">
                    Coin
                  </Typography>
                </Box>
                <Box sx={styles.left.total}>
                  <Typography sx={styles.subTitle} variant="body2">
                    Số lượng người:
                  </Typography>
                  <Typography sx={styles.subTitle} variant="body2">
                    Coin
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box sx={styles.right}>
              <Typography variant="h6">Coin</Typography>
              <Box></Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Tab4;
