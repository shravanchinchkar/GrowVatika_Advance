import Image from "next/image";

export const AnaylticalCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
      {/* card 1 */}
      <div className="w-[14.88544rem] h-[9.1875rem] p-4 bg-white rounded-[1.25rem] shadow flex flex-col justify-between">
        <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-[#00000066] flex items-end justify-between ">
          <h1>Total Sales</h1>
          <div className="w-[2.93875rem] h-[2.93875rem] rounded-[1.25rem] bg-[#DDE6CD] flex justify-center items-center">
            <div className="w-[1.53325rem] h-[1.5em] relative">
              <Image
                src={
                  "/assets/images/SellerDashboardMainImages/totalSalesIcon.svg"
                }
                className="object-contain"
                fill
                alt="rupeeimage"
              />
            </div>
          </div>
        </div>

        <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
          ₹1,20,589
        </div>
        <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430] flex gap-[0.5rem]">
          <div className="w-[0.69506rem] h-[0.69506rem] relative">
            <Image
              src={"/assets/images/SellerDashboardMainImages/growthIcon.svg"}
              alt="growthIcon"
              fill
              className="object-contain"
            />
          </div>
          <p>+25% from last month</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-[14.88544rem] h-[9.1875rem] p-4 bg-white rounded-[1.25rem] shadow flex flex-col justify-between">
        <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-[#00000066] flex items-end justify-between ">
          <h1>Total Orders</h1>
          <div className="w-[2.93875rem] h-[2.93875rem] rounded-[1.25rem] bg-[#BCC1B4] flex justify-center items-center">
            <div className="w-[1.53325rem] h-[1.5em] relative">
              <Image
                src={
                  "/assets/images/SellerDashboardMainImages/totalOrderIcon.svg"
                }
                className="object-contain"
                fill
                alt="rupeeimage"
              />
            </div>
          </div>
        </div>

        <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
          501
        </div>
        <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430] flex gap-[0.5rem]">
          <div className="w-[0.69506rem] h-[0.69506rem] relative">
            <Image
              src={"/assets/images/SellerDashboardMainImages/growthIcon.svg"}
              alt="growthIcon"
              fill
              className="object-contain"
            />
          </div>
          <p>+8.2% from last month</p>
        </div>
      </div>

      {/* Crad 3 */}
      <div className="w-[14.88544rem] h-[9.1875rem] p-4 bg-white rounded-[1.25rem] shadow flex flex-col justify-between">
        <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-[#00000066] flex items-end justify-between ">
          <h1>Total Products</h1>
          <div className="w-[2.93875rem] h-[2.93875rem] rounded-[1.25rem] bg-[#D3F8C2] flex justify-center items-center">
            <div className="w-[1.53325rem] h-[1.5em] relative">
              <Image
                src={
                  "/assets/images/SellerDashboardMainImages/totalProductIcon.svg"
                }
                className="object-contain"
                fill
                alt="rupeeimage"
              />
            </div>
          </div>
        </div>

        <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
          67
        </div>
        <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430] flex gap-[0.5rem]">
          <div className="w-[0.69506rem] h-[0.69506rem] relative">
            <Image
              src={
                "/assets/images/SellerDashboardMainImages/totalProductsIcon2.svg"
              }
              alt="growthIcon"
              fill
              className="object-contain"
            />
          </div>
          <p>15 low in stock</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="w-[14.88544rem] h-[9.1875rem] p-4 bg-white rounded-[1.25rem] shadow flex flex-col justify-between">
        <div className="text-[1.25rem] font-[Poppins] font-semibold leading-[1.3] text-[#00000066] flex items-end justify-between ">
          <h1>Store Visitors</h1>
          <div className="w-[2.93875rem] h-[2.93875rem] rounded-[1.25rem] bg-[#BBE1FB] flex justify-center items-center">
            <div className="w-[1.53325rem] h-[1.5em] relative">
              <Image
                src={
                  "/assets/images/SellerDashboardMainImages/storeVisitorIcon.svg"
                }
                className="object-contain"
                fill
                alt="rupeeimage"
              />
            </div>
          </div>
        </div>
        <div className="text-[2rem] font-[Poppins] font-bold leading-[1.3] text-[#171717]">
          10,517
        </div>
        <div className="text-[0.6875rem] font-[Poppins] font-medium leading-[1.3] text-[#56A430] flex gap-[0.5rem]">
          <div className="w-[0.69506rem] h-[0.69506rem] relative">
            <Image
              src={
                "/assets/images/SellerDashboardMainImages/storeVisitorsIcon2.svg"
              }
              alt="growthIcon"
              fill
              className="object-contain"
            />
          </div>
          <p>+18.3% from last month</p>
        </div>
      </div>
    </div>
  );
};
