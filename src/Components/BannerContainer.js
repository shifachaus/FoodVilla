import "keen-slider/keen-slider.min.css";
import Shimmer from "./Shimmer";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Banner from "./Banner";
import RestaurantCard from "./RestaurantCard";

const BannerContainer = ({ bannerList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    slideChanged(slider) {
      setCurrentSlide(slider?.track?.details?.rel);
    },

    breakpoints: {
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 481px) and (max-width: 767px)": {
        slides: { perView: 2, spacing: 10 }, // Adjusted for screens between 481px and 767px
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 14 },
      },
      "(min-width: 800px)": {
        slides: { perView: 4, spacing: 14 },
      },
    },
  });

  if (!bannerList) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-zinc-900">
          Top restaurant chains in Mumbai
        </h1>
        {instanceRef?.current && (
          <div className="flex gap-2">
            <button
              disabled={currentSlide === 0}
              onClick={(e) =>
                e.stopPropagation() || instanceRef?.current?.prev()
              }
              className="bg-gray-100 p-2 rounded-full disabled:text-gray-300"
            >
              <GoArrowLeft />
            </button>

            <button
              onClick={(e) =>
                e.stopPropagation() || instanceRef?.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef?.current?.track?.details?.slides?.length - 1
              }
              className="bg-gray-100 p-2 rounded-full disabled:text-gray-300"
            >
              <GoArrowRight />
            </button>
          </div>
        )}
      </div>

      {bannerList.length === 0 ? (
        <div>
          <Shimmer heading="hidden " box={4} />
          <div ref={sliderRef} className="keen-slider flex gap-4 ">
            {bannerList.map((item) => {
              return (
                <Banner
                  item={item?.info}
                  key={item?.id}
                  height="md:h-64 h-40"
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div ref={sliderRef} className="keen-slider flex gap-4 ">
          {bannerList?.map((item) => {
            return (
              <div key={item?.info?.id}>
                <RestaurantCard resData={item} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BannerContainer;
