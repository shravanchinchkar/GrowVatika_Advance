"use client";

import { Cart } from "./cart";
import { Navbar } from "./nav-section";
import { Footer } from "./footer-section";
import { Header } from "./header-section";
import { ShoppingCartIcon } from "./cart-icon";
import { CustomSelectTag } from "./custom-select-tag";
import { LikeProductIcon } from "./like-product-icon";
import { UserProfileIcon } from "./user-profile-icon";
import { ProductPageButton } from "./product-page-button";
import { ExploreBySellerGrid } from "./explore-by-seller-grid";
import {
  useAddToCartVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";
import { WishList } from "./wishlist";

export const ExplorePlantsBySeller = () => {
  const productPageButton = ["Most Popular", "Newly Added", "NearBy Seller"];
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const wishListVisibility = useWishListVisibilityStore(
    (state: any) => state.wishListDropDownVisibility
  );

  return (
    <div
      className={`flex flex-col items-center bg-[#FFF6F4] font-[Poppins] ${addToCartVisibility || wishListVisibility ? "h-[100vh] overflow-hidden" : "h-max"}`}
    >
      <Cart />
      <WishList />
      {/* Heder and Navbar */}
      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex flex-col items-center gap-[1rem] pt-[2rem]">
        <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex justify-between">
          <Header />
          <div className="w-[18rem] flex justify-between items-center">
            <UserProfileIcon />
            <LikeProductIcon />
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="w-[100%] flex justify-between">
          <Navbar />
          <div className="h-[4.05rem] w-[22.5rem] flex justify-between">
            <CustomSelectTag
              activeValue="Explore by seller"
              values={["Explore", "Explore by seller"]}
              explore={false}
            />
          </div>
        </div>
      </div>

      <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max mt-[3rem] flex flex-col gap-[3rem] items-center">
        {/* Heading of  Eplore by seller */}
        <h1 className="w-[67.8125rem] uppercase text-center text-[#123524] font-[Unbounded] text-[2.25rem]">
          Explore by Sellers – Discover Nurseries Near You!
        </h1>

        {/* Button and Search Bar */}
        <div className="w-[100%] flex items-center">
          {/* Buttons of the product pages */}
          <div className="w-[70%] flex gap-[1.5rem] justify-end">
            {productPageButton.map((b, index) => {
              return (
                <div className="w-[12.09619rem] h-[4.0625rem]" key={index}>
                  <ProductPageButton
                    uniqueId={index.toString()}
                    buttonName={b}
                  />
                </div>
              );
            })}
          </div>
          {/* Search bar*/}
          <div className="w-[30%] flex justify-end">
            <div className="w-[12.9375rem] h-[4.0625rem] shrink-0">
              <ProductSearchBar
                UseType={SearchBarWorkType.CITYSEARCH}
                placeholder="Find by city"
              />
            </div>
          </div>
        </div>

        <ExploreBySellerGrid />
      </div>

      <div className="w-[100%]">
        <Footer />
      </div>
    </div>
  );
};
