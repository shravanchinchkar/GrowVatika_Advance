import Image from "next/image";

export const SellerDashboardNavBar = () => {
  return (
    <div className="h-[87px] bg-white flex justify-between items-center p-[1rem] rounded-[1.25rem] mx-[1rem] mt-[1rem]">
      <div className="text-[32px] ml-[1.5rem] font-semibold">
        Seller Dashboard
      </div>

      <div className="flex gap-10 mr-[1.5rem]">
        <div className="flex justify-center items-center h-[4.0625rem] w-[4.0625rem] rounded-[1.25rem] border-[1.5px] border-[#CBD0D3]">
          <div className="relative h-[24px] w-[24px] ">
            <Image
              src="/assets/images/SellerDashboardImages/navNotificationIcon.svg"
              alt="navNotificationIcon"
              fill
            />
          </div>
        </div>

        <div className="flex justify-center items-center h-[4.0625rem] w-[4.0625rem] rounded-[1.25rem] border-[1.5px] border-[#CBD0D3]">
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
