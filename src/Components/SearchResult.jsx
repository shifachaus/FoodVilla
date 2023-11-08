import React from "react";
import Shimmer from "./Shimmer";

const SearchResult = () => {
  return (
    <div>
      <Shimmer
        box={10}
        style="h-20 sm:h-40 md:h-56 lg:h-60 "
        hide="block h-1.9  lg:ml-3"
        grid="sm:grid-cols-1 gap-6 md:grid-cols-2 "
      />
    </div>
  );
};

export default SearchResult;
