import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const TableFoodBill = () => {
  const styles = {
    cellsNo: {
      padding: "8px",
      width: "40px",
    },
    cellsName: {
      padding: "8px",
    },
    cellsAmount: {
      padding: "8px",
      width: "70px",
    },
    cellsPrice: {
      padding: "8px",
    },
  };
  const data = [
    { name: "com suon bi cha", amount: 212, price: "10.000.000" },
    { name: "com", amount: 2, price: "40" },
    { name: "com", amount: 2, price: "40" },
    { name: "com", amount: 2, price: "40" },
    { name: "com", amount: 2, price: "40" },
    { name: "com", amount: 2, price: "40" },
    { name: "com", amount: 2, price: "40" },
    { name: "com", amount: 2, price: "40" },
  ];
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
          {data.map((row, key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child td": { border: 0 } }}
            >
              <TableCell sx={styles.cellsNo} align="left">
                {key}
              </TableCell>
              <TableCell component="th" scope="row" sx={styles.cellsName}>
                {row.name}
              </TableCell>

              <TableCell sx={styles.cellsAmount} align="center">
                {row.amount}
              </TableCell>
              <TableCell sx={styles.cellsPrice} align="right">
                {row.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableFoodBill;
