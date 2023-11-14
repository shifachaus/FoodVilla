import { useEffect, useState } from "react";

const useRestaurantData = (API_URL) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);

  // async function getRestaurant to fetch API data
  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(API_URL);
      // if response is not ok then throw new Error
      if (!response.ok) {
        const err = response.status;
        throw new Error(err);
      } else {
        const json = await response.json();

        // initialize checkJsonData() function to check Swiggy Restaurant data
        async function checkJsonData(jsonData) {
          for (let i = 0; i < jsonData?.data?.cards.length; i++) {
            // initialize checkData for Swiggy Restaurant data
            let checkData =
              json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants;

            // if checkData is not undefined then return it
            if (checkData !== undefined) {
              return checkData;
            }
          }
        }

        // call the checkJsonData() function which return Swiggy Restaurant data
        const resData = await checkJsonData(json);

        // update the state variable restaurants with Swiggy API data
        setAllRestaurants(resData);
        setFilteredRes(resData);

        setBannerList(json?.data?.cards[0]?.card?.card?.imageGridCards);
        setFoodList(json?.data?.cards[1]?.card?.card?.imageGridCards);
      }
    } catch (error) {
      console.error(error); // show error in console
    }
  }
  return [allRestaurants, filteredRes, bannerList, foodList]; // return allRestaurants & filteredRestaurants data
};

export default useRestaurantData;
