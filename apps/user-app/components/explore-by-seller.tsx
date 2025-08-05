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
      className={`min-h-screen relative flex flex-col  bg-[#FFF6F4] font-[Poppins] ${(addToCartVisibility || wishListVisibility || MobileNavbarVisibility || userProfileVisibility) && "h-[100vh] overflow-hidden"}`}
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

      <div className="new-sm:hidden md:flex new-sm:w-[100%] md:w-[90%] mt-[3rem] flex-col gap-[3rem] items-center mx-auto">
        {/* Heading of  Eplore by seller */}
        <h1 className="w-[80%] uppercase text-center text-[#123524] font-[Unbounded] md:text-[1.7rem] lg:text-[2rem] xl:text-[2.25rem]">
          Explore by Sellers – Discover Nurseries Near You!
        </h1>

        {/* Button and Search Bar */}
        <div className="w-[100%] md:h-[3.5rem] lg:h-[3.7rem] flex items-center">
          {/* Buttons of the product pages */}
          <div className="w-[70%] h-[100%] flex gap-[1.5rem] justify-end">
            {productPageButton.map((b, index) => {
              return (
                <div className="md:w-[8rem] lg:w-[11rem] xl:w-[12.09619rem] h-[100%]" key={index}>
                  <ProductPageButton
                    uniqueId={index.toString()}
                    buttonName={b}
                  />
                </div>
              );
            })}
          </div>
          {/* Search bar*/}
          <div className="w-[30%] md:h-[90%] lg:h-[100%] flex justify-end">
            <ProductSearchBar
              placeholder="Find by city"
              parentClassName="w-[90%] md:h-[100%] 2xl:h-[100%]"
              searchInputClassName="w-[90%] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.22669rem] pl-[1rem]"
              searchButtonClassName="md:w-[35%] lg:w-[25%]"
            />
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
