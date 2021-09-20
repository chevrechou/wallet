import {
  Button,
  CircularProgress,
  FormGroup,
  Input,
  InputAdornment,
  MenuItem,
  StylesProvider,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { categories } from "../constants/form";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import { useAllItemsState, useMainState } from "../reducers/mainReducer";

function MonthlyForm() {
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [enteringData, setEnteringData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState();
  const [date, setDate] = useState(Date);
  const [error, setError] = useState();
  const [description, setDescription] = useState("");
  const { labels, setLabels } = useMainState();
  const { allItems, setAllItems } = useAllItemsState();
  useEffect(() => {
    setList(labels);
  }, [labels]);

  const reset = () => {
    setCategory("");
    setValue(0);
    setDate(Date);
    setDescription("");
    setEnteringData(true);
    setLoading(false);
  };
  const generateColor = () => {
    return "#" + (Math.random().toString(16) + "000000").substring(2, 8);
  };

  const handleAdd = () => {
    setError("");
    setLoading(true);
    setEnteringData(false);
    setTimeout(() => {
      if (category && value) {
        const newItem = {
          id: date,
          label: category,
          value: Number(value),
        //   color: generateColor(), //"#" + Math.floor(Math.random() * 16777215).toString(16),
          description: description,
        };
        setAllItems(newItem);

        reset();
      } else {
        setError("error");
        setLoading(false);
      }
    }, 1000);
  };
  return loading ? (
    <CircularProgress className="loading" />
  ) : (
    <FormGroup className="form_control">
      <TextField
        className="form_control--input"
        id="standard-select-category"
        select
        required
        label="Select a category"
        value={category}
        variant="outlined"
        onChange={(e) => setCategory(e.target.value)}
        helperText="Please select your category"
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="date"
        className="form_control--input"
        label="Date"
        type="date"
        variant="outlined"
        value={date}
        InputLabelProps={{
          shrink: true,
        }}
        required
        onChange={(e) => setDate(e.target.value)}
      />

      <TextField
        className="form_control__multiline"
        label="Description"
        multiline
        maxRows={4}
        value={description}
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />

      <CurrencyTextField
        className="form_control--input"
        label="Amount"
        required
        variant="outlined"
        value={value}
        currencySymbol="$"
        minimumValue="0"
        outputFormat="string"
        decimalCharacter="."
        digitGroupSeparator=","
        onChange={(e, value) => setValue(value)}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={(e) => handleAdd()}
      >
        Submit
      </Button>
      <div> {error}</div>
    </FormGroup>
  );
}

export default MonthlyForm;
