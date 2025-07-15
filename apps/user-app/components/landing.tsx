import { Cart } from "./cart";
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

export const LandingPage = () => {
  return (
    <div className="relative flex flex-col bg-[#FFF6F4]">
      <Cart />
      {/* Header Section */}

      <header className="relative flex flex-col items-center gap-[1rem] pt-[2rem] h-screen">
        <div className="lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] h-max flex justify-between">
          <Header />
          <div className="flex items-center gap-[2.5rem]">
            <UserProfileIcon />
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] flex justify-between items-center z-10 font-[Poppins]">
          <Navbar />
          <UserAuthButton />
        </div>

        <HeroSection />
        <LandingPot />
      </header>

      {/* Main Section */}
      <main className="flex flex-col gap-[3rem] border-[2px]">
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