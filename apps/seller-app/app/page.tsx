import { SellerHeaderSection } from "../components/seller-header-section";
import { SellerHeroSection } from "../components/seller-hero-section";

export default function Home() {
  return (
    <div className="min-h-screen max-h-max text-2xl bg-[#FFF6F4] flex flex-col items-center justify-between gap-[2.4rem] font-[Poppins]">
      <SellerHeaderSection/>
      <SellerHeroSection/>
    </div>
  );
}
