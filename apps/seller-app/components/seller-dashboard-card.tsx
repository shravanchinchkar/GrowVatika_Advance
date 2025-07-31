import { SellerDashboardNavBar } from "./seller-dashboard-navbar";
import { SellerDashboardSideBar } from "./seller-dashboard-sidebar";
import { SellerDashboardMainSection } from "./seller-dashboard-main-section";

export const SellerDashboardCard = () => {
  return (
    <div className="bg-[#FFF6F4] w-screen h-screen flex justify-center items-center font-[Poppins]">
      <div className="w-[95%] h-[95%] border-[2px] border-[#1235244D] rounded-[40px] overflow-hidden p-[1rem] flex justify-center items-center">

        <div className="relative w-[98%] h-[98%] rounded-[1.88rem] bg-[#FFF6F4] drop-shadow-custom backdrop-blur-xl flex justify-between overflow-hidden pb-[0.5rem]">

          {/* Left Column that consist of side bar */}
          <div className="relative w-[20.625%]">
            <SellerDashboardSideBar />
          </div>

          {/* Right Column that consist of navbar and other section */}
          <div className="relative lg:w-[74%] new-lg:w-[77%] xl:w-[79.375%] flex flex-col items-center max-h-100 pb-[1rem] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#fff] [&::-webkit-scrollbar-thumb]:bg-[#FFF]">
            <SellerDashboardNavBar />
            <SellerDashboardMainSection />
          </div>
        </div>
      </div>
    </div>
  );
};
