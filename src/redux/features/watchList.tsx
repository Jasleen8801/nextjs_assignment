import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCoinDataByIdResponse } from "@/redux/api/types";

interface WatchListState {
  items: GetCoinDataByIdResponse[];
}

const initialState: WatchListState = {
  items: [],
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<GetCoinDataByIdResponse>) => {
      state.items = [action.payload, ...state.items.filter(item => item !== action.payload)];
    },
    remove: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeAll: (state) => {
      state.items = [];
    }
  },
});

export const { add, remove, removeAll } = watchListSlice.actions;
export default watchListSlice.reducer;