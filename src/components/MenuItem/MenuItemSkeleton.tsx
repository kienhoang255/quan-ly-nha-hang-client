import React from "react";
import { Card, Skeleton } from "@mui/material";

const MenuItemSkeleton = () => {
  return (
    <Card
      sx={{
        width: { xs: "280px", sm: "200px", md: "210px", lg: "270px" },
        height: { xs: "340px", sm: "250px", md: "265px", lg: "330px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="rounded"
        sx={{
          height: { xs: "280px", sm: "200px", md: "210px", lg: "270px" },
          width: "100%",
        }}
      />
      <Skeleton width={120} height={40} />
      <Skeleton width={120} height={20} />
    </Card>
  );
};

export default MenuItemSkeleton;
