import { useEffect, useState } from "react";
import { MENU__API } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addMenuItems, addRestaurantInfo } from "../Utils/menuSlice";

const useRestaurantMenu = (resId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getRestaurantInfo();
  }, [resId]);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(MENU__API + resId);
      if (!response.ok) {
        const err = response.status;
        throw new Error(err);
      } else {
        const json = await response.json();

        // Set restaurant data
        const restaurantData =
          json?.data?.cards
            ?.map((x) => x.card)
            ?.find(
              (x) =>
                x &&
                x.card["@type"] ===
                  "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
            )?.card?.info || null;

        dispatch(addRestaurantInfo(restaurantData));

        const menuItemsData =
          json?.data?.cards
            .find((x) => x.groupedCard)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
              (x) => x.card?.card
            )
            ?.filter(
              (x) =>
                x["@type"] ==
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
            ) || [];

        const uniqueMenuItems = [];
        menuItemsData.forEach((item) => {
          if (!uniqueMenuItems.find((x) => x.id === item.id)) {
            uniqueMenuItems.push(item);
          }
        });

        dispatch(addMenuItems(menuItemsData));
      }
    } catch (err) {
      dispatch(addRestaurantInfo(null));
      dispatch(addMenuItems(null));
      console.error(err);
    }
  }
};

export default useRestaurantMenu;
