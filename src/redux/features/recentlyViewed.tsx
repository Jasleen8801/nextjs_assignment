import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCoinDataByIdResponse } from "@/redux/api/types";

interface WatchListState {
  items: GetCoinDataByIdResponse[];
}

const initialState: WatchListState = {
  items: [],
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<GetCoinDataByIdResponse>) => {
      state.items = [action.payload, ...state.items.filter(item => item !== action.payload)];
      if (state.items.length > 10) {
        state.items.pop();
      }
    },
    removeAll: (state) => {
      state.items = [];
    }
  },
});

export const { add, removeAll } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;