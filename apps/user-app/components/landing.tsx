import { ExploreSection } from "./explore-section";
import { HeroSection } from "./hero-section";
import { Navbar } from "./nav-section";
import { AboutUsSection } from "./about-us";
import { FeatureSection } from "./feature-section";
import { TestmonialSection } from "./testimonial-section";
import { Header } from "./header-section";
import { Footer } from "./footer-section";
import { ContactForm } from "./get-started-from";
import { LandingPot } from "./landing-pot";

export const LandingPage=()=>{
  return (
    <div className="flex flex-col bg-[#FFF6F4]">
      <header className="relative flex flex-col items-center gap-[1rem] pt-[2rem] h-screen">
        <Header />
        <Navbar />
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
