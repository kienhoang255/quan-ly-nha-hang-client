const styles = {
  container: {
    width: "1140px",
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    justifyItems: "center",
  },
  leftContainer: {},
  leftDetail: {
    width: "320px",
    // height: "300px",
    margin: "0 0 16px 0",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",

    title: { fontWeight: "700", fontSize: "16px", lineHeight: "24px" },
    content: {
      display: "grid",
      gridTemplateColumns: "1fr 2px 1fr",
      flexGrow: "1",
      justifyItems: "center",
      gap: "10px",
      wrap: {
        titleWrap: {
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "20px",
          color: "#1a1a1a",
        },
        text: {
          fontWeight: "700",
          fontSize: "16px",
          lineHeight: "24px",
        },
      },
    },

    btn: {
      gridColumn: "3 span",
      height: "40px",
      margin: "16px 0 0 0",
      justifySelf: "end",
    },
  },

  rightContainer: {},
  rightDetailTable: {
    width: "700px",
    height: "160px",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "8px",
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    padding: "16px",
    margin: "0 0 16px 0",

    name: { fontWeight: "700" },
    numOfPeople: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      icon: { fontSize: "18px", paddingLeft: "6px" },
      detail: {
        display: "grid",
        gridTemplateColumns: "12px 1fr",
        gap: "12px",
        margin: "16px 0 0 0",
      },
    },
  },

  box: {
    width: "700px",
    padding: "16px",
    backgroundColor: "#ebf3ff",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "8px",
    margin: "0 0 16px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",

    title: { fontSize: "20px", fontWeight: "700", lineHeight: "28px" },
    chip: {
      width: "fit-content",
      color: "#006607",
      backgroundColor: "#d2edd5",
      margin: "12px 0",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    input: { backgroundColor: "white" },
    subTitle: { fontSize: "14px", fontWeight: "400", lineHeight: "20px" },
    field: { backgroundColor: "white", margin: "16px 0 0 0" },
  },
};

export default styles;
