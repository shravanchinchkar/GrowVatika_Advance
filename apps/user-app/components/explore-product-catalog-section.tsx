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
  useWishListVisibilityStore,
} from "@repo/shared-store";

export const ExploreProductCatalogSection = () => {
  const filterTags = ["Indoor Plants", "Large (24–48”)", "2 star & up"];

  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const wishListVisibility = useWishListVisibilityStore(
    (state: any) => state.wishListDropDownVisibility
  );
  const MobileNavbarVisibility = useChangeMobileNavbarVisibility(
    (state: any) => state.displayMobileNavbar
  );

  return (
    <div
      className={`min-h-screen relative flex flex-col items-center bg-[#FFF6F4] font-[Poppins]  ${(addToCartVisibility || wishListVisibility || MobileNavbarVisibility) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <HeaderSection explore={true} />

      {/* Following is the temporary message shown till the mobile view is readey */}
      <div className="new-sm:flex md:hidden w-[100%] h-[20rem] justify-center items-center">
        <p className="w-[90%] text-center">
          🚧Mobile View Under Construction🚧, Please view throught Laptop or
          desktop for better experience
        </p>
      </div>

      <div className="new-sm:hidden md:flex flex-col items-center gap-[2rem] mt-[1.5rem]">
        <SearchSort/>

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

      <div className="new-sm:hidden md:block">
        <Footer />
      </div>
    </div>
  );
};
