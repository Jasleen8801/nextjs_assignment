import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecentlySearchedState {
  items: string[];
}

const initialState: RecentlySearchedState = {
  items: [],
};

export const recentlySearchedSlice = createSlice({
  name: "recentlySearched",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.items = [
        action.payload,
        ...state.items.filter((item) => item !== action.payload),
      ];
      if (state.items.length > 10) {
        state.items.pop();
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    removeAll: (state) => {
      state.items = [];
    }
  },
});

export const { add, remove, removeAll } = recentlySearchedSlice.actions;
export default recentlySearchedSlice.reducer;