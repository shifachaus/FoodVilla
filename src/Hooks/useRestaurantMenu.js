import { useEffect, useState } from "react";
import { MENU__API } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addMenuItems, addRestaurantInfo } from "../Utils/menuSlice";

const useRestaurantMenu = (resId) => {
  const dispatch = useDispatch();

  const [restaurant, setRestaurant] = useState(null); // use useState to store restaurant data
  const [menuItems, setMenuItems] = useState([]); // use useState to store restaurant Menu Item data

  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
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
        setRestaurant(restaurantData);
        dispatch(addRestaurantInfo(restaurantData));

        // Set menu item data
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

        // ?.map((x) => x.itemCards)
        // .flat()
        // .map((x) => x.card?.info) || [];

        const uniqueMenuItems = [];
        menuItemsData.forEach((item) => {
          if (!uniqueMenuItems.find((x) => x.id === item.id)) {
            uniqueMenuItems.push(item);
          }
        });
        setMenuItems(menuItemsData);
        dispatch(addMenuItems(menuItemsData));
      }
    } catch (err) {
      setMenuItems([]);
      setRestaurant(null);
      dispatch(addRestaurantInfo(null));
      dispatch(addMenuItems(null));
      console.error(err);
    }
  }
  return [restaurant, menuItems];
};

export default useRestaurantMenu;
