"use client";

import Image from "next/image";
import { Header } from "./header-section";
import { Navbar } from "./nav-section";
import { UserAuthButton } from "./user-auth-button";
import { ProductFilterSection } from "./product-filter-section";

export const ExploreProductCatalogSection = () => {
  const filterTags = ["Indoor Plants", "Large (24–48”)", "2 star & up"];

  return (
    <div className="flex flex-col items-center bg-[#FFF6F4] gap-[2rem] min-h-screen font-[Poppins] pb-[2rem]">
      {/* Header & Nav */}
      <div className="flex flex-col gap-[1rem] pt-[2rem]">
        <Header />
        <div className="flex justify-between">
          <Navbar />
          <UserAuthButton />
        </div>
      </div>

      {/* Search Input, Search & Sort Button */}
      <div className="flex items-start justify-between gap-4 w-[82.1875rem]">
        {/* Search Input */}
        <div className="flex items-center w-[60rem] h-[3.0625rem] rounded-full border border-[#56A430] bg-white px-4">
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

        {/* Consist of Search and sort Button */}
        <div className="flex justify-between w-[20rem]">
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
      </div>

      {/* Filter Section and Product Card */}
      <div className="flex w-[82.1875rem] gap-6 font-[Poppins]">
        {/* Sidebar */}
        <div className="w-[18.8125rem] flex-shrink-0 rounded-[1.25rem] bg-white p-6">
          <p className="text-lg font-semibold text-[#171717]">
            <ProductFilterSection/>
          </p>
        </div>

        {/* Main Section */}
        <div className="w-[80%] flex flex-col gap-[1rem] rounded-[1.25rem] mb-[1rem]">

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center justify-start gap-[5rem]">

            {/* Following div consist of tag button */}
            <div className="flex flex-wrap gap-[1rem] ml-[1rem]">
              {filterTags.map((tag, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center gap-2 w-[12rem] h-[3.0625rem] px-[1rem] rounded-full bg-[#EDE7E4]"
                >
                  <span className="text-[#171717] text-[1rem] font-poppins font-normal text-center">
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
            </div>
            <button className="text-[#697F75] text-[1.1875rem] font-poppins font-medium whitespace-nowrap ml-2">
              Clear all
            </button>
          </div>

          <div className="w-max text-[2rem] text-[#000] ml-[1.5rem] font-semibold">
            248 Plants Available
          </div>

          {/* Product Card Grid */}
          <div className="grid grid-cols-3 gap-8">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="w-[18rem] h-[29rem] flex flex-col items-center flex-shrink-0 rounded-[1.25rem] bg-white shadow-[0px_0px_25px_-11px_rgba(0,0,0,0.25)] font-[Poppins] overflow-hidden justify-self-end"
              >
                {/* Product Image */}
                <div className="w-[100%] h-[50%] flex flex-shrink-0 bg-[url(/assets/images/ExploreImages/product-image.jpg)] bg-cover bg-[center_top_50%] bg-no-repeat">
                  {/* Following div consist of tag of the product */}
                  <div className="w-[50%] flex items-end">
                    <div className="w-[5.32906rem] h-[1.88088rem] rounded-full bg-[#FFC400] flex items-center justify-center ml-[0.5rem] mb-[0.5rem]">
                      <span className="text-white text-[0.75rem] font-semibold capitalize">
                        Best Seller
                      </span>
                    </div>
                  </div>

                  {/* Following div consist of heart icon */}
                  <div className="w-[50%] flex justify-end">
                    <button className="w-[1.875rem] h-[1.875rem] flex justify-center items-center rounded-full mt-[1rem] mr-[1rem] bg-[#fff]">
                      <div className="relative w-[1.5rem] h-[1.5rem]">
                        <Image
                          src="/assets/images/ExploreImages/heartIcon.svg"
                          alt="heart"
                          fill
                        />
                      </div>
                    </button>
                  </div>
                </div>

                <div className="h-[50%] flex flex-col justify-between px-[0.7rem] pt-[0.5rem] pb-[1rem]">
                  {/* Following div consist of category,Rating and product name Section */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      {/* Category */}
                      <p className="text-[#697F75] text-[0.9375rem] font-medium">
                        Indoor Plant
                      </p>

                      {/* Rating Section */}
                      <div className="flex justify-center items-center gap-[0.2rem]">
                        <div className="relative w-[1.50469rem] h-[1.50469rem]">
                          <Image
                            src="/assets/images/ExploreImages/star.svg"
                            alt="rating"
                            fill
                          />
                        </div>
                        <span className="text-[#697F75] text-[0.9375rem] font-medium flex items-center">
                          4.8 <span className="text-[#B0B0B0]">(81)</span>
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <p className="text-[#000] text-[1.4rem] font-semibold leading-[1.3rem]">
                      Monstera Deliciosa
                    </p>
                  </div>

                  {/* Product Description */}
                  <p className="text-[#697F75] text-[0.9375rem] leading-[1.5rem] font-medium ">
                    Swiss Cheese Plant - 6” Pot
                  </p>

                  {/* Price Section */}
                  <div className="flex items-center gap-2">
                    <p className="text-[#56A430] text-[1.4rem] font-semibold leading-[130%]">
                      ₹ 399
                    </p>
                    <p className="text-[#CBD0D3] text-[1.25rem] font-semibold leading-[130%] line-through">
                      ₹ 999
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-[16.5rem] h-[3.19744rem] bg-[#56A430] rounded-[0.625rem] flex items-center justify-center gap-2">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
