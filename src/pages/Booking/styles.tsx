export const styles = {
  formContent: {
    // height: "635px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  container: {
    width: "100%",
    maxWidth: { sm: "sm", md: "md", lg: "lg" },
    margin: "auto",
  },
  containerHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "row" },
    justifyContent: "space-between",
    gap: "20px",
    margin: " 0 0 8px 0",
  },
  containerBody: {},
  actionBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    right: {
      display: "flex",
      gap: "20px",
    },
  },
  btn: {
    fontSize: { xs: "12px", sm: "13px", md: "14px", lg: "15px" },
    backgroundColor: "#ff720d",
    ":hover": {
      backgroundColor: "#ff720d",
    },
  },
  hotline: {
    textDecoration: "none",
  },
};
