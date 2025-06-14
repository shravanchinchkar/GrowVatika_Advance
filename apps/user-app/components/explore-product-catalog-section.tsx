"use client";

import Image from "next/image";
import { Header } from "./header-section";
import { Navbar } from "./nav-section";
import { UserAuthButton } from "./user-auth-button";
import { ProductFilterSection } from "./product-filter-section";

export const ExploreProductCatalogSection = () => {
  const filterTags = ["Indoor Plants", "Large (24–48”)", "2 star & up"];

  return (
    <div className="flex flex-col items-center bg-[#FFF6F4] gap-[2rem] min-h-screen font-[Poppins]">
      {/* Header & Nav */}
      <div className="flex flex-col gap-[1rem] pt-[2rem]">
        <Header />
        <div className="flex justify-between">
          <Navbar />
          <UserAuthButton />
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex items-start justify-between gap-4 w-[70rem]">
        <div className="flex gap-4">
          {/* Search Input */}
          <div className="flex items-center w-[50rem] h-[3.0625rem] rounded-full border border-[#56A430] bg-white px-4">
            <div className="relative w-[1.8rem] h-[1.8rem] flex-shrink-0 mr-3">
              <Image
                src="/assets/images/ExploreImages/searchBarSearchIcon.svg"
                alt="search icon"
                className="w-full h-full"
                fill
              />
            </div>
            <input
              type="text"
              placeholder="Find your Plants, Pots, Tools..."
              className="w-full bg-transparent text-[#CBD0D3] placeholder-[#CBD0D3] text-[1.22669rem] font-normal outline-none font-poppins"
            />
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 w-[10.1875rem] h-[3.0625rem] rounded-full bg-[#56A430] text-white text-[1.22669rem] font-poppins capitalize">
            <div className="relative w-[1.5rem] h-[1.5rem] flex-shrink-0">
              <Image
                src="/assets/images/ExploreImages/searchButtonSearchIcon.svg"
                alt="search icon"
                className="w-full h-full"
                fill
              />
            </div>
            Search
          </button>
        </div>

        {/* Sort Button */}
        <button className="flex items-center justify-center gap-2 w-[8.375rem] h-[3.0625rem] rounded-full border border-[#56A430] text-[#171717] text-[1.22669rem] font-poppins capitalize">
          <div className="relative w-[1.5rem] h-[1.5rem] flex-shrink-0">
            <Image
              src="/assets/images/ExploreImages/sortButtonIcon.svg"
              alt="sort icon"
              className="w-full h-full"
              fill
            />
          </div>
          Sort
        </button>
      </div>

      {/* Filter Section and Product Card */}
      <div className="flex w-[70rem] gap-6">
        {/* Sidebar */}
        <div className="w-[18.8125rem] flex-shrink-0 rounded-[1.25rem] bg-white p-6">
          <p className="text-lg font-semibold text-[#171717]">
            <ProductFilterSection/>
          </p>
        </div>

        {/* Main Section */}
        <div className="flex-1 bg-white rounded-[1.25rem] p-6">
          {/* Filter Tags */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-y-2">
            <div className="flex flex-wrap gap-2">
              {filterTags.map((tag, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center gap-2 h-[3.0625rem] px-5 rounded-full bg-[#EDE7E4]"
                >
                  <span className="text-[#171717] text-[1.1875rem] font-poppins font-normal text-center">
                    {tag}
                  </span>
                  <div className="w-[1.5rem] h-[1.5rem] relative">
                    <Image
                      src="/assets/images/ExploreImages/xIcon.svg"
                      alt="close"
                      fill
                    />
                  </div>
                </button>
              ))}
              <button className="text-[#697F75] text-[1.1875rem] font-poppins font-medium whitespace-nowrap ml-2">
                Clear all
              </button>
            </div>
          </div>

          {/* Product Card Grid */}
          <div className="grid grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="w-[18.87125rem] h-[28.83975rem] flex-shrink-0 rounded-[1.25rem] bg-white shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)] p-4 font-[Poppins]"
              >
                {/* Product Image */}
                <div className="relative w-[18.87125rem] h-[15.29763rem] rounded-[1rem] overflow-hidden mb-3 flex-shrink-0">
                  <Image
                    src="/assets/images/ExploreImages/product-image.png"
                    alt="plant"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 w-[5.32906rem] h-[1.88088rem] rounded-full bg-[#FFC400] flex items-center justify-center">
                    <span className="text-white text-[0.75rem] font-semibold capitalize">
                      Best Seller
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 w-[1.5rem] h-[1.5rem]">
                    <Image
                      src="/assets/images/ExploreImages/heartIcon.svg"
                      alt="heart"
                      fill
                    />
                  </div>
                </div>

                {/* Category and Rating */}
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[#697F75] text-[0.9375rem] font-medium leading-none">
                    Indoor Plant
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="relative w-[1.50469rem] h-[1.50469rem]">
                      <Image
                        src="/assets/images/ExploreImages/star.svg"
                        alt="rating"
                        fill
                      />
                    </div>
                    <span className="text-[#697F75] text-[0.9375rem] font-medium leading-none">
                      4.8 <span className="text-[#B0B0B0]">(81)</span>
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <p className="text-[#000] text-[1.5rem] font-semibold leading-[130%] mb-[0.25rem]">
                  Monstera Deliciosa
                </p>

                {/* Product Description */}
                <p className="text-[#697F75] text-[0.9375rem] font-medium leading-none mb-3">
                  Swiss Cheese Plant - 6” Pot
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-[#56A430] text-[1.5rem] font-semibold leading-[130%]">
                    ₹ 399
                  </p>
                  <p className="text-[#CBD0D3] text-[1.25rem] font-semibold leading-[130%] line-through">
                    ₹ 999
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button className="w-[17.24113rem] h-[3.19744rem] bg-[#56A430] rounded-[0.625rem] flex items-center justify-center gap-2">
                  <div className="relative w-[1.53806rem] h-[1.50469rem] flex-shrink-0">
                    <Image
                      src="/assets/images/ExploreImages/shopping-cart.svg"
                      alt="cart icon"
                      fill
                    />
                  </div>
                  <span className="text-white text-[1.22669rem] font-medium text-center">
                    Add to Cart
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
