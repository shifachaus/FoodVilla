import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBannerList,
  addFilteredRestaurants,
  addFoodList,
  addRestaurants,
} from "../Utils/restaurantSlice";

const useRestaurantData = (API_URL) => {
  const { allRestaurants, filteredRes, bannerList, foodList } = useSelector(
    (store) => store.restaurants
  );

  const dispatch = useDispatch();

  useEffect(() => {
    !allRestaurants &&
      !filteredRes &&
      !bannerList &&
      !foodList &&
      getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        const err = response.status;
        throw new Error(err);
      } else {
        const json = await response.json();

        async function checkJsonData(jsonData) {
          for (let i = 0; i < jsonData?.data?.cards.length; i++) {
            let checkData =
              json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants;

            if (checkData !== undefined) {
              return checkData;
            }
          }
        }

        const resData = await checkJsonData(json);

        dispatch(addFilteredRestaurants(resData));
        dispatch(addRestaurants(resData));

        dispatch(addFoodList(json?.data?.cards[0]?.card?.card?.imageGridCards));
        dispatch(
          addBannerList(
            json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default useRestaurantData;
