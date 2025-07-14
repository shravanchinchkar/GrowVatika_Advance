"use client";
import Image from "next/image";
import { useActiveSellerDashboardSideBar } from "@repo/shared-store";

export const SellerDashboardNavBar = () => {
  const navBarTitle = ["Seller Dashboard", "Product Management"];
  const activeSideBar = useActiveSellerDashboardSideBar(
    (state: any) => state.activeSideBar
  );

  return (
    <div className="lg:w-[100%] xl:w-[100%] flex justify-center items-center p-[1rem]">
      <div className="w-[100%] h-[87px]  bg-white flex justify-between items-center p-[1rem] rounded-[1.25rem]">
        <div className="lg:text-[1.7rem] xl:text-[1.8rem] 2xl:text-[2rem] font-semibold capitalize">
          {activeSideBar == "dashboard"
            ? "Seller Dashboard"
            : activeSideBar == "products"
              ? "Product Management"
              : activeSideBar == "collections"
                ? "Collections"
                : activeSideBar == "orders"
                  ? "orders"
                  : activeSideBar == "settings"
                    ? "settings"
                    : "help center"}
        </div>
        <div className="flex gap-10">
          <button className="flex justify-center items-center lg:w-[3.5rem] lg:h-[3.5rem] xl:w-[4.0625rem] xl:h-[4.0625rem] rounded-[1.25rem] border-[1.5px] border-[#CBD0D3]">
            <div className="relative h-[24px] w-[24px] ">
              <Image
                src="/assets/images/SellerDashboardImages/navNotificationIcon.svg"
                alt="navNotificationIcon"
                fill
              />
            </div>
          </button>

          <button className="flex justify-center items-center lg:w-[3.5rem] lg:h-[3.5rem] xl:w-[4.0625rem] xl:h-[4.0625rem] rounded-[1.25rem] border-[1.5px] border-[#CBD0D3]">
            <div className="relative h-[24px] w-[24px] ">
              <Image
                src="/assets/images/SellerDashboardImages/navSettingIcon.svg"
                alt="navSettingIcon"
                fill
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
