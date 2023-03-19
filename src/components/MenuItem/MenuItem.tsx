import React, { memo } from "react";
import { Card, CardMedia, Typography, CardContent } from "@mui/material";

interface Props {
  foodInfo: { image: string; name: string; price: number };
}

const MenuItem: React.FC<Props> = ({ foodInfo }) => {
  const styles = {
    card: {
      width: { xs: "280px", sm: "200px", md: "210px", lg: "270px" },
      height: { xs: "340px", sm: "250px", md: "265px", lg: "330px" },
    },
    cardMedia: {
      height: { xs: "280px", sm: "200px", md: "210px", lg: "270px" },
    },
    descriptionContainer: {
      padding: "0px",
      paddingBottom: "0px !important",
    },
    description: {
      textAlign: "center",
    },
  };

  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.cardMedia}
        // image="https://random.imagecdn.app/500/150"
        image={foodInfo?.image}
        title={foodInfo?.name}
      />
      <CardContent sx={styles.descriptionContainer}>
        <Typography variant="h6" component="div" sx={styles.description}>
          {foodInfo?.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={styles.description}
        >
          {foodInfo?.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(MenuItem);
