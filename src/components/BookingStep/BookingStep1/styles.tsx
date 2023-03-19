const styles = {
  container: {
    width: "1140px",
    display: "grid",
    gridTemplateColumns: { sm: "1fr", md: "280px 1fr" },
    gap: "12px",
  },

  left: {
    width: { sm: "590px", md: "100%" },
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  contentSearch: {
    display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    width: "calc(100% - 16px * 2)",
    gap: "12px",
    padding: "16px",
  },

  contentFilter: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "6px",
    width: "calc(100% - 16px * 2)",
    padding: "16px",
  },
  containerFound: {},

  btnSearch: {
    height: "52px",
    backgroundColor: "#ff720d",
    "&:hover": {
      backgroundColor: "#231f20",
      color: "#ff720d ",
    },
  },
};

export default styles;
