import { SellerHeaderSection } from "../components/seller-header-section";
import { SellerHeroSection } from "../components/seller-hero-section";

export default function Home() {
  return (
    <div className="text-2xl w-[100vw] h-[100vh] bg-[#FFF6F4] flex items-center flex-col font-[Poppins]">
      <SellerHeaderSection/>
      <SellerHeroSection/>
    </div>
  );
}
