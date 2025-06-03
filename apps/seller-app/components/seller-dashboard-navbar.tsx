import Image from "next/image";

export const SellerDashboardNavBar = () => {
  return (
    <div className="h-[87px] w-[1410px] bg-white flex justify-between items-center">
      <div className="text-[32px] ml-[1.5rem] font-semibold">
        Seller Dashboard
      </div>

      <div className="flex gap-10 mr-[1.5rem]">
        <div className="flex justify-center items-center h-[65px] w-[65px] rounded-[20px] border-[1.5px] border-[#CBD0D3]">
          <div className="relative h-[24px] w-[24px] ">
            <Image
              src="/assets/images/SellerDashboardImages/navNotificationIcon.svg"
              alt="navNotificationIcon"
              fill
            />
          </div>
        </div>

        <div className="flex justify-center items-center h-[65px] w-[65px] rounded-[20px] border-[1.5px] border-[#CBD0D3]">
          <div className="relative h-[24px] w-[24px] ">
            <Image
              src="/assets/images/SellerDashboardImages/navSettingIcon.svg"
              alt="navSettingIcon"
              fill
            />
          </div>
        </div>
      </div>

    </div>
  );
};
