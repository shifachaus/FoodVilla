import React from "react";

const Banner = ({ item, height }) => {
  return (
    <div key={item?.id} className="flex gap-4  keen-slider__slide ">
      <img
        className={` rounded-3xl ${height}`}
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          item?.imageId
        }
        alt="banner"
      />
    </div>
  );
};

export default Banner;
