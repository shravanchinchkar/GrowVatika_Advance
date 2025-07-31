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
  useUserProfileVisibilityStore,
} from "@repo/shared-store";


export const LandingPage = () => {
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const MCFormVisibility = useChangeMobileConnectFormVisibility(
    (state: any) => state.displayMCForm
  );
  const MobileNavbarVisibility = useChangeMobileNavbarVisibility(
    (state: any) => state.displayMobileNavbar
  );
  const userProfileVisibility = useUserProfileVisibilityStore(
    (state: any) => state.userProfileVisibility
  );

  return (
    <div
      className={`relative flex flex-col bg-[#FFF6F4] ${(addToCartVisibility || MCFormVisibility || MobileNavbarVisibility || userProfileVisibility) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <MobileNavBar />
      <UserProfilePopUp />
      <MobileGetStartedForm />
      <HeaderSection />


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
