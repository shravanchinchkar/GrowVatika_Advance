"use client";

import Image from "next/image";
import { useState, memo } from "react";
import { SelectTagUser } from "./select-tag-user";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";

export const SearchSort = memo(() => {
  const [displaySortDropDown, setDisplaySortDropDown] = useState(false);
  const handleSortProduct = () => {
    setDisplaySortDropDown(!displaySortDropDown);
  };

  {
    /* Search Input, Search button & Sort Button */
  }
  return (
    <div className="w-[100%] h-[3.0625rem] z-10 flex justify-between items-center">
      <ProductSearchBar
        placeholder="Find your Plants, Pots, Tools..."
        parentClassName="w-[72%] h-[100%]"
        searchInputClassName="w-[100%] pl-[1.5rem] md:text-[0.89rem] lg:text-[1.22669rem]"
        searchButtonClassName="w-[10%]"
      />
      <SelectTagUser
        activeValue="Sort"
        custom_Id="SortProduct"
        isCategory={false}
        className="w-[7.5rem] lg:w-[8.375rem] h-[100%]"
        values={[
          "Featured",
          "Price:Low to high",
          "Price:High to Low",
          "Newest",
          "Rating",
        ]}
        isSort={true}
      />
    </div>
  );
});
