
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
import { TestmonialSection } from "./testimonial-section";
import { Cart } from "./cart";

export const LandingPage = () => {
  return (
    <div className="relative flex flex-col bg-[#FFF6F4]">
      <Cart/>
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
