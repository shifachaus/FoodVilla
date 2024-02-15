import { createSlice, current } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    allRestaurants: null,
    filteredRes: null,
    bannerList: null,
    foodList: null,
    filteredRestaurant: null,
    isFilterActive: false,
  },

  reducers: {
    addRestaurants: (state, action) => {
      state.allRestaurants = action.payload;
    },
    addFilteredRestaurants: (state, action) => {
      state.filteredRes = action.payload;
    },
    addBannerList: (state, action) => {
      state.bannerList = action.payload;
    },
    addFoodList: (state, action) => {
      state.foodList = action.payload;
    },
    addFilteredRestaurantList: (state, action) => {
      const { allRestaurants, searchText } = action.payload;

      state.filteredRestaurant = allRestaurants?.filter((reataurant) => {
        return reataurant?.info?.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    },

    addHighRatedRestaurants: (state, action) => {
      const { allRestaurants, isFilterActive } = action.payload;
      state.isFilterActive = isFilterActive;

      if (state.isFilterActive) {
        state.filteredRestaurant = allRestaurants?.filter(
          (res) => res?.info?.avgRating > 4.4
        );
      } else {
        state.filteredRestaurant = allRestaurants;
      }
    },
  },
});

export const {
  addRestaurants,
  addFilteredRestaurants,
  addBannerList,
  addFoodList,
  addFilteredRestaurantList,
  addHighRatedRestaurants,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
