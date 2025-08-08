import { MobileMessage } from "../components/mobile-message";
import { SellerHeaderSection } from "../components/seller-header-section";
import { SellerHeroSection } from "../components/seller-hero-section";

export default function Home() {
  return (
    <div className="h-screen bg-[#FFF6F4] flex flex-col items-center new-sm:justify-center md:justify-between md:gap-[5rem] lg:gap-[2.4rem]">
      <SellerHeaderSection/>
      <SellerHeroSection/>
      <MobileMessage/>
    </div>
  );
}
