import { Navbar } from "./nav-section";
import { Footer } from "./footer-section";
import { LandingPot } from "./landing-pot";
import { Header } from "./header-section";
import { AboutUsSection } from "./about-us";
import { HeroSection } from "./hero-section";
import { ContactForm } from "./get-started-from";
import { ExploreSection } from "./explore-section";
import { FeatureSection } from "./feature-section";
import { UserAuthButton } from "./user-auth-button";
import { TestmonialSection } from "./testimonial-section";
import { ShoppingCartIcon } from "./cart-icon";

export const LandingPage = () => {
  return (
    <div className="flex flex-col bg-[#FFF6F4]">
      <header className="relative flex flex-col items-center gap-[1rem] pt-[2rem] h-screen">
        <div className="2xl:w-[82.1875rem] lg:w-[60rem] xl:w-[70rem] h-max flex justify-between">
          <Header />
          <ShoppingCartIcon />
        </div>

        <div className="lg:w-[60rem] xl:w-[70rem] 2xl:w-[82.1875rem] flex justify-between items-center z-10 font-[Poppins]">
          <Navbar />
          <UserAuthButton />
        </div>
        <HeroSection />
        <LandingPot />
      </header>
      <main className="flex flex-col gap-[3rem]">
        <ExploreSection />
        <AboutUsSection />
        <FeatureSection />
        <TestmonialSection />
        <ContactForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
