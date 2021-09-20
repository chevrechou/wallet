import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import { Category } from "@material-ui/icons";

const initState = {
  labels: ["test"],
  allItems: [],
  // const newItem = {
  //   id: allItems.length + 1,
  //   label: category,
  //   value: value,
  //   color: random_rgba(), //"#" + Math.floor(Math.random() * 16777215).toString(16),
  // };
};

function reducer(state, action) {
  switch (action.type) {
    case "REMOVE":
      const category = action.value.label;
      const items = state.allItems.filter(
        (item) => item.category === category
      )[0];
      const categoryItems = state.allItems.filter(
        (item) => item.category === category
      )[0].items;
      // console.log(categoryItems.filter((item) => item.id !== action.value.id));
      const filteredCategoryItems = categoryItems.filter(
        (item) => item.id !== action.value.id
      );
      items.items = filteredCategoryItems;
      items.totalValue = items.items.reduce((a, b) => {
        console.log(a, b.value);
        return a + b.value;
      }, 0);
      // console.log(items);
      // console.log(
      //   "state: ",
      //   state.allItems
      //     .filter((item) => item.category === category)[0]
      //     .items.filter((entry) => entry.id != action.value.id)
      // );

      // axios
      //   .post("http://localhost:4000/users/update-store", updatedItems)
      //   .then((res) => {
      //     // console.log(res.data);
      //   })
      //   .catch((error) => {
      //     // console.log(error);
      //   });
      console.log("REM", [...state.allItems]);
      return {
        ...state,
        allItems: [...state.allItems],
      };

    case "ADD_ITEM":
      const current = action.value;

      const itemAlreadyExist = state.allItems.find(
        (item) => item.category === action.value.label
      );
      if (itemAlreadyExist) {
        itemAlreadyExist.items.push(current);
        itemAlreadyExist.totalValue += current.value;

        const updatedItems = state.allItems.filter(
          (item) => item.category !== itemAlreadyExist.category
        );

        return {
          ...state,
          allItems: [...updatedItems, itemAlreadyExist],
        };
      }
      const generateColor = () => {
        return "#" + (Math.random().toString(16) + "000000").substring(2, 8);
      };

      const newItem = {
        category: current.label,
        totalValue: current.value,
        items: [current],
        color: generateColor(),
      };
      console.log("nc", newItem);
      axios
        .post("http://localhost:4000/users/add", newItem)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      return {
        ...state,

        allItems: [...state.allItems, newItem],
      };

    default:
      return state;
  }
}

const initialContext = {
  state: initState,
  dispatch: () => {},
};

const MainContext = createContext(initialContext);

export function MainProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState, undefined);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMainState = () => {
  const { state, dispatch } = useContext(MainContext);

  const setLabels = useCallback(
    (value) => {
      dispatch({ type: "ADD", value });
    },
    [dispatch]
  );
  return { labels: state.labels, setLabels };
};

export const useAllItemsState = () => {
  const { state, dispatch } = useContext(MainContext);

  const setAllItems = useCallback(
    (value) => {
      dispatch({ type: "ADD_ITEM", value });
    },
    [dispatch]
  );
  return { allItems: state.allItems, setAllItems };
};

export const useRemoveItem = () => {
  const { state, dispatch } = useContext(MainContext);

  const setRemoveItem = useCallback(
    (value) => {
      dispatch({ type: "REMOVE", value });
    },
    [dispatch]
  );
  return { allItems: state.allItems, setRemoveItem };
};
