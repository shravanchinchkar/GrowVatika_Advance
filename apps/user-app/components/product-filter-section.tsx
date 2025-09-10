"use client";

import { memo } from "react";
import Image from "next/image";
import PriceRangeSlider from "./PriceRangeSlider";
import { useFilterProduct } from "@repo/shared-store";

interface ProductFilterSectionProps {
  setDisplayFilter: (value: boolean) => void;
}

export const ProductFilterSection = memo(
  ({ setDisplayFilter }: ProductFilterSectionProps) => {
    const FilterContent = {
      PlantType: ["Indoor Plants", "Outdoor Plants", "Flowering Plants"],
      Soil: ["Potting Mix", "Garden Soil", "Organic Compost"],
      PotTypes: ["Ceramic Pots", "Plastic Pots", "Hanging Pots"],
      Fertilizers: [
        "Organic Fertilizers",
        "Chemical Fertilizers",
        "Plant Food",
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
    const { filter, setFilter, toggleFilter, clearFilters } =
      useFilterProduct();

    return (
      <div className="new-sm:w-[70%] new-sm-1:w-[65%] new-sm-3:w-[50%] sm:w-[40%] new-sm:h-[70%] md:w-[100%] md:h-[100%] pl-[2rem] pr-[1rem] py-[1rem] font-poppins bg-white new-sm:rounded-r-[1.5625rem] new-sm:border-r-[1.6px] new-sm:border-t-[1.6px] new-sm:border-b-[1.6px]  new-sm:border-[#56A430] md:border-0 md:rounded-[1.25rem] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-[100%] [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#697F75] shadow-productcard-custom-boxShadow new-sm:animate-slide-in-left md:animate-none">
        {/* Cancle Icon displayed in mobile view */}
        <div className="w-[100%] new-sm:flex md:hidden justify-end h-max mb-[1rem]">
          <button
            className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem]"
            onClick={() => {
              setDisplayFilter(false);
            }}
          >
            <Image
              src={"/assets/images/CommonImages/cancelIcon.svg"}
              alt="cancle"
              fill
            />
          </button>
        </div>

        {/* Filter Top Section */}
        <div className="flex justify-between items-center">
          <div className="lg:text-[1.2rem] xl:text-[1.5rem] font-medium">
            Filter
          </div>
          <button
            className="new-sm:text-[1rem] xl:text-[1.1875rem] text-[#697F75] outline-none"
            onClick={() => clearFilters()}
          >
            Clear all
          </button>
        </div>

        {/* Plant Type Section */}
        <div className="new-sm:pt-[1.2rem] md:pt-[1.69rem] pb-[1.75rem] border-b">
          <ul>
            <li className="new-sm:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
              Plant Type
            </li>
            <div className="flex flex-col gap-[0.2rem] new-sm:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
              {FilterContent.PlantType.map((PlantType, index) => {
                const isChecked = filter.includes(PlantType);
                return (
                  <li key={index} className="flex items-center gap-[0.5rem]">
                    <input
                      type="checkbox"
                      className="new-sm:w-[1rem] new-sm:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
        <div className="new-sm:pt-[1.2rem] md:pt-[1.69rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
          <ul>
            <li className="new-sm:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
              Soil
            </li>
            <div className="flex flex-col gap-[0.2rem] new-sm:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
              {FilterContent.Soil.map((soil, index) => {
                const isChecked = filter.includes(soil);
                return (
                  <li key={index} className="flex items-center gap-[0.5rem]">
                    <input
                      type="checkbox"
                      className="new-sm:w-[1rem] new-sm:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
        <div className="new-sm:pt-[1.2rem] md:pt-[1.69rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
          <ul>
            <li className="new-sm:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
              Pot Types
            </li>
            <div className="flex flex-col gap-[0.2rem] new-sm:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
              {FilterContent.PotTypes.map((pot, index) => {
                const isChecked = filter.includes(pot);
                return (
                  <li key={index} className="flex items-center gap-[0.5rem]">
                    <input
                      type="checkbox"
                      className="new-sm:w-[1rem] new-sm:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
        <div className="new-sm:pt-[1.2rem] md:pt-[1.69rem] pb-[1.75rem] border-b-[0.0625rem] border-[#00000033]">
          <ul>
            <li className="new-sm:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
              Fertilizers
            </li>
            <div className="flex flex-col gap-[0.2rem] new-sm:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[0.75rem]">
              {FilterContent.Fertilizers.map((fertilizer, index) => {
                const isChecked = filter.includes(fertilizer);
                return (
                  <li key={index} className="flex items-center gap-[0.5rem]">
                    <input
                      type="checkbox"
                      className="new-sm:w-[1rem] new-sm:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
            <li className="new-sm:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
              Size
            </li>
            <div className="flex flex-col gap-[0.2rem] new-sm:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[1rem]">
              {FilterContent.Size.map((potSize, index) => {
                const isChecked = filter.includes(potSize);
                return (
                  <li key={index} className="flex items-center gap-[0.5rem]">
                    <input
                      type="checkbox"
                      className="new-sm:w-[1rem] new-sm:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
            <li className="new-sm:text-[1rem] lg:text-[1.2rem] xl:text-[1.25rem] text-[#171717] font-medium">
              Seller Rating
            </li>
            <div className="flex flex-col gap-[0.2rem] new-sm:text-[0.9rem] md:text-[0.7rem] lg:text-[1.1rem] xl:text-[1.22669rem] pt-[1rem]">
              {SellerRating.map((rating, index) => {
                const rate = Number(rating.slice(0, 1));
                const isChecked = filter.includes(rating);
                const remainingPoints = 5 - rate;
                return (
                  <li
                    key={index}
                    className="flex items-center new-sm:gap-[0.3rem] lg:gap-[0.5rem]"
                  >
                    <input
                      type="checkbox"
                      className="new-sm:w-[1rem] new-sm:h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] accent-[#000]"
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
                            className="new-sm:w-[1.2rem] new-sm:h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem]"
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
                                className="new-sm:w-[1.2rem] new-sm:h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem]"
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
        <div className="w-[95%] new-sm:h-[2.9rem] lg:h-[3.1875rem] bg-[#56A430] hover:bg-[#213E12] rounded-[0.625rem] flex justify-center items-center">
          <button
            type="button"
            className="new-sm:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.22669rem] text-white font-medium outline-none border-none"
            onClick={() => {
              setFilter(filter);
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  }
);
