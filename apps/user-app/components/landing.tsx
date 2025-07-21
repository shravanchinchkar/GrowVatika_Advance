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
} from "@repo/shared-store";

export const LandingPage = () => {
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const MCFormVisibility = useChangeMobileConnectFormVisibility(
    (state: any) => state.displayMCForm
  );

  return (
    <div
      className={`relative flex flex-col bg-[#FFF6F4] ${addToCartVisibility && "h-[100vh] overflow-hidden"} ${MCFormVisibility && "h-[100vh] overflow-hidden"}`}
    >
      <Cart />
      <MobileGetStartedForm />
      <HeaderSection />
      <LandingPot />

      {/* Header Section */}
      <div className="mx-auto md:h-max relative flex flex-col items-center gap-[1rem] new-sm:pt-[0.5rem] md:pt-[1rem] new-sm:pb-[0.5rem] md:pb-0">
        <HeroSection />
      </div>

      {/* Main Section */}
      <main className="flex flex-col new-sm:gap-[0.5rem] md:gap-[3rem]">
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
