import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

import useRestaurantMenu from "../Utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { BiSolidStar } from "react-icons/bi";
import Popup from "./Popup";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [isChecked, setIsChecked] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showIndex, setShowIndex] = useState(null);

  // const categories =
  //   resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
  //     (c) =>
  //       c.card?.["card"]?.["@type"] ===
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   );

  useEffect(() => {
    setCategories(
      resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
    );
  }, [resId, resInfo]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      const categoriesWithVegItems = categories?.map((category) => {
        // Filter "VEG" items from the original category array
        const vegItems = category?.card?.card?.itemCards
          ?.flatMap((item) => item?.card?.info)
          ?.filter((info) => info?.itemAttribute?.vegClassifier === "VEG");

        return {
          ...category.card,
          card: {
            ...category?.card,
            card: {
              ...category?.card?.card,
              itemCards: (category?.card?.card?.itemCards || [])
                .filter((_, index) => index < vegItems.length) // Filter out extra itemCards beyond vegItems length
                .map((itemCard, index) => ({
                  card: {
                    ...itemCard.card,
                    info: vegItems[index], // Assign vegItem or undefined
                  },
                })),
            },
          },
        };
      });

      setCategories(categoriesWithVegItems);
    } else {
      setCategories(
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (c) =>
            c.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
      );
    }
  };

  console.log(categories, "categories");

  return (
    <div className=" w-[90%] max-w-4xl mt-28 mx-auto mb-10 ">
      {resInfo === null ? (
        <Shimmer
          box={2}
          style="h-20 sm:h-40 md:h-56 lg:h-60  w-full mx-auto"
          hide="block h-2"
          heading="block h-3"
          grid="sm:grid-cols-1 gap-6 md:grid-cols-2 "
        />
      ) : (
        <div className="w-[90%] max-w-4xl  mx-auto mt-6 mb-6">
          <div className="pt-2 pb-4 flex justify-between  border-b-2 border-dashed ">
            <div>
              <h2 className="text-xl font-medium text-neutral-800">
                {resInfo?.cards[0]?.card?.card?.info?.name}
              </h2>
              <p className="text-xs text-gray-500">
                {resInfo?.cards[0]?.card?.card?.info?.cuisines?.join(", ")}
              </p>
            </div>
            <div className="border px-2 rounded-md  flex flex-col items-center">
              <p className="flex items-center gap-1 text-md font-bold text-green-600 py-2">
                <span>
                  <BiSolidStar />
                </span>{" "}
                {resInfo?.cards[0]?.card?.card?.info?.avgRating}
              </p>
              <p className="text-[10px] text-gray-500  border-t py-2">
                {resInfo?.cards[0]?.card?.card?.info?.totalRatingsString}
              </p>
            </div>
          </div>

          <div className="py-4 flex flex-col gap-x-5 gap-y-5 mb-8  border-b-2 ">
            {/* <p> {resInfo?.cards[0]?.card?.card?.info?.sla?.lastMileTravel} </p> */}
            <p className="text-md font-bold text-neutral-700 flex items-center gap-1">
              <HiOutlineCurrencyRupee className="text-xl" />
              {resInfo?.cards[0]?.card?.card?.info?.costForTwoMessage?.slice(1)}
            </p>

            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-neutral-500 flex items-center gap-1">
                Veg Only
              </p>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
                <div class="w-9 h-5 bg-gray-200 rounded  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-4 after:w-4 after:transition-all  peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          <div data-testid="menu">
            {categories?.map((c, index) => {
              return (
                // CONTROLLED COMPONENT🌟
                <RestaurantCategory
                  key={c?.card?.card.title}
                  data={c?.card?.card}
                  dataLength={categories?.length}
                  index={index}
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
      )}
    </div>
  );
};

export default RestaurantMenu;
