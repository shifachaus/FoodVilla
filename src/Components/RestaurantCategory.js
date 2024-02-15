import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlArrowDown } from "react-icons/sl";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import ItemList from "./ItemList";
import useAddItemToCart from "../Hooks/useAddItemToCart";

const RestaurantCategory = ({
  data,
  showItems,
  setShowIndex,
  dataLength,
  index,
}) => {
  const { resId } = useParams();

  const { restaurant } = useSelector((store) => store.menu);
  useRestaurantMenu(resId);

  function handleClick() {
    setShowIndex();
  }

  const { handleAddItem, selectedItem, show } = useAddItemToCart(
    restaurant,
    resId
  );

  return (
    <>
      {data?.itemCards?.length > 0 && (
        <div
          className={
            index < dataLength - 1 && `border-b-[14px] border-neutral-100`
          }
        >
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

          {showItems && (
            <ItemList
              items={data}
              restaurantInfo={restaurant}
              handleAddItem={handleAddItem}
              selectedItem={selectedItem}
              show={show}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantCategory;
