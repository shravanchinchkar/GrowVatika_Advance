import { SiteLogo } from "@repo/ui/brand-logo";

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

          <div className="w-full rounded-[0.75rem] border-2 border-[#E5E5E5] bg-white p-6 shadow-md flex flex-col gap-5">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[#171717] font-[Poppins] text-[2.016rem] font-semibold leading-[2.621rem]">
                  Business Information
                </h2>
                <p className="text-[#8C8C8C] font-[Poppins] text-[1.197rem] font-medium leading-[1.556rem]">
                  This information is displayed on your public store page
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-[1.26rem] border border-[#CBD0D3] text-[#000000] font-[Poppins] text-[1rem] font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6H9v-2l6-6z"
                  />
                </svg>
                Edit
              </button>
            </div>

            {/* Business Info */}
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-4">
                {/* Image */}
                <div
                  className="w-[6.363rem] h-[6.363rem] rounded-full bg-center bg-cover"
                  style={{ backgroundImage: "url('/path-to-image.jpg')" }}
                ></div>
                {/* Text */}
                <div>
                  <p className="text-[#171717] font-[Poppins] text-[1.512rem] font-semibold leading-[1.966rem]">
                    Evergreen Gardens
                  </p>
                  <p className="text-[#8C8C8C] font-[Poppins] text-[1.236rem] font-medium leading-normal">
                    Family-owned nursery specializing in rare indoor plants,
                    succulents, and gardening supplies with expert advice.
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#123524] text-white rounded-[1.26rem]">
                <span className="text-[#FFCE31] text-[1rem]">★</span>
                <span className="font-[Poppins] text-[1.236rem] font-medium uppercase">
                  4.5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
