import { useEffect, useState } from "react";

const useRestaurantData = (API_URL) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  // async function getRestaurant to fetch API data
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

        setAllRestaurants(resData);
        setFilteredRes(resData);

        console.log(
          json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        );

        setBannerList(json?.data?.cards[0]?.card?.card?.imageGridCards);
        setFoodList(
          json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  return [allRestaurants, filteredRes, bannerList, foodList];
};

export default useRestaurantData;
