import { SellerDashboardNavBar } from "./seller-dashboard-navbar";
import { SellerDashboardSideBar } from "./seller-dashboard-sidebar";
import { SellerDashboardMainSection } from "./seller-dashboard-main-section";
export const SellerDashboardCard = () => {
  return (
    <div className="w-[98%] h-[98%] rounded-[1.88rem] bg-custom-fill drop-shadow-custom backdrop-blur-xl grid grid-cols-[20.625%_79.375%] overflow-hidden">
      {/* Left Column that consist of side bar */}
      <div>
        <SellerDashboardSideBar />
      </div>

      {/* Right Column that consist of navbar and other section */}
      <div className="flex flex-col">
        <SellerDashboardNavBar />
        <SellerDashboardMainSection />
      </div>
    </div>
  );
};
