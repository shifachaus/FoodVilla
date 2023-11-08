import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: [],
  },
  reducers: {
    addItem: (state, action) => {
      let exists = state.item.find(
        (r) => r?.card?.info?.id === action.payload?.card?.info?.id
      );

      if (exists) {
        state.item = state.item.map((r) =>
          r?.card?.info?.id === action.payload?.card?.info?.id
            ? { ...exists, qty: exists?.qty + 1 }
            : r
        );
      } else {
        state.item.push({ ...action.payload, qty: 1 });
      }
    },

    removeItem: (state, action) => {
      let exists = state.item.find(
        (i) => i?.card?.info?.id === action.payload?.card?.info?.id
      );

      if (exists) {
        state.item = state.item.map((r) =>
          r?.card?.info?.id === action.payload?.card?.info?.id
            ? { ...exists, qty: exists.qty - 1 }
            : r
        );
      }

      if (exists?.qty === 1) {
        state.item = state.item.filter(
          (r) => r?.card?.info?.id !== action.payload?.card?.info?.id
        );
      }
    },

    clearCart: (state) => {
      // state.item = [];
      state.item.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
