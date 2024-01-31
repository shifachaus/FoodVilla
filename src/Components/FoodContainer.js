import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Banner from "./Banner";
import Shimmer from "./Shimmer";

const FoodContainer = ({ foodList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 480px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 768px)": {
        slides: { perView: 6.2, spacing: 14 },
      },
    },
  });

  if (!foodList) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-zinc-900">
          What's on your mind?
        </h1>
        {instanceRef.current && (
          <div className="flex gap-2">
            <button
              disabled={currentSlide === 0}
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              className="bg-gray-100 p-2 rounded-full disabled:text-gray-300"
            >
              <GoArrowLeft />
            </button>

            <button
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
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

      {foodList?.length == 0 ? (
        <div>
          <Shimmer box={4} />
          <div ref={sliderRef} className="keen-slider flex gap-4 ">
            {foodList?.info?.map((item) => {
              return (
                <Banner key={item?.id} height="md:h-48 h-32" item={item} />
              );
            })}
          </div>
        </div>
      ) : (
        <div ref={sliderRef} className="keen-slider flex gap-4 ">
          {foodList?.info?.map((item) => {
            return <Banner key={item?.id} height="md:h-48 h-32" item={item} />;
          })}
        </div>
      )}
    </section>
  );
};

export default FoodContainer;
