import React, { memo } from "react";
import { Card, CardMedia, Typography, CardContent } from "@mui/material";
import utils from "../../utils";
import ModalPreviewFood from "../Modal/ModalPreviewFood";

interface Props {
  foodInfo: { image: string; name: string; price: number };
}

const MenuItem: React.FC<Props> = ({ foodInfo }) => {
  const styles = {
    card: {
      width: { xs: "280px", sm: "200px", md: "210px", lg: "270px" },
      height: { xs: "340px", sm: "250px", md: "265px", lg: "330px" },
      cursor: "pointer",
    },
    cardMedia: {
      height: { xs: "280px", sm: "200px", md: "210px", lg: "270px" },
    },
    descriptionContainer: {
      padding: "0px",
      paddingBottom: "0px !important",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    description: {
      // textAlign: "center",
    },
  };

  return (
    <ModalPreviewFood data={foodInfo}>
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
          {foodInfo?.price && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={styles.description}
            >
              {utils.formatVND(Number(foodInfo?.price))}
            </Typography>
          )}
        </CardContent>
      </Card>
    </ModalPreviewFood>
  );
};

export default memo(MenuItem);
