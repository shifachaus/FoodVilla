import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

import useRestaurantMenu from "../Utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  // Custom hook
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  const category =
    resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(resInfo, "hello", category);

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log(categories, "categories", resInfo?.cards[0]?.card?.card?.info);

  return (
    <div className=" w-[90%] max-w-4xl mt-28 mx-auto mb-6 ">
      {resInfo === null && <Shimmer box={10} />}
      <div className="w-[90%] max-w-4xl  mx-auto mt-6 mb-6">
        <div className="py-2 flex justify-between  border-b-2 border-dashed ">
          <div>
            <h2 className="text-xl font-medium text-neutral-800">
              {resInfo?.cards[0]?.card?.card?.info?.name}
            </h2>
            <p className="text-xs text-gray-500">
              {resInfo?.cards[0]?.card?.card?.info?.cuisines?.join(", ")}
            </p>
          </div>
          <div className="border px-2 rounded-md  flex flex-col ">
            <p className="text-md font-bold text-gray-500 py-2">
              ⭐ {resInfo?.cards[0]?.card?.card?.info?.avgRating}
            </p>
            <p className="text-[10px] text-gray-500  border-t py-2">
              {resInfo?.cards[0]?.card?.card?.info?.totalRatingsString}
            </p>
          </div>
        </div>

        <div className="py-4 flex gap-x-5 mb-8  border-b-2 ">
          {/* <p> {resInfo?.cards[0]?.card?.card?.info?.sla?.lastMileTravel} </p> */}
          <p className="text-md font-bold">
            {" "}
            {resInfo?.cards[0]?.card?.card?.info?.costForTwoMessage}
          </p>
        </div>

        <div data-testid="menu">
          {categories?.map((c, index) => {
            // console.log(c, "CAT");
            return (
              // CONTROLLED COMPONENT🌟
              <RestaurantCategory
                key={c?.card?.card.title}
                data={c?.card?.card}
                showItems={index === showIndex ? true : false}
                setShowIndex={() => {
                  console.log(index),
                    setShowIndex(index === showIndex ? null : index);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
