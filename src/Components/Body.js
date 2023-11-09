import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/UserContext";
import { FiSearch } from "react-icons/fi";
import BannerContainer from "./BannerContainer";
import FoodContainer from "./FoodContainer";
import { SWIGGY_API_URL } from "../Utils/constants";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const [searchText, setSearchText] = useState("");

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
    <main className="w-[90%] max-w-6xl mt-28 mx-auto mb-8 ">
      {!onlineStatus && (
        <h3>
          Looks like you're offline!! please check your internet connection
        </h3>
      )}

      <BannerContainer bannerList={bannerList} />
      <FoodContainer foodList={foodList} />

      {/* Conditional Rendering */}

      <div className="flex flex-col gap-4 mb-6 md:flex-row mt-4">
        <div className="flex w-[90%] max-w-4xl mt-8 mx-auto ">
          <input
            type="text"
            className="w-full  border-l border-t border-b border-neutral-300  cursor-pointer bg-white py-2 px-4   flex-grow outline-none bg-transparent"
            placeholder="search for restaurants"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            data-testid="search-input"
          />
          <button
            data-testid="search-btn"
            className=" border-r border-t border-b   border-neutral-300  cursor-pointer py-2 px-2 "
            onClick={() => {
              //Filter the restaurant cards and update the UI
              // searchText
              const filteredList = listOfRestaurants?.filter((reataurant) => {
                return reataurant?.info?.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurant(filteredList);
            }}
          >
            <FiSearch className="text-xl text-neutral-500" />
          </button>
        </div>
        {/* <button
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4
            );
            setFilteredRestaurant(filteredList);
          }}
          className=" bg-purple-500 border border-purple-300 cursor-pointer  py-2 w-44   hover:shadow-xl"
        >
          Top Rated Restaurants
        </button> */}
        {/* <div>
          <label>User Name</label>
          <input
            type="text"
            className=" ml-2  border-purple-300  cursor-pointer bg-white py-2 px-4  border flex-grow outline-none bg-transparent"
            placeholder="search for restaurants"
            value={user?.name}
            onChange={(e) => setUser(e.target.value)}
          />
        </div> */}
      </div>
      <h2 className="font-bold text-xl sm:text-2xl mb-6">
        Restaurants with online food delivery in Mumbai
      </h2>

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
