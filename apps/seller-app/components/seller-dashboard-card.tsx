import { SellerDashboardSideBar } from "./seller-dashboard-sidebar";
import { SellerDashboardMainSection } from "./seller-dashboard-main-section";
import { SellerDashboardNavBar } from "./seller-dashboard-navbar";

export const SellerDashboardCard = () => {
  return (
    <div className="relative w-[98%] h-[98%] rounded-[1.88rem] bg-[#FFF6F4] drop-shadow-custom backdrop-blur-xl flex justify-between overflow-hidden pb-[0.5rem]">
      {/* Left Column that consist of side bar */}
      <div className="relative w-[20.625%]">
        <SellerDashboardSideBar />
      </div>

      {/* Right Column that consist of navbar and other section */}
      <div className="lg:w-[74%] new-lg:w-[77%] xl:w-[79.375%] flex flex-col items-center max-h-100 xl:p-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#FFF]">
        <SellerDashboardNavBar />
        <SellerDashboardMainSection />
      </div>
    </div>
  );
};
