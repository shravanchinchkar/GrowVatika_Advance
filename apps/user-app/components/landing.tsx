"use client";

import { Cart } from "./cart";
import { Hamburg } from "./hamburg";
import { Navbar } from "./nav-section";
import { Header } from "./header-section";
import { Footer } from "./footer-section";
import { LandingPot } from "./landing-pot";
import { AboutUsSection } from "./about-us";
import { HeroSection } from "./hero-section";
import { ShoppingCartIcon } from "./cart-icon";
import { ContactForm } from "./get-started-from";
import { ExploreSection } from "./explore-section";
import { FeatureSection } from "./feature-section";
import { UserAuthButton } from "./user-auth-button";
import { UserProfileIcon } from "./user-profile-icon";
import { TestmonialSection } from "./testimonial-section";
import { MobileGetStartedForm } from "./mobile-get-started-form";
import { useAddToCartVisibilityStore, useChangeMobileConnectFormVisibility } from "@repo/shared-store";

export const LandingPage = () => {
  const addToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.addToCartDropDownVisibility
  );
  const MCFormVisibility=useChangeMobileConnectFormVisibility((state:any)=>state.displayMCForm)

  return (
    <div
      className={`relative flex flex-col bg-[#FFF6F4] ${addToCartVisibility && "h-[100vh] overflow-hidden"} ${MCFormVisibility && "h-[100vh] overflow-hidden"} `}
    >
      <Cart />
      <MobileGetStartedForm/>

      {/* Header Section */}
      <header className="md:h-screen relative flex flex-col items-center gap-[1rem] new-sm:pt-[0.5rem] md:pt-[2rem] new-sm:pb-[0.5rem] md:pb-0">
        <div className="new-sm:w-[100vw] md:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] h-max flex justify-between">
          <Header />
          <div className="flex new-sm:flex-col md:flex-row items-center new-sm:gap-[0.3rem] md:gap-[2.5rem]">
            <UserProfileIcon />
            <ShoppingCartIcon />
            <Hamburg />
          </div>
        </div>

        <div className="new-sm:hidden md:flex lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] justify-between items-center z-10 font-[Poppins]">
          <Navbar />
          <UserAuthButton />
        </div>

        <HeroSection />
        <LandingPot />
      </header>

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
