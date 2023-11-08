import React from "react";
import { FiSearch } from "react-icons/fi";
import SearchResult from "./SearchResult";

const Search = () => {
  return (
    <section className="w-[90%] max-w-4xl mt-28 mx-auto mb-8 ">
      <div className="flex">
        <input
          type="text"
          className="w-full  border-l border-t border-b border-neutral-300  cursor-pointer bg-white py-2 px-4   flex-grow outline-none bg-transparent"
          placeholder="search for restaurants and food"
          // value={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
          data-testid="search-input"
        />
        <button
          data-testid="search-btn"
          className=" border-r border-t border-b   border-neutral-300  cursor-pointer py-2 px-2 "
          // onClick={() => {
          //   //Filter the restaurant cards and update the UI
          //   // searchText
          //   const filteredList = listOfRestaurants?.filter((reataurant) => {
          // 	return reataurant?.info?.name
          // 	  .toLowerCase()
          // 	  .includes(searchText.toLowerCase());
          //   });
          //   setFilteredRestaurant(filteredList);
          // }}
        >
          <FiSearch className="text-xl text-neutral-500" />
        </button>
      </div>

      <SearchResult />
    </section>
  );
};

export default Search;
