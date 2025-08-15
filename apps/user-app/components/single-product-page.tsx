"use client";
import { Cart } from "./cart";
import { WishList } from "./wishlist";
import { Footer } from "./footer-section";
import { SearchSort } from "./search-sort";
import { MobileNavBar } from "./mobile-navbar";
import { HeaderSection } from "./header-section";
import {
  useAddToCartVisibilityStore,
  useWishListVisibilityStore,
  useChangeMobileNavbarVisibility,
  useUserProfileVisibilityStore,
} from "@repo/shared-store";
import { UserProfilePopUp } from "./user-profile-popup";
import { SingleProductCard } from "./single-product-card";

export const SingleProductPage = () => {
  const { isAddToCartVisible } = useAddToCartVisibilityStore();
  const { isWishListVisible } = useWishListVisibilityStore();
  const { isUserProfileVisible } = useUserProfileVisibilityStore();
  const { isMobileNavbarVisible } = useChangeMobileNavbarVisibility();
  

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between bg-[#FFF6F4] gap-[2rem] font-[Poppins] ${(isAddToCartVisible || isWishListVisible || isUserProfileVisible || isMobileNavbarVisible) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <HeaderSection singleProduct={true} isExplore={false} />
      {/* Search Input, Search & Sort Button */}
      <div className="mx-auto new-sm:w-[95%] md:w-[95%] xl:w-[87%] 2xl:w-[87%] flex flex-col gap-[2rem]">
        <SearchSort />
        <SingleProductCard />
      </div>
      <Footer />
    </div>
  );
};
