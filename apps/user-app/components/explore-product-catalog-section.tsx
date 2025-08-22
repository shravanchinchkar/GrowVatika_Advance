"use client";
import { Cart } from "./cart";
import Image from "next/image";
import { useState } from "react";
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
  usePaymentMessageStore,
  useUserProfileVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { UserProfilePopUp } from "./user-profile-popup";
import { PaymentGatewayMessage } from "./payment-gateway-message";

export const ExploreProductCatalogSection = () => {
  const { isWishListVisible } = useWishListVisibilityStore();
  const { isAddToCartVisible } = useAddToCartVisibilityStore();
  const { isPaymentMessageVisible } = usePaymentMessageStore();
  const { isUserProfileVisible } = useUserProfileVisibilityStore();
  const { isMobileNavbarVisible } = useChangeMobileNavbarVisibility();

  const { filter, removeFilter, clearFilters } = useFilterProduct();
  const [displayFilter, setDisplayFilter] = useState(false);

  return (
    <div
      className={`relative flex flex-col min-h-screen max-h-max justify-between bg-[#FFF6F4] font-poppins ${(isAddToCartVisible || isWishListVisible || isUserProfileVisible || isMobileNavbarVisible || displayFilter || isPaymentMessageVisible) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <HeaderSection explore={true} isExplore={false} />
      <PaymentGatewayMessage />

      {/* Following filter gets displayed in mobile view */}
      {displayFilter && (
        <div className="new-sm:flex md:hidden absolute z-50 items-center top-0 w-screen h-screen bg-[#00000040]">
          <ProductFilterSection setDisplayFilter={setDisplayFilter} />
        </div>
      )}
      <div className="relative flex new-sm:w-[100%] md:w-[95%] lg:w-[86.5%] 2xl:w-[87%] flex-col items-center gap-[2rem] new-sm:mt-0 md:mt-[1.5rem] mx-auto">
        <SearchSort />

        {/* Filter Section, filter tags and Product Card Grid */}
        <div className="w-[100%] z-0 flex justify-between font-poppins">
          {/* Filter Section*/}
          <div className="new-sm:hidden md:block md:w-[28%] new-xl:w-[23%] md:h-[90rem] new-md:h-[100rem] lg:h-[100rem] new-xl:h-[72rem]">
            <ProductFilterSection setDisplayFilter={setDisplayFilter} />
          </div>

          <div className="new-sm:w-[100%] md:w-[70%] xl:w-[68%] new-xl:w-[75%]">
            {/* Filter Tags and Clear all button*/}
            {filter.length > 0 && (
              <div className="new-sm:hidden md:flex max-w-max min-w-[80%] flex-wrap items-center justify-between mb-[1rem]">
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
            <ProductCatalogGrid
              displayFilter={displayFilter}
              setDisplayFilter={setDisplayFilter}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
