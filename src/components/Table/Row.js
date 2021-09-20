import React, { useState } from "react";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import { formatter } from "../../utils/index";
import ExpandIcon from "../Table/ExpandIcon";
import History from "../Table/History";
import { useRemoveItem } from "../../reducers/mainReducer";

function Row({ category, rows }) {
  const [open, setOpen] = useState(false);
  const obj = rows.find((o) => o.category === category.label);

  return (
    <>
      <TableRow key={category.label} >
        <TableCell>
          <ExpandIcon setOpen={setOpen} open={open} />
        </TableCell>
        <TableCell component="th" scope="row">
          {category.label}
        </TableCell>
        <TableCell align="right">
          {/* total value */}
          {obj ? <div>{formatter.format(obj.totalValue)}</div> : "N/A"}
        </TableCell>
      </TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <History open={open} obj={obj} />
      </TableCell>
    </>
  );
}

export default Row;
