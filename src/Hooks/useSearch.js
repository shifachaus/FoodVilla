import { useState, useEffect } from "react";
import { SEARCH__API } from "../Utils/constants";

const useSearch = () => {
  const [showShimmer, setShowShimmer] = useState(true);
  const [inputSearch, setInputSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      const data = await fetch(SEARCH__API + inputSearch);
      const json = await data.json();

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

  return { showShimmer, inputSearch, setInputSearch, results };
};

export default useSearch;
