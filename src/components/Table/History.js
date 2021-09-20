import React from "react";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { formatter } from "../../utils/index";
import { useRemoveItem } from "../../reducers/mainReducer";

function History({ obj, open }) {
  const { setRemoveItem } = useRemoveItem();
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box margin={1}>
        {obj?.items?.length ? (
          <>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {obj &&
                  obj.items.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow ? historyRow.id : ""}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.description}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow && formatter.format(historyRow.value)}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={() => setRemoveItem(historyRow)}
                      >
                        <button>Remove</button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div>No entries</div>
        )}
      </Box>
    </Collapse>
  );
}

export default History;
