import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem, addResInfo, showPopup } from "../Utils/cartSlice";

const useAddItemToCart = (restaurantInfo, resId) => {
  console.log(resId);
  const [selectedItem, setSelectedItem] = useState(null);
  const [previousResID, setPreviousResID] = useState(null);
  const { show } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const restaurantData = useSelector((store) => store.cart.restaurant);

  const handleAddItem = (item) => {
    setSelectedItem(item);

    const data = {
      resID: restaurantInfo?.id ?? null,
      id: item?.id ?? null,
      itemName: item?.name ?? null,
      price: item?.defaultPrice ?? item?.price ?? null,
      veg: item?.itemAttribute ?? null,
    };

    if (restaurantData?.id === undefined || restaurantData?.id === resId) {
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

  return { handleAddItem, selectedItem, show };
};

export default useAddItemToCart;
