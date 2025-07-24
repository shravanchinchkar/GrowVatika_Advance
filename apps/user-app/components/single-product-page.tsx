"use client"
import { SearchSort } from "./search-sort";
import { HeaderSection } from "./header-section";
import { SingleProductCard } from "./single-product-card";


export const SingleProductPage = () => {
  return (
    <div className="flex flex-col items-center bg-[#FFF6F4] gap-[2rem] min-h-screen font-[Poppins] pb-[2rem]">
      {/* Header & Nav */}
      {/* <HeaderSection singleProduct={true} /> */}
      {/* Search Input, Search & Sort Button */}
      {/* <SearchSort /> */}
      <SingleProductCard />
    </div>
  );
};
