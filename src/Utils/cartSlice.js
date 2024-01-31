import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    show: false,
    item: [],
    restaurant: {},
  },
  reducers: {
    addResInfo: (state, action) => {
      state.restaurant = action.payload;
    },

    addItem: (state, action) => {
      const { resID } = action.payload;

      if (state.restaurant && state.restaurant.id === resID) {
        const exists = state.item.find((r) => r?.id === action.payload?.id);

        if (exists) {
          state.item = state.item.map((r) =>
            r?.id === action.payload?.id
              ? { ...exists, qty: exists?.qty + 1 }
              : r
          );
        } else {
          state.item.push({ ...action.payload, qty: 1 });
        }

        // Remove elements with different resID
        state.item = state.item.filter((item) => item.resID === resID);
      } else {
        // If resID is different, clear the cart
        state.item = [];
      }
    },

    removeItem: (state, action) => {
      let exists = state.item.find((i) => i?.id === action.payload?.id);

      if (exists) {
        state.item = state.item.map((r) =>
          r?.id === action.payload?.id ? { ...exists, qty: exists.qty - 1 } : r
        );
      }

      if (exists?.qty === 1) {
        state.item = state.item.filter((r) => r?.id !== action.payload?.id);
      }
    },
    clearCart: (state) => {
      Object.assign(state, {
        item: [],
        restaurant: {},
        show: false,
      });
    },

    showPopup: (state, action) => {
      state.show = true;
    },
    hidePopup: (state, action) => {
      state.show = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  addResInfo,
  showPopup,
  hidePopup,
} = cartSlice.actions;
export default cartSlice.reducer;
