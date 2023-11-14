import React, { useState } from "react";
import { CDN__URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addResInfo, showPopup } from "../Utils/cartSlice";
import Popup from "./Popup";
import { useParams } from "react-router-dom";

const ItemList = ({ items, restaurantInfo }) => {
  const { resId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);

  const [previousResID, setPreviousResID] = useState(null);
  const { show } = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const restaurantData = useSelector((store) => store.cart.restaurant);

  const handleAddItem = (item) => {
    setSelectedItem(item);

    const data = {
      resID: restaurantInfo?.id,
      id: item?.id,
      itemName: item?.name,
      price: item?.defaultPrice !== undefined ? item.defaultPrice : item?.price,
      veg: item?.itemAttribute,
    };

    if (restaurantData?.id === undefined || restaurantData?.id === resId) {
      console.log(
        {
          id: restaurantInfo?.id,
          resName: restaurantInfo?.name,
          areaName: restaurantInfo?.areaName,
          imageID: restaurantInfo?.cloudinaryImageId,
        },
        "DATA"
      );
      dispatch(
        addResInfo({
          id: restaurantInfo?.id,
          resName: restaurantInfo?.name,
          areaName: restaurantInfo?.areaName,
          imageID: restaurantInfo?.cloudinaryImageId,
        })
      );
      // Update the previousResID
      setPreviousResID(data.resID);

      dispatch(addItem(data));
    } else if (
      restaurantData?.id !== undefined &&
      restaurantData?.id !== resId
    ) {
      dispatch(showPopup(true));
    }
  };

  return (
    <div className=" ">
      {items?.itemCards?.map((item) => {
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
                  // className="w-full h-28  object-contain object-center  rounded-2xl py-2 "
                  className="w-full h-28  object-cover object-center  rounded-md  "
                />
              )}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1">
                <button
                  onClick={() => handleAddItem(item?.card?.info)}
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

      {show && <Popup item={selectedItem} restaurantInfo={restaurantInfo} />}
    </div>
  );
};

export default ItemList;
