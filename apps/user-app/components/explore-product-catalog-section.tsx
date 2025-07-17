"use client";

import axios from "axios";
import Link from "next/link";
import { Cart } from "./cart";
import Image from "next/image";
import { useState } from "react";
import { WishList } from "./wishlist";
import { Navbar } from "./nav-section";
import { Header } from "./header-section";
import { Footer } from "./footer-section";
import { ShoppingCartIcon } from "./cart-icon";
import { UserProfileIcon } from "./user-profile-icon";
import { LikeProductIcon } from "./like-product-icon";
import { CustomSelectTag } from "./custom-select-tag";
import { ProductCatalogGrid } from "./product-catalog-grid";
import { ProductFilterSection } from "./product-filter-section";
import { useAddToCartVisibilityStore, useWishListVisibilityStore } from "@repo/shared-store";

export const ExploreProductCatalogSection = () => {
  const [displaySortDropDown, setDisplaySortDropDown] = useState(false);
  const filterTags = ["Indoor Plants", "Large (24–48”)", "2 star & up"];

  const handleSortProduct = () => {
    setDisplaySortDropDown(!displaySortDropDown);
  };
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );

  const wishListVisibility = useWishListVisibilityStore(
    (state: any) => state.wishListDropDownVisibility
  );

  return (
    <div className={`relative flex flex-col items-center bg-[#FFF6F4] font-[Poppins] ${addToCartVisibility || wishListVisibility ?"h-[100vh] overflow-hidden":"min-h-screen"}`}>
      <Cart />
      <WishList />
      <div className="flex flex-col gap-[2rem]">
        {/* Header,Navbar, and all other buttons */}
        <div className="z-20 2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex flex-col items-center gap-[1rem] pt-[2rem]">
          <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex justify-between z-0">
            <Header />
            <div className="w-[18rem] flex justify-between items-center">
              <UserProfileIcon />
              <LikeProductIcon />
              <ShoppingCartIcon />
            </div>
          </div>

          <div className="w-[100%] flex justify-between z-10">
            <Navbar />
            <div className="h-[4.05rem] w-[22.5rem] flex justify-between">
              <CustomSelectTag
                width={"10.5"}
                activeValue="Plants"
                values={["Plant", "Soil", "Pots", "Fertilizers"]}
                explore={true}
              />
              <CustomSelectTag
                width={"10.5"}
                activeValue="Explore"
                values={["Explore", "Explore by seller"]}
                explore={true}
              />
            </div>
          </div>
        </div>

        {/* Search Input, Search button & Sort Button */}
        <div className="z-10 flex items-start justify-between gap-4 w-[82.1875rem]">
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

            <div className="relative w-[8.375rem] h-[3.0625rem]">
              {/* Sort Button */}
              <button
                className="absolute top-0 flex items-center justify-center gap-2 w-[100%] h-[3.0625rem] rounded-full border-[1.6px] bg-[#fff] border-[#56A430] text-[#171717] text-[1.22669rem] font-poppins capitalize"
                onClick={handleSortProduct}
              >
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

              {displaySortDropDown && (
                <ul className="z-10 w-[100%] h-[13.9375rem] mt-[1.5rem] pt-[2rem] border-x-[1.6px] border-b-[1.6px] rounded-bl-[2.1875rem] rounded-br-[2.1875rem] border-[#56A430] bg-[#fff] flex flex-col gap-[0.2rem] overflow-hidden">
                  <li className="cursor-pointer pl-[1.5rem] hover:bg-[#FFF6F4]">
                    Features
                  </li>
                  <li className="cursor-pointer pl-[1.5rem] hover:bg-[#FFF6F4]">
                    Price:<span>Low to high</span>
                  </li>
                  <li className="cursor-pointer pl-[1.5rem] hover:bg-[#FFF6F4]">
                    Price:<span>High to Low</span>
                  </li>
                  <li className="cursor-pointer pl-[1.5rem] hover:bg-[#FFF6F4]">
                    Newest
                  </li>
                  <li className="cursor-pointer pl-[1.5rem] hover:bg-[#FFF6F4]">
                    Rating
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Filter Section and Product Card */}
        <div className="z-0 flex justify-between w-[82.1875rem] font-[Poppins]">
          {/* Sidebar */}
          <ProductFilterSection />

          <div className="w-[75%]">
            {/* Filter Tags and Clear all button*/}
            <div className="flex flex-wrap items-center justify-start gap-[5rem] mb-[1rem]">
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

            {/* Main Section */}
            <ProductCatalogGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
