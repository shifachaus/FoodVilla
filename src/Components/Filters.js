import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilteredRestaurantList,
  addHighRatedRestaurants,
} from "../Utils/restaurantSlice";

const Filters = () => {
  const [selectInput, setSelectInput] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { allRestaurants, isFilterActive } = useSelector(
    (store) => store.restaurants
  );

  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <div className="flex   ">
        <input
          type="text"
          className="w-full  border-l border-t border-b rounded-l-full  border-neutral-300  cursor-pointer bg-white py-2 px-4   flex-grow outline-none bg-transparent"
          placeholder="search for restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          data-testid="search-input"
        />
        {!selectInput ? (
          <button
            data-testid="search-btn"
            className=" border-r border-t border-b rounded-r-full  border-neutral-300  cursor-pointer py-2 px-2 "
            onClick={() => {
              dispatch(
                addFilteredRestaurantList({
                  allRestaurants,
                  searchText: searchText,
                })
              );

              setSelectInput(true);
            }}
          >
            <FiSearch className="text-xl text-neutral-500" />
          </button>
        ) : (
          <button
            data-testid="search-btn"
            className=" border-r border-t border-b rounded-r-full  border-neutral-300  cursor-pointer py-2 px-2 "
            onClick={() => {
              dispatch(
                addFilteredRestaurantList({
                  allRestaurants,
                  searchText: "",
                })
              );

              setSelectInput(false);
            }}
          >
            <RxCross1 className="text-xl text-neutral-600 " />
          </button>
        )}
      </div>
      <div
        className={` ${
          isFilterActive && "border-neutral-700 bg-neutral-100"
        } flex gap-1 items-center text-neutral-600 text-sm border border-neutral-300  rounded-full cursor-pointer  p-2  `}
      >
        <button
          onClick={() => {
            dispatch(
              addHighRatedRestaurants({ allRestaurants, isFilterActive: true })
            );
          }}
        >
          Ratings 4.0+
        </button>

        {isFilterActive && (
          <span
            onClick={() => {
              dispatch(
                addHighRatedRestaurants({
                  allRestaurants,
                  isFilterActive: false,
                })
              );
            }}
          >
            <RxCross1 className="text-md text-neutral-600 " />
          </span>
        )}
      </div>
    </div>
  );
};

export default Filters;
