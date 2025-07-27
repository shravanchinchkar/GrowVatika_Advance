"use client";

import { memo, useEffect, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { useFilterProduct } from "@repo/shared-store";

export const ProductFilterSection = memo(() => {
  const FilterContent = {
    PlantType: [
      "Indoor Plants",
      "Outdoor Plants",
      "Flowering Plants",
      "Tropical Plants",
    ],
    Size: [
      'Small (under 12")',
      'Medium (12-24")',
      'Large (24-48")',
      'X-Large (over 48")',
    ],
  };
  const SellerRating = ["4 Star", "3 Star", "2 Star"];

  // Following are the zustand state
  const filter = useFilterProduct((state: any) => state.filter);
  const setFilter = useFilterProduct((state: any) => state.setFilter);
  const clearFilters = useFilterProduct((state: any) => state.clearFilters);
  const toggleFilter = useFilterProduct((state: any) => state.toggleFilter);

  return (
    <div className="w-[23%] h-[77.125rem] pl-[2rem] pr-[2rem] pt-[1rem] font-[Poppins] bg-white rounded-[1.25rem]">
      {/* Filter Top Section */}
      <div className="flex justify-between items-center">
        <div className="text-[1.5rem] font-medium">Filter</div>
        <button
          className="text-[1.1875rem] text-[#697F75]"
          onClick={() => clearFilters(filter)}
        >
          Clear all
        </button>
      </div>

      {/* Plant Type Section */}
      <div className="pt-[1.69rem] pb-[1.75rem] border-b">
        <ul className="">
          <li className="text-[1.25rem] text-[#171717] font-medium">
            Plant Type
          </li>
          <div className="flex flex-col gap-[0.2rem] text-[1.22669rem] pt-[0.75rem]">
            {FilterContent.PlantType.map((PlantType, index) => {
              const isChecked = filter.includes(PlantType);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="h-[1.25rem] w-[1.25rem] accent-[#000]"
                    checked={isChecked}
                    onChange={() => {
                      toggleFilter(PlantType);
                    }}
                  />
                  <p>{PlantType}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Price Range Section */}
      <div className="pt-[1.75rem] pb-[1rem] border-b">
        <PriceRangeSlider />
      </div>

      {/* Size Section */}
      <div className="pt-[1.75rem] pb-[1.75rem] border-b">
        <ul>
          <li className="text-[1.25rem] text-[#171717] font-medium">Size</li>
          <div className="flex flex-col gap-[0.2rem] text-[1.22669rem] pt-[1rem]">
            {FilterContent.Size.map((potSize, index) => {
              const isChecked = filter.includes(potSize);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="h-[1.25rem] w-[1.25rem] accent-[#000]"
                    checked={isChecked}
                    onChange={() => {
                      toggleFilter(potSize);
                    }}
                  />
                  <p>{potSize}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Seller Rating Section */}
      <div className="pt-[1.75rem] pb-[1.75rem] border-b">
        <ul>
          <li className="text-[1.25rem] text-[#171717] font-medium">
            Seller Rating
          </li>
          <div className="flex flex-col gap-[0.2rem] text-[1.22669rem] pt-[1rem]">
            {SellerRating.map((rating, index) => {
              const rate = Number(rating.slice(0, 1));
              const isChecked = filter.includes(rating);
              const remainingPoints = 5 - rate;
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="h-[1.25rem] w-[1.25rem] accent-[#000]"
                    checked={isChecked}
                    onChange={() => {
                      toggleFilter(rating);
                    }}
                  />
                  <div className="flex items-center gap-0">
                    {[...Array(rate)].map((_, index) => {
                      return (
                        <img
                          key={index}
                          src="/assets/images/ProductPageImages/yellowStarIcon.svg"
                          alt="yellowStarIcon"
                          className="h-[1.5rem] w-[1.5rem]"
                        />
                      );
                    })}
                    {remainingPoints === 0
                      ? ""
                      : [...Array(remainingPoints)].map((_, index) => {
                          return (
                            <img
                              key={index}
                              src="/assets/images/ProductPageImages/grayStarIcon.svg"
                              alt="grayStarIcon"
                              className="h-[1.5rem] w-[1.5rem]"
                            />
                          );
                        })}
                  </div>
                  <p>{`${rating}`}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Apply Filter Section */}
      <div className="h-[3.1875rem] w-[14.625rem] bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] flex justify-center items-center">
        <button
          type="button"
          className="text-[1.22669rem] text-white font-medium outline-none border-none"
          onClick={() => {
            setFilter(filter);
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
});
