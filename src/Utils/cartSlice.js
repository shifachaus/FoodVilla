import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    show: false,
    item: JSON.parse(localStorage.getItem("cart")) || [],
    restaurant: JSON.parse(localStorage.getItem("restaurantInfo")) || {},
  },
  reducers: {
    addResInfo: (state, action) => {
      state.restaurant = action.payload;
      localStorage.setItem("restaurantInfo", JSON.stringify(state.restaurant));
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

          localStorage.setItem("cart", JSON.stringify(state.item));
        } else {
          state.item.push({ ...action.payload, qty: 1 });
          localStorage.setItem("cart", JSON.stringify(state.item));
        }

        // Remove elements with different resID
        state.item = state.item.filter((item) => item.resID === resID);
        localStorage.setItem("cart", JSON.stringify(state.item));
      } else {
        // If resID is different, clear the cart
        state.item = [];
        localStorage.setItem("cart", JSON.stringify(state.item));
      }
    },

    removeItem: (state, action) => {
      let exists = state.item.find((i) => i?.id === action.payload?.id);

      if (exists) {
        state.item = state.item.map((r) =>
          r?.id === action.payload?.id ? { ...exists, qty: exists.qty - 1 } : r
        );

        localStorage.setItem("cart", JSON.stringify(state.item));
      }

      if (exists?.qty === 1) {
        state.item = state.item.filter((r) => r?.id !== action.payload?.id);
        localStorage.setItem("cart", JSON.stringify(state.item));
      }

      if (state.item.length === 0) {
        state.restaurant = {};
        localStorage.setItem(
          "restaurantInfo",
          JSON.stringify(state.restaurant)
        );
      }
    },
    clearCart: (state) => {
      Object.assign(state, {
        item: [],
        restaurant: {},
        show: false,
      });

      localStorage.removeItem("cart");
      localStorage.removeItem("restaurantInfo");
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
