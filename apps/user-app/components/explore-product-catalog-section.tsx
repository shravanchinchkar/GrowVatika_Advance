"use client";
import { Cart } from "./cart";
import Image from "next/image";
import { WishList } from "./wishlist";
import { Footer } from "./footer-section";
import { SearchSort } from "./search-sort";
import { MobileNavBar } from "./mobile-navbar";
import { HeaderSection } from "./header-section";
import { ProductCatalogGrid } from "./product-catalog-grid";
import { ProductFilterSection } from "./product-filter-section";
import {
  useAddToCartVisibilityStore,
  useChangeMobileNavbarVisibility,
  useFilterProduct,
  useUserProfileVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { UserProfilePopUp } from "./user-profile-popup";

export const ExploreProductCatalogSection = () => {
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

  const { filter, removeFilter, clearFilters } = useFilterProduct();

  return (
    <div
      className={` relative flex flex-col bg-[#FFF6F4] font-[Poppins] ${(addToCartVisibility || wishListVisibility || MobileNavbarVisibility || userProfileVisibility) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <HeaderSection explore={true} isLanding={false} />

      {/* Following is the temporary message shown till the mobile view is readey */}
      <div className="new-sm:flex md:hidden w-[100%] h-[20rem] justify-center items-center">
        <p className="w-[90%] text-center">
          🚧Mobile View Under Construction🚧, Please view throught Laptop or
          desktop for better experience
        </p>
      </div>

      <div className="new-sm:hidden md:flex new-sm:w-[100%] md:w-[95%] 2xl:w-[87%] flex-col items-center gap-[2rem] mt-[1.5rem] mx-auto">
        <SearchSort />

        {/* Filter Section and Product Card */}
        <div className="w-[100%] z-0 flex justify-between font-[Poppins]">
          {/* Sidebar */}
          <ProductFilterSection />

          <div className="md:w-[70%] xl:w-[75%]">
            {/* Filter Tags and Clear all button*/}
            {filter.length > 0 && (
              <div className="max-w-max min-w-[80%] flex flex-wrap items-center justify-between mb-[1rem]">
                {/* Following div consist of tag button */}
                <div className="w-[85%] flex flex-wrap gap-[1rem] ml-[1rem]">
                  {filter.map((tag: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2 min-w-[12rem] max-w-max h-[3.0625rem] px-[1rem] rounded-full bg-[#EDE7E4]"
                      >
                        <span className="text-[#171717] text-[1rem] font-poppins font-normal text-center">
                          {tag}
                        </span>
                        <button
                          className="w-[1.5rem] h-[1.5rem] relative"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFilter(tag);
                          }}
                        >
                          <Image
                            src="/assets/images/ExploreImages/xIcon.svg"
                            alt="close"
                            fill
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="text-[#697F75] text-[1.1875rem] font-poppins font-medium whitespace-nowrap ml-2"
                  onClick={() => {
                    clearFilters();
                  }}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Main Section */}
            <ProductCatalogGrid />
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
