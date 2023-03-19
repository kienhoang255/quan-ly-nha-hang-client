import { createSlice } from "@reduxjs/toolkit";

interface TableState {
  stage: number[];
  table: {
    numOfPeople: number;
    name: string;
    status: string;
    stage: number;
    _id: string;
  }[];
  options: number[];
  tableImage: { [_id: string]: any };
}

const initialState: TableState = {
  stage: [],
  table: [],
  options: [],
  tableImage: {},
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setStage: (state, action) => {
      return { ...state, stage: action.payload };
    },
    setTable: (state, action) => {
      return { ...state, table: [...action.payload] };
    },
    updateTable: (state, action) => {
      return { ...state, table: [...state.table, ...action.payload] };
    },
    setOptions: (state, action) => {
      return { ...state, options: action.payload };
    },
    setTableImage: (state, action) => {
      return {
        ...state,
        tableImage: {
          ...state.tableImage,
          [action.payload.id_table]: action.payload,
        },
      };
    },
  },
});

export const { setStage, setTable, updateTable, setOptions, setTableImage } =
  tableSlice.actions;

export default tableSlice.reducer;
