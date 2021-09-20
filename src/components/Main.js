import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useAllItemsState, useMainState } from "../reducers/mainReducer";
import MonthlyPie from "./MonthlyPie";
import MonthlyForm from "./MonthlyForm";
import MonthlyTable from "./MonthlyTable";
import MainDrawer from "./Drawer";

function Main() {
  const { allItems } = useAllItemsState();

  return (
    <>
      <MainDrawer />
      <div className="container">
        <div className="form_panel">
          <MonthlyForm />
        </div>

        <div className="control_panel">
          <div>
            <MonthlyTable data={allItems} />
          </div>
          <div>
            <MonthlyPie data={allItems} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
