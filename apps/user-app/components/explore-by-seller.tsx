"use client";

import { Cart } from "./cart";
import { WishList } from "./wishlist";
import { Footer } from "./footer-section";
import { MobileNavBar } from "./mobile-navbar";
import { HeaderSection } from "./header-section";
import { UserProfilePopUp } from "./user-profile-popup";
import { ProductPageButton } from "./product-page-button";
import { ExploreBySellerGrid } from "./explore-by-seller-grid";
import {
  useAddToCartVisibilityStore,
  useChangeMobileNavbarVisibility,
  useUserProfileVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";

export const ExplorePlantsBySeller = () => {
  const productPageButton = ["Most Popular", "Newly Added", "NearBy Seller"];
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const wishListVisibility = useWishListVisibilityStore(
    (state: any) => state.wishListDropDownVisibility
  );
  const MobileNavbarVisibility = useChangeMobileNavbarVisibility(
    (state: any) => state.displayMobileNavbar
  );
  const userProfileVisibility = useUserProfileVisibilityStore(
    (state: any) => state.userProfileVisibility
  );

  return (
    <div
      className={`min-h-screen relative flex flex-col items-center bg-[#FFF6F4] font-[Poppins] ${(addToCartVisibility || wishListVisibility || MobileNavbarVisibility || userProfileVisibility) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <HeaderSection explorebyseller={true} isLanding={true} />

      {/* Following is the temporary message shown till the mobile view is readey */}
      <div className="new-sm:flex md:hidden w-[100%] h-[20rem]  justify-center items-center">
        <p className="w-[90%] text-center">
          🚧Mobile View Under Construction🚧, Please view throught Laptop or
          desktop for better experience
        </p>
      </div>

      <div className="new-sm:hidden md:flex lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] h-max mt-[3rem] flex-col gap-[3rem] items-center">
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

      <div className="new-sm:hidden md:block">
        <Footer />
      </div>
    </div>
  );
};
