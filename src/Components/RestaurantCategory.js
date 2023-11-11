import React from "react";
import ItemList from "./ItemList";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import useRestaurantMenu from "../Utils/useRestaurantMenu";
import { useParams } from "react-router-dom";

const RestaurantCategory = ({
  data,
  showItems,
  setShowIndex,
  dataLength,
  index,
}) => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  // console.log(resInfo?.cards[0]?.card?.card?.info, "ITEMS", resId);

  //   console.log(data);

  function handleClick() {
    // console.log(showItems, "showItems");
    setShowIndex();
  }

  return (
    <div
      className={index < dataLength - 1 && `border-b-[14px] border-neutral-100`}
    >
      {/* Header */}
      <div
        className="flex gap-2 justify-between mb-4 mt-4 cursor-pointer"
        onClick={handleClick}
      >
        <p className="font-bold text-neutral-800 text-md">
          {data?.title} ({data?.itemCards?.length})
        </p>
        <span>
          <SlArrowDown className="text-sm text-neutral-500" />
        </span>
      </div>
      {/* Body */}
      {showItems && (
        <ItemList
          items={data?.itemCards}
          restaurantInfo={resInfo?.cards[0]?.card?.card?.info}
        />
      )}
    </div>
  );
};

export default RestaurantCategory;
