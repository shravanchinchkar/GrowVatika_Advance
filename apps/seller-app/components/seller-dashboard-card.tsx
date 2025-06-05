import { SellerDashboardNavBar } from "./seller-dashboard-navbar";
import { SellerDashboardSideBar } from "./seller-dashboard-sidebar";
import { SellerDashboardMainSection } from "./seller-dashboard-main-section";
export const SellerDashboardCard = () => {
  return (
    <div className="relative w-[98%] h-[98%] rounded-[1.88rem] bg-[#FFF6F4] drop-shadow-custom backdrop-blur-xl grid grid-cols-[20.625%_79.375%] overflow-hidden pb-[0.5rem]">
      {/* Left Column that consist of side bar */}
      <div className="relative">
        <SellerDashboardSideBar />
      </div>

      {/* Right Column that consist of navbar and other section */}
      <div className="flex flex-col max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#FFF]">
        <SellerDashboardNavBar />
        <SellerDashboardMainSection />
      </div>
    </div>
  );
};
