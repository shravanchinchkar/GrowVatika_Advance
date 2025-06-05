import { SellerDashboardNavBar } from "./seller-dashboard-navbar";
import { SellerDashboardSideBar } from "./seller-dashboard-sidebar";

export const SellerDashboardCard = () => {
  return (
    <div className="w-[98%] h-[98%] rounded-[30px] bg-custom-fill drop-shadow-custom backdrop-blur-xl flex overflow-hidden">
      <SellerDashboardSideBar />
      <SellerDashboardNavBar/>
    </div>
  );
};
