import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { BiSolidStar } from "react-icons/bi";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { title } from "process";

const RestaurantMenu = () => {
  const { resId } = useParams();
  // const [resInfo, setresinfo] = useState([]);
  const [restaurant, menuItems] = useRestaurantMenu(resId);
  console.log(menuItems);

  const [isChecked, setIsChecked] = useState(false);
  const [categories, setCategories] = useState(null);

  const [showIndex, setShowIndex] = useState(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      const categoriesWithVegItems = menuItems.map((category) => ({
        ...category,
        itemCards: category.itemCards
          .filter(
            (card) => card.card?.info?.itemAttribute?.vegClassifier === "VEG"
          )
          .map((card) => ({
            ...card,
            card: {
              ...card.card,
              info: {
                ...card.card.info,
              },
            },
          })),
      }));

      setCategories(categoriesWithVegItems);
    } else {
      setCategories(menuItems);
    }
  };

  return (
    <div className=" w-[90%] max-w-4xl mt-28 mx-auto mb-10 ">
      {restaurant === null ? (
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
                {restaurant?.name}
              </h2>
              <p className="text-xs text-gray-500">
                {restaurant?.cuisines?.join(", ")}
              </p>
            </div>
            <div className="border px-2 rounded-md  flex flex-col items-center">
              <p className="flex items-center gap-1 text-md font-bold text-green-600 py-2">
                <span>
                  <BiSolidStar />
                </span>{" "}
                {restaurant?.avgRating}
              </p>
              <p className="text-[10px] text-gray-500  border-t py-2">
                {restaurant?.totalRatingsString}
              </p>
            </div>
          </div>

          <div className="py-4 flex flex-col gap-x-5 gap-y-5 mb-8  border-b-2 ">
            <p className="text-md font-bold text-neutral-700 flex items-center gap-1">
              <HiOutlineCurrencyRupee className="text-xl" />
              {restaurant?.costForTwoMessage?.slice(1)}
            </p>

            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-neutral-500 flex items-center gap-1">
                Veg Only
              </p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
                <div className="w-9 h-5 bg-gray-200 rounded  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-4 after:w-4 after:transition-all  peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          <div data-testid="menu">
            {(categories === null ? menuItems : categories)?.map((c, index) => {
              // console.log(c);
              return (
                <RestaurantCategory
                  key={c?.title}
                  data={c}
                  dataLength={categories?.length || menuItems?.length}
                  index={index}
                  showItems={index === showIndex ? true : false}
                  setShowIndex={() => {
                    // console.log(index),
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
