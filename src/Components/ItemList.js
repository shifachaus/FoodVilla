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
    <div className="bg-slate-50 ">
      {items?.map((item) => {
        return (
          <div
            key={item?.card?.info?.id}
            className="flex justify-between border-b-2 p-2 gap-2"
          >
            <div className="flex flex-col gap-2 mb-2 w-9/12">
              <p className="font-medium">{item?.card?.info?.name}</p>
              <p>
                ₹
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </p>
              <p>{item?.card?.info?.description}</p>
            </div>
            <div className="w-3/12 relative ">
              <div className="absolute  bottom-3">
                <button
                  onClick={() => handleAddItem(item)}
                  className="p-2 mx-10 rounded-lg bg-black text-white shadow-lg "
                  data-testid ="add-btn"
                >
                  Add +
                </button>
              </div>
              {item?.card?.info?.imageId && (
                <img src={CDN__URL + item?.card?.info?.imageId} alt="image" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
