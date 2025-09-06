"use client";

import { Cart } from "./cart";
import { Footer } from "./footer-section";
import { LandingPot } from "./landing-pot";
import { AboutUsSection } from "./about-us";
import { HeroSection } from "./hero-section";
import { MobileNavBar } from "./mobile-navbar";
import { ContactForm } from "./get-started-from";
import { HeaderSection } from "./header-section";
import { ExploreSection } from "./explore-section";
import { FeatureSection } from "./feature-section";
import { UserProfilePopUp } from "./user-profile-popup";
import { TestmonialSection } from "./testimonial-section";
import { MobileGetStartedForm } from "./mobile-get-started-form";
import {
  useAddToCartVisibilityStore,
  useChangeMobileConnectFormVisibility,
  useChangeMobileNavbarVisibility,
  usePaymentMessageStore,
  useUserProfileVisibilityStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";
import { PaymentGatewayMessage } from "./payment-gateway-message";
import { WishList } from "./wishlist";
import Skeleton from "@repo/ui/loading";

export const LandingPage = () => {
  const { isWishListVisible } = useWishListVisibilityStore();
  const { isPaymentMessageVisible } = usePaymentMessageStore();
  const { isAddToCartVisible } = useAddToCartVisibilityStore();
  const { isUserProfileVisible } = useUserProfileVisibilityStore();
  const { isMobileNavbarVisible } = useChangeMobileNavbarVisibility();
  const { isMobileContactFormVisible } = useChangeMobileConnectFormVisibility();

  return (
    <div
      className={`relative flex flex-col bg-[#FFF6F4] ${(isWishListVisible || isAddToCartVisible || isUserProfileVisible || isMobileContactFormVisible || isMobileNavbarVisible || isPaymentMessageVisible) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <WishList />
      <MobileNavBar />
      <UserProfilePopUp />
      <MobileGetStartedForm />
      <HeaderSection isExplore={true} />
      <PaymentGatewayMessage />

      {/* <Skeleton/> */}

      <div>
        <HeroSection />
        <LandingPot />
      </div>

      {/* Main Section */}
      <main className="flex flex-col new-sm:gap-[1.5rem] md:gap-[3rem]">
        <ExploreSection />
        <AboutUsSection />
        <FeatureSection />
        <TestmonialSection />
        <ContactForm />
      </main>

      {/* Footer Section */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
