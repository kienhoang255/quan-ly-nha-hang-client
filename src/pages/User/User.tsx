import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Alert, Slide } from "@mui/material";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setTab } from "../../features/tab/tabSlice";

const User = () => {
  const [triggerAlert, setTriggerAlert] = useState(false);
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
    alert: {
      position: "absolute",
      left: "20px",
      top: "20px",
      width: "300px",
      zIndex: 1100,
    },
  };

  const tab = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    dispatch(setTab(newValue));
  };

  const handleTriggerAlert = () => {
    setTriggerAlert(true);
  };

  useEffect(() => {
    let alert = setTimeout(() => {
      setTriggerAlert(false);
    }, 2000);
    return () => clearTimeout(alert);
  }, [triggerAlert]);

  return (
    <Box sx={styles.container}>
      <Slide direction="right" in={triggerAlert}>
        <Alert variant="filled" severity="success" sx={styles.alert}>
          Cập nhật thành công!
        </Alert>
      </Slide>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={styles.tabs}
          value={tab}
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
        <Tab1 value={tab} handleTriggerAlert={handleTriggerAlert} />
        <Tab2 value={tab} />
        <Tab3 value={tab} />
        <Tab4 value={tab} />
      </Box>
    </Box>
  );
};

export default User;
