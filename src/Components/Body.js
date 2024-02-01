import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Hooks/useOnlineStatus";

import BannerContainer from "./BannerContainer";
import FoodContainer from "./FoodContainer";
import { SWIGGY_API_URL } from "../Utils/constants";
import Filters from "./Filters";
import useRestaurantData from "../Hooks/useRestaurantData";

const Body = () => {
  const [allRestaurants, filteredRes, bannerList, foodList] =
    useRestaurantData(SWIGGY_API_URL);

  // Local State Variable - Super powerful variable
  const [filteredRestaurant, setFilteredRestaurant] = useState(null);

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <h3>Looks like you're offline!! please check your internet connection</h3>
    );
  }

  //HOC
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  return (
    <main className="w-[90%] max-w-6xl mt-28 mx-auto mb-10 ">
      {!onlineStatus && (
        <h3>
          Looks like you're offline!! please check your internet connection
        </h3>
      )}

      <FoodContainer foodList={bannerList} />
      <BannerContainer bannerList={foodList} />

      <h2 className="font-extrabold text-xl sm:text-2xl mb-6">
        Restaurants with online food delivery in Mumbai
      </h2>

      <Filters
        setFilteredRestaurant={setFilteredRestaurant}
        listOfRestaurants={allRestaurants}
      />

      {allRestaurants?.length === 0 ? (
        <Shimmer box={12} />
      ) : (
        <section
          data-testid="res-list"
          className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 bg-white"
        >
          {(filteredRestaurant === null
            ? filteredRes
            : filteredRestaurant
          )?.map((restaurant) => (
            <Link
              key={restaurant?.info?.id}
              to={"/restaurant/" + restaurant?.info?.id}
            >
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
