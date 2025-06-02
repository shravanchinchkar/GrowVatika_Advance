import { SellerHeaderSection } from "../components/seller-header-section";
import { SellerHeroSection } from "../components/seller-hero-section";

export default function Home() {
  return (
    <div className="text-2xl bg-[#FFF6F4] flex items-center flex-col gap-[4rem] font-[Poppins]">
      <SellerHeaderSection/>
      <SellerHeroSection/>
    </div>
  );
}
