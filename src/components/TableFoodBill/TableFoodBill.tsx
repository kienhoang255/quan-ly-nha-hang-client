import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import utils from "../../utils";
import services from "../../services";

interface Props {
  orders?: any;
}

const TableFoodBill: React.FC<Props> = ({ orders }) => {
  const styles = {
    cellsNo: {
      padding: "8px",
      width: "40px",
    },
    cellsName: {
      padding: "8px",
      display: "flex !important",
      justifyContent: "space-between !important",
      flexDirection: "row !important",
    },
    cellsAmount: {
      padding: "8px",
      width: "70px",
    },
    cellsPrice: {
      padding: "8px",
    },

    cancel: {
      backgroundColor: "gray",
      color: "white",
    },
  };

  const [storeName, setStoreName] = useState<any>({});

  // const getNameFood = () => {
  //   orders.forEach((e: any) => {
  //     services.getFoodById(e._id).then((res) => {
  //       setStoreName((prev: any) => ({
  //         ...prev,
  //         [res.data._id]: res.data.name,
  //       }));
  //     });
  //   });
  // };

  useEffect(() => {
    orders.forEach((e: any) => {
      services.getFoodById(e?.id_food).then((res) => {
        setStoreName((prev: any) => ({
          ...prev,
          [res.data._id]: res.data.name,
        }));
      });
    });
  }, []);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={styles.cellsNo} align="left">
              No.
            </TableCell>
            <TableCell sx={styles.cellsName}>Tên</TableCell>
            <TableCell sx={styles.cellsAmount} align="center">
              Số lượng
            </TableCell>
            <TableCell sx={styles.cellsPrice} align="right">
              Giá
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row: any, key: any) => (
            <TableRow
              key={key}
              sx={{
                "&:last-child td, &:last-child td": {
                  border: 0,
                },
              }}
            >
              <TableCell
                sx={(styles.cellsNo, row.status == "cancel" && styles.cancel)}
                align="left"
              >
                {key}
              </TableCell>
              <TableCell
                sx={(styles.cellsName, row.status == "cancel" && styles.cancel)}
              >
                {storeName[row?.id_food]
                  ? storeName[row?.id_food]
                  : "loading..."}
              </TableCell>

              <TableCell
                sx={
                  (styles.cellsAmount, row.status == "cancel" && styles.cancel)
                }
                align="center"
              >
                {row.status == "cancel" ? "Đã hủy" : row?.quantity}
              </TableCell>
              <TableCell
                sx={
                  (styles.cellsPrice, row.status == "cancel" && styles.cancel)
                }
                align="right"
              >
                {utils.numberWithCommas(row?.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableFoodBill;
