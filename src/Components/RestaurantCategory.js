import React from "react";
import ItemList from "./ItemList";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  //   console.log(data);

  function handleClick() {
    // console.log(showItems, "showItems");
    setShowIndex();
  }

  return (
    <div className="border-b-[14px] border-neutral-100">
      {/* Header */}
      <div
        className="flex gap-2 justify-between mb-4 mt-4 cursor-pointer"
        onClick={handleClick}
      >
        <p className="font-bold text-md">
          {data?.title} ({data?.itemCards?.length})
        </p>
        <span>
          <SlArrowDown className="text-xl text-neutral-500" />
        </span>
      </div>
      {/* Body */}
      {showItems && <ItemList items={data?.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
