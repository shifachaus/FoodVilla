import React from "react";
import { CDN__URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../Utils/cartSlice";

const ItemList = ({ items }) => {
  // console.log(items);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div className=" ">
      {items?.map((item) => {
        return (
          <div
            key={item?.card?.info?.id}
            className="flex justify-between border-b-2 p-2 gap-2"
          >
            <div className="flex flex-col gap-2 mb-2 w-9/12">
              <p className="font-medium">{item?.card?.info?.name}</p>
              <p className="text-sm  text-neutral-800">
                ₹
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </p>
              <p className="text-xs text-neutral-400">
                {" "}
                {item?.card?.info?.description}
              </p>
            </div>
            <div className="w-3/12 relative sm:my-4">
              {item?.card?.info?.imageId && (
                <img
                  src={CDN__URL + item?.card?.info?.imageId}
                  alt="image"
                  className="w-full h-28  object-contain object-center  rounded-2xl py-2 "
                />
              )}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1">
                <button
                  onClick={() => handleAddItem(item)}
                  className="w-20 uppercase px-2 pt-2 pb-3 rounded bg-white text-green-600 font-medium text-xs"
                  data-testid="add-btn"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
