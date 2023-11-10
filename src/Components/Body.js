import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/UserContext";

import BannerContainer from "./BannerContainer";
import FoodContainer from "./FoodContainer";
import { SWIGGY_API_URL } from "../Utils/constants";
import Filters from "./Filters";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const { user, setUser } = useContext(UserContext);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_API_URL);

    const json = await data.json();

    setBannerList(json?.data?.cards[0]?.card?.card?.imageGridCards);
    setFoodList(json?.data?.cards[1]?.card?.card?.imageGridCards);

    console.log(json?.data?.cards[1]?.card?.card?.imageGridCards, "DATA");
    // Optional Chaining
    setListOfRestraunt(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <h3>Looks like you're offline!! please check your internet connection</h3>
    );
  }

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  return (
    <main className="w-[90%] max-w-6xl mt-28 mx-auto mb-10 ">
      {!onlineStatus && (
        <h3>
          Looks like you're offline!! please check your internet connection
        </h3>
      )}

      <BannerContainer bannerList={bannerList} />
      <FoodContainer foodList={foodList} />

      <h2 className="font-extrabold text-xl sm:text-2xl mb-6">
        Restaurants with online food delivery in Mumbai
      </h2>

      <Filters
        setFilteredRestaurant={setFilteredRestaurant}
        listOfRestaurants={listOfRestaurants}
      />

      {listOfRestaurants?.length === 0 ? (
        <Shimmer
          box={12}
          heading="block h-3"
          style="h-20 sm:h-40 md:h-56 lg:h-60  w-full mx-auto"
          hide="block h-2"
          grid="sm:grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        />
      ) : (
        <section
          data-testid="res-list"
          className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 bg-white"
        >
          {filteredRestaurant?.map((restaurant) => (
            // console.log(restaurant),
            <Link
              key={restaurant?.info?.id}
              to={"/restaurant/" + restaurant?.info?.id}
            >
              {/* promoted */}

              {restaurant?.info?.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default Body;
