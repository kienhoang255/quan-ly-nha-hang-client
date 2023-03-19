import React, { Key, useEffect, useMemo, useState } from "react";
import MenuItem from "../../components/MenuItem/MenuItem";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import services from "../../services";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  addFoodByApi,
  addTypeByApi,
  addTypeCalled,
} from "../../features/menu/menuSlice";
import MenuItemSkeleton from "../../components/MenuItem/MenuItemSkeleton";

const Menu = () => {
  const [alignment, setAlignment] = useState<String>();
  const menu = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "25% 75%",
      maxWidth: { sm: "sm", md: "md", lg: "lg" },
      margin: "auto",
    },

    menuList: {
      height: "696px",
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
      justifyItems: "center",
      gap: "15px",
      overflow: "hidden",
      overflowY: "auto",
    },

    typeList: {
      width: "calc(100% - 10px)",
    },
  };

  useMemo(() => {
    services.getAllTypeFood().then((res) => {
      dispatch(addTypeByApi(res));
    });
  }, []);

  useEffect(() => {
    setAlignment(menu.type[0]);
    if (menu.foods.length === 0 && menu.type.length !== 0) {
      dispatch(addTypeCalled(menu.type[0]));
      services.getFoodByType({ type: alignment }).then((res) => {
        dispatch(addFoodByApi(res));
      });
    }
  }, [menu.type]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment ? newAlignment : alignment);

    if (!menu.typeCalled.find((food: string) => food === newAlignment)) {
      services.getFoodByType({ type: newAlignment }).then((res) => {
        dispatch(addFoodByApi(res));
      });
      dispatch(addTypeCalled(newAlignment));
    }
  };

  const existData = menu.foods?.filter(
    (e: { type: string }) => e.type === alignment
  );

  return (
    <Box sx={styles.container}>
      <ToggleButtonGroup
        orientation="vertical"
        color="primary" //chinh mau
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={styles.typeList}
      >
        {menu.type?.map((e: String, key: Key) => (
          <ToggleButton key={key} value={e}>
            {e}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box sx={styles.menuList}>
        {existData[0] ? (
          existData.map((food, key: Key) => (
            <MenuItem key={key} foodInfo={food} />
          ))
        ) : (
          <>
            <MenuItemSkeleton />
            <MenuItemSkeleton />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Menu;
