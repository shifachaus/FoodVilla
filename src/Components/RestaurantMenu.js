import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BiSolidStar } from "react-icons/bi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

import useCheckboxFilter from "../Hooks/useCheckboxFilter";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();

  useRestaurantMenu(resId);

  const { restaurant, menuItems } = useSelector((store) => store.menu);

  const [showIndex, setShowIndex] = useState(null);
  const { isChecked, categories, handleCheckboxChange } = useCheckboxFilter(
    false,
    menuItems
  );

  const renderMenu = categories === null ? menuItems : categories;

  return (
    <div className="w-[90%] max-w-4xl mt-28 mx-auto mb-10">
      {restaurant === null ? (
        <Shimmer box={2} />
      ) : (
        <div className="w-[90%] max-w-4xl mx-auto mt-6 mb-6">
          <div className="pt-2 pb-4 flex justify-between border-b-2 border-dashed">
            <div>
              <h2 className="text-xl font-medium text-neutral-800">
                {restaurant.name}
              </h2>
              <p className="text-xs text-gray-500">
                {restaurant.cuisines.join(", ")}
              </p>
            </div>
            <div className="border px-2 rounded-md flex flex-col items-center">
              <p className="flex items-center gap-1 text-md font-bold text-green-600 py-2">
                <BiSolidStar />
                {restaurant.avgRating}
              </p>
              <p className="text-[10px] text-gray-500 border-t py-2">
                {restaurant.totalRatingsString}
              </p>
            </div>
          </div>

          <div className="py-4 flex flex-col gap-x-5 gap-y-5 mb-8 border-b-2">
            <p className="text-md font-bold text-neutral-700 flex items-center gap-1">
              <HiOutlineCurrencyRupee className="text-xl" />
              {restaurant.costForTwoMessage.slice(1)}
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
                <div className="w-9 h-5 bg-gray-200 rounded peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          <div data-testid="menu">
            {renderMenu.map((category, index) => (
              <RestaurantCategory
                key={category.title}
                data={category}
                dataLength={categories?.length || menuItems?.length}
                index={index}
                showItems={index === showIndex}
                setShowIndex={() =>
                  setShowIndex((currentIndex) =>
                    currentIndex === index ? null : index
                  )
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
