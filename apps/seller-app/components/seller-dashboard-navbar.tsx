import Image from "next/image";

export const SellerDashboardNavBar = () => {
  return (
    <div className="h-[5.4375rem] bg-white flex justify-between items-center">

      {/* Navbar heading */}
      <div className="text-[32px] ml-[1.5rem] font-semibold">
        Seller Dashboard
      </div>

      {/* Notification and setting Icon */}
      <div className="flex gap-10 mr-[2rem]">
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
