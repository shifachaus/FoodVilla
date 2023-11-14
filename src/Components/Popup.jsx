import React from "react";
import { useDispatch } from "react-redux";
import { addItem, addResInfo, hidePopup } from "../Utils/cartSlice";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";

const Popup = ({ item, restaurantInfo }) => {
  const { resId } = useParams();

  // Custom hook
  const resInfo = useRestaurantMenu(resId);
  console.log(resInfo, "POPUP");
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(hidePopup(false));
  };

  const handleAddItem = () => {
    const data = {
      resID: restaurantInfo?.id,
      id: item?.id,
      itemName: item?.name,
      price: item?.price,
      veg: item?.itemAttribute,
    };

    dispatch(
      addResInfo({
        id: restaurantInfo?.id,
        resName: restaurantInfo?.name,
        areaName: restaurantInfo?.areaName,
        imageID: restaurantInfo?.cloudinaryImageId,
      })
    );

    dispatch(addItem(data));
    closePopup();
  };

  return (
    <div
      id="info-popup"
      tabindex="-1"
      class=" overflow-y-auto overflow-x-hidden fixed bottom-16 left-1/2 transform -translate-x-1/2 shadow-2xl z-50"
    >
      <div class="relative p-4 bg-white rounded-md  md:p-8 max-w-lg ">
        <div class="mb-5  ">
          <h3 class="mb-3 text-lg font-bold text-neutral-700 ">
            Items already in cart
          </h3>
          <p className="text-xs md:text-sm text text-gray-500">
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
        </div>
        <div class=" grid grid-cols-2 gap-2  ">
          <button
            type="button"
            onClick={() => closePopup()}
            class="py-2 px-4 w-full text-sm font-medium text-green-600  bg-white rounded-sm border-2 border-green-600  hover:shadow-md  focus:z-10 "
          >
            NO
          </button>
          <button
            onClick={() => handleAddItem()}
            type="button"
            class="py-2 px-4 w-full text-sm font-medium text-neutral-100 bg-green-600  rounded-sm border border-green-600  hover:shadow-md  focus:z-10 "
          >
            YES,START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
