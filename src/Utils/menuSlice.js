import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    restaurant: null,
    menuItems: null,
  },
  reducers: {
    addRestaurantInfo: (state, action) => {
      state.restaurant = action.payload;
    },
    addMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { addRestaurantInfo, addMenuItems } = menuSlice.actions;
export default menuSlice.reducer;
