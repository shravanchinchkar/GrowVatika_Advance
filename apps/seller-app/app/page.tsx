import { SellerHeaderSection } from "../components/seller-header-section";
import { SellerHeroSection } from "../components/seller-hero-section";

export default function Home() {
  return (
    // bg-[#FFF6F4]
    <div className="text-2xl h-[100vh] bg-[#FFF6F4] flex items-center flex-col gap-[2.4rem] font-[Poppins]">
      <SellerHeaderSection/>
      <SellerHeroSection/>
    </div>
  );
}
