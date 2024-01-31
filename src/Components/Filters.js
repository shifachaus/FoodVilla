import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const Filters = ({ setFilteredRestaurant, listOfRestaurants }) => {
  const [select, setSelect] = useState(false);
  const [selectInput, setSelectInput] = useState(false);
  const [searchText, setSearchText] = useState("");
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
              const filteredList = listOfRestaurants?.filter((reataurant) => {
                return reataurant?.info?.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurant(filteredList);
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
              setFilteredRestaurant(listOfRestaurants);
              setSearchText("");
              setSelectInput(false);
            }}
          >
            <RxCross1 className="text-xl text-neutral-600 " />
          </button>
        )}
      </div>
      <div
        className={` ${
          select && "border-neutral-700 bg-neutral-100"
        } flex gap-1 items-center text-neutral-600 text-sm border border-neutral-300  rounded-full cursor-pointer  p-2  `}
      >
        <button
          onClick={() => {
            const filteredList = listOfRestaurants?.filter(
              (res) => res?.info?.avgRating > 4.0
            );
            setFilteredRestaurant(filteredList);
            setSelect(true);
          }}
        >
          Ratings 4.0+
        </button>

        {select && (
          <span
            onClick={() => {
              setFilteredRestaurant(listOfRestaurants);
              setSelect(false);
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
