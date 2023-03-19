import { Box, Typography, Button } from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";

const Rating = () => {
  const styles = {
    content: {
      width: "100%",
      display: "flex",
      height: "110px",
      padding: "20px 0",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f6f6f6",
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
  };
  return (
    <Box sx={styles.content}>
      <Typography variant="h6">Đánh giá về nhà hàng</Typography>
      <Box sx={styles.content.emoIcon}>
        <Button sx={styles.content.emoIcon.bad}>
          <SentimentDissatisfiedOutlinedIcon sx={styles.content.icon} />
        </Button>

        <Button sx={styles.content.emoIcon.average}>
          <SentimentNeutralOutlinedIcon sx={styles.content.icon} />
        </Button>

        <Button sx={styles.content.emoIcon.ok}>
          <SentimentSatisfiedAltOutlinedIcon sx={styles.content.icon} />
        </Button>

        <Button sx={styles.content.emoIcon.good}>
          <EmojiEmotionsOutlinedIcon sx={styles.content.icon} />
        </Button>

        <Button sx={styles.content.emoIcon.awesome}>
          <SentimentVerySatisfiedOutlinedIcon sx={styles.content.icon} />
        </Button>
      </Box>
    </Box>
  );
};

export default Rating;
