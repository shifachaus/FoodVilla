import { CDN__URL } from "../Utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    avgRating,
    deliveryTime,
  } = resData?.info;

  return (
    <div className="mx-auto max-w-2xl  sm:py-3  flex flex-col gap-4 transition-all delay-75 duration-300 ease-linear hover:scale-95 keen-slider__slide">
      <div className="aspect-h-1 aspect-w-1 w-full  ">
        <img
          className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-2xl  "
          src={CDN__URL + cloudinaryImageId}
          alt="res__logo"
        />
      </div>
      <div className="px-2 flex flex-col gap-1">
        <h2 className="text-md md:text-lg text-gray-900 font-medium">{name}</h2>

        <div className="flex flex-col gap-1">
          <p className="text-sm md:text-md  text-gray-900 font-medium">
            ⭐{avgRating} . {deliveryTime} minutes
          </p>
          <p className=" text-sm md:text-md font-light text-gray-500">
            {cuisines.slice(0, 2).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

// HOC =>Higher Order Function
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="overflow-hidden">
        <label className="absolute bg-green-600 text-white  px-2 py-1  z-10 text-xs top-1">
          promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
