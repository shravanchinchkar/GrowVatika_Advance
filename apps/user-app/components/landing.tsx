"use client";

import { useEffect } from "react";
import { Navbar } from "./nav-section";
import { Header } from "./header-section";
import { Footer } from "./footer-section";
import { LandingPot } from "./landing-pot";
import { AboutUsSection } from "./about-us";
import { HeroSection } from "./hero-section";
import { ShoppingCartIcon } from "./cart-icon";
import { ContactForm } from "./get-started-from";
import { useSearchParams } from "next/navigation";
import { ExploreSection } from "./explore-section";
import { FeatureSection } from "./feature-section";
import { UserAuthButton } from "./user-auth-button";
import { TestmonialSection } from "./testimonial-section";

export const LandingPage = () => {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");

  console.log

  useEffect(() => {
    // Handle scrolling when page loads with scrollTo parameter
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [scrollTo]);
  return (
    <div className="flex flex-col bg-[#FFF6F4]">
      {/* Header Section */}
      <header className="relative flex flex-col items-center gap-[1rem] pt-[2rem] h-screen">
        <div className="lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] h-max flex justify-between ">
          <Header />
          <ShoppingCartIcon />
        </div>

        <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] flex justify-between items-center z-10 font-[Poppins]">
          <Navbar />
          <UserAuthButton />
        </div>

        <HeroSection />
        <LandingPot />
      </header>

      {/* Main Section */}
      <main className="flex flex-col gap-[3rem]">
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
