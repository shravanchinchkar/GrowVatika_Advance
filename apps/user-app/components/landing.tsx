"use client";

import { Cart } from "./cart";
import { Footer } from "./footer-section";
import { LandingPot } from "./landing-pot";
import { AboutUsSection } from "./about-us";
import { HeroSection } from "./hero-section";
import { ContactForm } from "./get-started-from";
import { HeaderSection } from "./header-section";
import { ExploreSection } from "./explore-section";
import { FeatureSection } from "./feature-section";
import { TestmonialSection } from "./testimonial-section";
import { MobileGetStartedForm } from "./mobile-get-started-form";
import {
  useAddToCartVisibilityStore,
  useChangeMobileConnectFormVisibility,
  useChangeMobileNavbarVisibility,
} from "@repo/shared-store";
import { MobileNavBar } from "./mobile-navbar";

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

  return (
    <div
      className={`relative flex flex-col bg-[#FFF6F4] ${(addToCartVisibility || MCFormVisibility || MobileNavbarVisibility) && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <MobileNavBar />
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
