import React, { useEffect } from "react";
import { Box } from "@mui/material";
import BillItem from "../../components/BillItem/BillItem";
import services from "../../services";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setBill } from "../../features/bill/billSlice";

interface Props {
  value: any;
}
const Tab3: React.FC<Props> = ({ value }) => {
  const styles = {
    container: {
      width: "920px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  };

  const user = useAppSelector((state) => state.user._id);
  const bill = useAppSelector((state) => state.bill);
  const dispatch = useAppDispatch();
  useEffect(() => {
    user &&
      services.getBillByIdClient(user).then((res) => {
        dispatch(setBill(res.data));
      });
  }, []);

  return (
    <>
      {value === 2 && (
        <Box sx={styles.container}>
          {bill.map(
            (e: {
              _id: string;
              orders: [any];
              totalPrice: string;
              createdAt: Date;
            }) => {
              if (e.status === "finished")
                return <BillItem key={e._id} billInfo={e} />;
            }
          )}
        </Box>
      )}
    </>
  );
};

export default Tab3;
