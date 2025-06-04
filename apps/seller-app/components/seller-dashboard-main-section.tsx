import { SiteLogo } from "@repo/ui/brand-logo";
import { BusinessInfoSection } from "./business-info-section";

export const SellerDashboardMainSection = () => {
  return (
    <div className="min-h-screen bg-[#f0ece9] flex items-center justify-center p-4">
      <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-xl flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8 bg-[#f9f6f2] rounded-r-3xl">
          {/* Welcome Message */}
          <div className="p-6 border-[2px] bg-custom-bg rounded-[1.25rem] h-[9.313rem] w-[63.375rem]">
            <div className="text-white w-[45.8125rem] font-bold text-[2rem] capitalize font-[Unbounded]">
              Welcome Back, Evergreen Garden
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="text-white w-[29.375rem] text-[1.25rem] font-medium leading-[1.625rem] font-[Poppins]">
                Your store is performing well. You have 3 new orders and 12 new
                visitors today.
              </div>

              <button className="w-[14.1875rem] h-[3.1875rem] rounded-[0.625rem] bg-white text-[#697F75] text-[1.2267rem] capitalize font-[Poppins] font-normal text-center leading-normal shrink-0">
                Add Product
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl h-28 shadow flex flex-col justify-between">
              <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-black/40">
                Total Sales
              </div>
              <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
                ₹1,20,589
              </div>
              <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430]">
                +25% from last month
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl h-28 shadow flex flex-col justify-between">
              <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-black/40">
                Total Orders
              </div>
              <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
                501
              </div>
              <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430]">
                +6.2% from last month
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl h-28 shadow flex flex-col justify-between">
              <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-black/40">
                Total Products
              </div>
              <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
                67
              </div>
              <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430]">
                15 low in stock
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl h-28 shadow flex flex-col justify-between">
              <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-black/40">
                Store Visitors
              </div>
              <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
                10,517
              </div>
              <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430]">
                +16.8% from last month
              </div>
            </div>
          </div>

         <BusinessInfoSection/>
        </div>
      </div>
    </div>
  );
};
