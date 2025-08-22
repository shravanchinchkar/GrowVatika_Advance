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
  usePaymentMessageStore,
} from "@repo/shared-store";
import { UserProfilePopUp } from "./user-profile-popup";
import { SingleProductCard } from "./single-product-card";
import { PaymentGatewayMessage } from "./payment-gateway-message";

export const SingleProductPage = () => {
  const { isWishListVisible } = useWishListVisibilityStore();
  const { isPaymentMessageVisible } = usePaymentMessageStore();
  const { isAddToCartVisible } = useAddToCartVisibilityStore();
  const { isUserProfileVisible } = useUserProfileVisibilityStore();
  const { isMobileNavbarVisible } = useChangeMobileNavbarVisibility();

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between bg-[#FFF6F4] gap-[2rem] font-poppins ${(isAddToCartVisible || isWishListVisible || isUserProfileVisible || isMobileNavbarVisible || isPaymentMessageVisible) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <HeaderSection singleProduct={true} isExplore={false} />
      <PaymentGatewayMessage />
      {/* Search Input, Search & Sort Button */}
      <div className="mx-auto new-sm:w-[95%] md:w-[95%] xl:w-[87%] 2xl:w-[87%] flex flex-col gap-[2rem]">
        <SearchSort />
        <SingleProductCard />
      </div>
      <Footer />
    </div>
  );
};
