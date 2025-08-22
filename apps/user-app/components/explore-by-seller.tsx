"use client";

import { Cart } from "./cart";
import { WishList } from "./wishlist";
import { Footer } from "./footer-section";
import { MobileNavBar } from "./mobile-navbar";
import { HeaderSection } from "./header-section";
import { LikeProductIcon } from "./like-product-icon";
import { UserProfilePopUp } from "./user-profile-popup";
import { ProductPageButton } from "./product-page-button";
import { ExploreBySellerGrid } from "./explore-by-seller-grid";
import {
  useAddToCartVisibilityStore,
  useChangeMobileNavbarVisibility,
  usePaymentMessageStore,
  useUserProfileVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { ProductSearchBar } from "./product-search-bar";
import { PaymentGatewayMessage } from "./payment-gateway-message";

export const ExplorePlantsBySeller = () => {
  // Following is the zustand State code
  const { isWishListVisible } = useWishListVisibilityStore();
  const { isAddToCartVisible } = useAddToCartVisibilityStore();
  const { isPaymentMessageVisible } = usePaymentMessageStore();
  const { isUserProfileVisible } = useUserProfileVisibilityStore();
  const { isMobileNavbarVisible } = useChangeMobileNavbarVisibility();

  const productPageButton = ["Most Popular", "Newly Added", "NearBy Seller"];

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between bg-[#FFF6F4] font-poppins ${(isAddToCartVisible || isWishListVisible || isUserProfileVisible || isMobileNavbarVisible || isPaymentMessageVisible) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <HeaderSection explorebyseller={true} isExplore={true} />
      <PaymentGatewayMessage />

      <div className="flex new-sm:w-[100%] md:w-[90%] md:mt-[3rem] flex-col new-sm:gap-[1rem] md:gap-[3rem] items-center mx-auto">
        {/* Heading of  Eplore by seller */}
        <h1 className="relative new-sm:w-[100%] md:w-[80%] uppercase text-center text-[#123524] new-sm:font-poppins md:font-unbounded  new-sm:text-[0.85rem] new-sm-1:text-[0.9375rem] new-sm-3:text-[1rem] sm:text-[1.2rem] md:text-[1.7rem] lg:text-[2rem] xl:text-[2.25rem] font-medium new-sm:flex justify-between md:block">
          <div className="new-sm:w-[90%] md:w-[100%] new-sm:flex flex-col items-center md:block new-sm:pl-[2rem] md:pl-0">
            <span className="new-sm:font-bold md:font-medium">
              Explore by Sellers –
            </span>{" "}
            <span>Discover Nurseries Near You!</span>
          </div>
          <div className="new-sm:block md:hidden">
            <LikeProductIcon />
          </div>
        </h1>

        {/* Button and Search Bar */}
        <div className="new-sm:w-[100%] sm:w-[75%] md:h-[3.5rem] lg:h-[3.7rem] flex new-sm:flex-col md:flex-row items-center new-sm:gap-[1rem] md:gap-0 ">
          {/* Buttons of the product pages */}
          <div className="new-sm:w-[95%] new-sm-1:w-[95%] md:w-[70%] h-[100%] flex new-sm:gap-[1rem] md:gap-[1.5rem] new-sm:justify-around sm:justify-between md:justify-end">
            {productPageButton.map((b, index) => {
              return (
                <div
                  className="new-sm:w-[6.96606rem] new-sm:h-[2.42138rem] sm:w-[8.9rem] sm:h-[2.8rem] md:w-[8rem] md:h-[100%] lg:w-[11rem] xl:w-[12.09619rem]"
                  key={index}
                >
                  <ProductPageButton
                    uniqueId={index.toString()}
                    buttonName={b}
                  />
                </div>
              );
            })}
          </div>

          {/* Search bar*/}
          <div className="w-[100%] md:w-[30%] md:h-[90%] lg:h-[100%] flex new-sm:justify-center md:justify-end">
            <ProductSearchBar
              placeholder="Find by city"
              parentClassName="new-sm:w-[95%] new-sm:h-[2.4375rem] md:w-[90%] md:h-[100%] 2xl:h-[100%]"
              searchInputClassName="w-[90%] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.22669rem] pl-[1rem]"
              searchButtonClassName="new-sm:w-[20%] md:w-[35%] lg:w-[25%]"
            />
          </div>
        </div>

        <ExploreBySellerGrid />
      </div>

      <Footer />
    </div>
  );
};
