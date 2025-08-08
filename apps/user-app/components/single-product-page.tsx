"use client";
import { Cart } from "./cart";
import { WishList } from "./wishlist";
import { SearchSort } from "./search-sort";
import { HeaderSection } from "./header-section";
import { MobileNavBar } from "./mobile-navbar";
import {
  useAddToCartVisibilityStore,
  useWishListVisibilityStore,
  useChangeMobileNavbarVisibility,
} from "@repo/shared-store";
import { SingleProductCard } from "./single-product-card";

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
      <HeaderSection singleProduct={true} isExplore={false}/>
      {/* Search Input, Search & Sort Button */}
      <div className="md:w-[90%] xl:w-[87%] 2xl:w-[87%] flex flex-col gap-[2rem]">
        <SearchSort />
        <SingleProductCard/>
      </div>
    </div>
  );
};
