import React from "react";
import {IconButton} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
function ExpandIcon({ setOpen, open }) {
  return (
    <IconButton
      aria-label="expand row"
      size="small"
      onClick={() => setOpen(!open)}
    >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
}
export default ExpandIcon;
