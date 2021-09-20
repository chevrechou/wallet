import React, {
  useState,
  useEffect,
} from "react";
import { useAllItemsState, useMainState } from "../reducers/mainReducer";
import MonthlyPie from "./MonthlyPie";
import MonthlyForm from "./MonthlyForm";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { categories } from "../constants/form";
import Row from "./Table/Row";
function MonthlyTable({ data }) {
  const { allItems } = useAllItemsState();
  const [rows, setRows] = useState([]);

  const createData = (category, value) => {
    return { category, value };
  };

  useEffect(() => {
    const processedRows = allItems.map((item) =>
      createData(item.category, item.totalValue)
    );
    console.log(processedRows);
    setRows(processedRows);
  }, [data]);

  return (
    <TableContainer className="table_container">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Total Value ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, idx) => (
            <Row category={category} rows={allItems} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default MonthlyTable;
