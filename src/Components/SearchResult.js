import React from "react";
import { CDN__URL } from "../Utils/constants";

const SearchResult = ({ results }) => {
  return (
    <div className="ml-4">
      {results?.map((item, index) => {
        return (
          <div key={index} className="flex gap-5 hover:bg-sky-50 items-center">
            <div>
              <img
                className="w-16 h-20  object-cover object-center  rounded-md py-2 "
                src={CDN__URL + item?.cloudinaryId}
                alt="res__logo"
              />
            </div>

            <div>
              <p className="text-sm text-black mb-1">{item?.text}</p>
              <p className="text-xs text-neutral-400">
                {item?.type?.charAt(0)?.toUpperCase() +
                  item?.type?.slice(1)?.toLowerCase()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
