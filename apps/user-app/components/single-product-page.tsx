"use client";
import { SearchSort } from "./search-sort";
import { HeaderSection } from "./header-section";
import { SingleProductCard } from "./single-product-card";
import { Cart } from "./cart";
import { MobileNavBar } from "./mobile-navbar";
import { WishList } from "./wishlist";
import {
  useAddToCartVisibilityStore,
  useWishListVisibilityStore,
  useChangeMobileNavbarVisibility,
} from "@repo/shared-store";

export const SingleProductPage = () => {
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
      className={`min-h-screen relative flex flex-col items-center bg-[#FFF6F4] gap-[2rem] font-[Poppins] pb-[2rem] ${(addToCartVisibility || wishListVisibility || MobileNavbarVisibility) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <HeaderSection singleProduct={true} isLanding={false} />
      {/* Search Input, Search & Sort Button */}
      <div className="w-[87%] flex flex-col gap-[1rem]">
        <SearchSort />
        <SingleProductCard />
      </div>
    </div>
  );
};
