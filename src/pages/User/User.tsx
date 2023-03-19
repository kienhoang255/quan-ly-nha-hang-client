import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import {
  PersonOutlineOutlined,
  ReceiptLongOutlined,
  BookmarkAddOutlined,
  CardGiftcardOutlined,
} from "@mui/icons-material";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";

const User = () => {
  const styles = {
    container: {
      minHeight: "676px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
    },
    tabs: { height: "60px" },
    btnTab: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 40px",
      "::selection": {
        color: "red",
      },
    },
    tabsContent: {
      marginTop: "40px",
    },
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={styles.container}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={styles.tabs}
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            sx={styles.btnTab}
            icon={<PersonOutlineOutlined />}
            label="Thông tin tài khoản"
          />
          <Tab
            sx={styles.btnTab}
            icon={<CardGiftcardOutlined />}
            label="Ưu đãi của tôi"
          />
          <Tab
            sx={styles.btnTab}
            icon={<ReceiptLongOutlined />}
            label="Lịch sử giao dịch"
          />
          <Tab
            sx={styles.btnTab}
            icon={<BookmarkAddOutlined />}
            label="Lịch sử đặt bàn"
          />
        </Tabs>
      </Box>
      <Box sx={styles.tabsContent}>
        <Tab1 value={value} />
        <Tab2 value={value} />
        <Tab3 value={value} />
        <Tab4 value={value} />
      </Box>
    </Box>
  );
};

export default User;
