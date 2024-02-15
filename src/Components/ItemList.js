import { CDN__URL } from "../Utils/constants";
import Popup from "./Popup";

const ItemList = ({
  items,
  restaurantInfo,
  handleAddItem,
  selectedItem,
  show,
}) => {
  return (
    <div>
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
                {item?.card?.info?.description}
              </p>
            </div>
            <div className="w-3/12 relative sm:my-4">
              {item?.card?.info?.imageId && (
                <img
                  src={CDN__URL + item?.card?.info?.imageId}
                  alt="image"
                  className="w-full h-28 object-cover object-center rounded-md"
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
