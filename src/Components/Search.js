import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import SearchResult from "./SearchResult";
import { ShimmerSerach } from "./Shimmer";
import { SEARCH__API } from "../Utils/constants";

const Search = () => {
  const [showShimmer, setShowShimmer] = useState(true);
  const [inputSearch, setInputSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      const data = await fetch(SEARCH__API + inputSearch);
      const json = await data.json();
      console.log(json?.data?.suggestions, "SER");
      setResults(json?.data?.suggestions);
    };

    const debounceInput = setTimeout(() => {
      getSearchResult();
    }, 500);

    return () => clearTimeout(debounceInput);
  }, [inputSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowShimmer(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      className={`w-[90%] max-w-4xl mt-28 mx-auto mb-8 ${
        results?.length > 0 ? "" : "h-screen"
      }`}
    >
      <div className="flex mb-8">
        <input
          type="text"
          className="w-full  border-l border-t border-b border-neutral-300  cursor-pointer bg-white py-2 px-4   flex-grow outline-none bg-transparent"
          placeholder="search for restaurants and food"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          data-testid="search-input"
        />
        <span
          data-testid="search-btn"
          className=" border-r border-t border-b   border-neutral-300  cursor-pointer py-2 px-2 "
        >
          {inputSearch.length === 0 ? (
            <FiSearch className="text-xl text-neutral-500" />
          ) : (
            <RxCross1
              className="text-xl text-neutral-500"
              onClick={() => setInputSearch("")}
            />
          )}
        </span>
      </div>

      {showShimmer ? (
        <ShimmerSerach box={3} />
      ) : results?.length > 0 ? (
        <SearchResult results={results} />
      ) : (
        <h2 className="text-neutral-800 text-[1.2rem] font-bold ml-4">
          Popular Cuisines
        </h2>
      )}
    </section>
  );
};

export default Search;
