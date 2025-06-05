import { SellerDashboardNavBar } from "./seller-dashboard-navbar";
import { SellerDashboardProductSection } from "./seller-dashboard-product-section";
import { SellerDashboardSideBar } from "./seller-dashboard-sidebar";

export const SellerDashboardCard = () => {
  return (
    <div className="w-[98%] h-[98%] rounded-[30px] bg-custom-fill drop-shadow-custom backdrop-blur-xl grid grid-cols-[20.635%_79.375%] overflow-hidden">

      <SellerDashboardSideBar />

      <div className="flex flex-col overflow-y-scroll">
        <SellerDashboardNavBar/>
        <SellerDashboardProductSection/>
      </div>

    </div>
  );
};
