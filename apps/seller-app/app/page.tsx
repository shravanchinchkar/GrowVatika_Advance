import { SellerHeaderSection } from "../components/seller-header-section";
import { SellerHeroSection } from "../components/seller-hero-section";

export default function Home() {
  return (
    <div className="h-screen text-2xl bg-[#FFF6F4] flex flex-col items-center justify-between gap-[2.4rem] font-[Poppins] border-[2px]">
      <SellerHeaderSection/>
      <SellerHeroSection/>
    </div>
  );
}
