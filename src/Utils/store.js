import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import restaurantSlice from "./restaurantSlice";
import menuSlice from "./menuSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurants: restaurantSlice,
    menu: menuSlice,
  },
});

export default store;
