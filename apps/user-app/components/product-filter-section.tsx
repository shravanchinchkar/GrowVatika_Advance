"use client";

import { memo } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { useFilterProduct } from "@repo/shared-store";

export const ProductFilterSection = memo(() => {
  const FilterContent = {
    PlantType: ["Indoor Plants", "Outdoor Plants", "Flowering Plants"],
    Soil: ["Potting Mix", "Garden Soil", "Organic Compost"],
    PotTypes: ["Ceramic Pots", "Plastic Pots", "Hanging Pots"],
    Fertilizers: ["Organic Fertilizers", "Chemical Fertilizers", "Plant Food"],
    Size: [
      'Small (under 12")',
      'Medium (12-24")',
      'Large (24-48")',
      'X-Large (over 48")',
    ],
  };
  const SellerRating = ["4 Star", "3 Star", "2 Star"];

  // Following are the zustand state
  const {filter,setFilter,toggleFilter,clearFilters}=useFilterProduct();


  // h-[77.125rem]
  return (
    <div className="md:w-[28%] xl:w-[23%] lg:h-[103rem] xl:h-[72rem] pl-[2rem] pr-[1rem] py-[1rem] font-[Poppins] bg-white md:rounded-[1.25rem] xl:rounded-l-[1.25rem] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-[100%] [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#697F75] shadow-productcard-custom-boxShadow">
      {/* Filter Top Section */}
      <div className="flex justify-between items-center">
        <div className="lg:text-[1.2rem] xl:text-[1.5rem] font-medium">Filter</div>
        <button
          className="lg:text-[1rem] xl:text-[1.1875rem] text-[#697F75] outline-none"
          onClick={() => clearFilters()}
        >
          Clear all
        </button>
      </div>

      {/* Plant Type Section */}
      <div className="pt-[1.69rem] pb-[1.75rem] border-b">
        <ul className="">
          <li className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
            Plant Type
          </li>
          <div className="flex flex-col gap-[0.2rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
            {FilterContent.PlantType.map((PlantType, index) => {
              const isChecked = filter.includes(PlantType);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="md:w-[1rem] md:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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

      {/* Soil Section */}
      <div className="pt-[1.69rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
        <ul className="">
          <li className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">Soil</li>
          <div className="flex flex-col gap-[0.2rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
            {FilterContent.Soil.map((soil, index) => {
              const isChecked = filter.includes(soil);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="md:w-[1rem] md:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
                    checked={isChecked}
                    onChange={() => {
                      toggleFilter(soil);
                    }}
                  />
                  <p>{soil}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Pots Section */}
      <div className="pt-[1.69rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
        <ul className="">
          <li className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
            Pot Types
          </li>
          <div className="flex flex-col gap-[0.2rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
            {FilterContent.PotTypes.map((pot, index) => {
              const isChecked = filter.includes(pot);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="md:w-[1rem] md:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
                    checked={isChecked}
                    onChange={() => {
                      toggleFilter(pot);
                    }}
                  />
                  <p>{pot}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Fertilizers */}
      <div className="pt-[1.69rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
        <ul className="">
          <li className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
            Fertilizers
          </li>
          <div className="flex flex-col gap-[0.2rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
            {FilterContent.Fertilizers.map((fertilizer, index) => {
              const isChecked = filter.includes(fertilizer);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="md:w-[1rem] md:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
                    checked={isChecked}
                    onChange={() => {
                      toggleFilter(fertilizer);
                    }}
                  />
                  <p>{fertilizer}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Price Range Section */}
      <div className="pt-[1.75rem] pb-[1rem] border-b-[0.0625rem] border-[#00000033]">
        <PriceRangeSlider />
      </div>

      {/* Size Section */}
      <div className="pt-[1.75rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
        <ul>
          <li className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">Size</li>
          <div className="flex flex-col gap-[0.2rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[1rem]">
            {FilterContent.Size.map((potSize, index) => {
              const isChecked = filter.includes(potSize);
              return (
                <li key={index} className="flex items-center gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="md:w-[1rem] md:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
      <div className="pt-[1.75rem] pb-[1.75rem]">
        <ul>
          <li className="md:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
            Seller Rating
          </li>
          <div className="flex flex-col gap-[0.2rem] md:text-[0.7rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[1rem]">
            {SellerRating.map((rating, index) => {
              const rate = Number(rating.slice(0, 1));
              const isChecked = filter.includes(rating);
              const remainingPoints = 5 - rate;
              return (
                <li key={index} className="flex items-center md:gap-[0.3rem] lg:gap-[0.5rem]">
                  <input
                    type="checkbox"
                    className="md:w-[1rem] md:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
                          className="md:w-[1.2rem] md:h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem]"
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
                              className="md:w-[1.2rem] md:h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem]"
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
      <div className="w-[95%] md:h-[2.9rem] lg:h-[3.1875rem] bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] flex justify-center items-center">
        <button
          type="button"
          className="md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] text-white font-medium outline-none border-none"
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
