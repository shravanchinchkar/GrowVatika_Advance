"use client";

import Image from "next/image";
import { useState, memo } from "react";
import { signOut } from "next-auth/react";
import { useSellerDataStore } from "@repo/shared-store";
import { useActiveSellerDashboardSideBar } from "@repo/shared-store";
import { SellerDashboardSiteLogo } from "./seller-dashboard-sitelogo";
import { useDisplayAddProductSectionStore } from "@repo/shared-store";

export const SellerDashboardSideBar = memo(() => {
  const [display, setDisplay] = useState(false);
  const sellerData = useSellerDataStore((state) => state.sellerData);

  const { activeSideBar,setActiveSideBar } = useActiveSellerDashboardSideBar();
  

  const {setVisibilityOfAddProductSection}=useDisplayAddProductSectionStore()

  const SideBarMainSectionList = [
    "dashboard",
    "products",
    "collections",
    "orders",
  ];
  const SideBarSettingSectionList = ["settings", "help center"];

  const handleLogoutLogin = () => {
    if (display === false) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const handleSideBarNavigation = (e: React.MouseEvent<HTMLElement>) => {
    const targetSideBar = e.currentTarget.id.toLowerCase();

    // Define valid sidebar options
    const validSidebarOptions = [
      "products",
      "dashboard",
      "collections",
      "orders",
      "settings",
      "help center",
    ];

    // Only proceed if it's a valid sidebar option
    if (validSidebarOptions.includes(targetSideBar)) {
      setVisibilityOfAddProductSection(false);
      setActiveSideBar(targetSideBar);
    } else {
      console.warn(`Invalid sidebar option: ${targetSideBar}`);
    }
  };

  const handleSellerLogout = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 left-0 md:w-[30%] lg:w-[15rem] new-lg:w-[16rem] 2xl:w-[20.5%] h-[100%] bg-custom-bg rounded-[1.88rem] flex flex-col justify-between overflow-hidden">
      {/* Following div consist of Logo, Main Section and setting section */}
      <div className="flex flex-col gap-[0.5rem]">
        {/* Top div logo and main section */}
        <div className="h-max flex-col">
          {/* following div consist of log */}
          <div className="md:w-[11rem] lg:w-[13rem] new-lg:w-[14rem] 2xl:w-[15.9375rem] h-[4.0625rem] rounded-[24px] flex justify-start items-center m-[1rem] bg-[#fff] overflow-hidden">
            <SellerDashboardSiteLogo />
          </div>

          {/* Sidebar Menu Sectiom */}
          <ul className="flex flex-col text-[#fff]">
            <li className="text-[11px] pl-[1.5rem]">Main</li>

            <div className="flex flex-col md:text-[15px] lg:text-[17px] new-lg:text-[19px] 2xl:text-[19.63px] font-medium capitalize">
              {SideBarMainSectionList.map((item, index) => {
                return (
                  <button
                    className="capitalize outline-none"
                    key={index}
                    id={item}
                    onClick={handleSideBarNavigation}
                  >
                    <li
                      className={
                        activeSideBar == item
                          ? "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] bg-[#FFF6F4] text-[#56A430] animate-bg-bounce-in"
                          : "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem]"
                      }
                    >
                      <div className="relative md:w-[17px] md:h-[17px] lg:w-[21px] lg:h-[21px] xl:w-[24px] xl:h-[24px]">
                        <Image
                          className={"object-cover pointer-events-none"}
                          src={`/assets/images/SellerDashboardImages/${item}Icon.svg`}
                          alt={`${item}Icon`}
                          fill
                        />
                        <Image
                          className={
                            activeSideBar == item
                              ? "object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 pointer-events-none"
                              : "object-cover opacity-0 absolute inset-0 pointer-events-none"
                          }
                          src={`/assets/images/SellerDashboardImages/${item}IconHover.svg`}
                          alt="dashboardIcon"
                          fill
                        />
                      </div>
                      <p>{item}</p>
                    </li>
                  </button>
                );
              })}
            </div>
          </ul>
        </div>

        {/* Sidebar Setting Section */}
        <ul className="text-[#fff]">
          <li className="text-[11px] pl-[1.5rem]">Settings</li>
          <div className="flex flex-col md:text-[15px] lg:text-[17px] new-lg:text-[19px] 2xl:text-[19.63px] font-medium capitalize">
            {SideBarSettingSectionList.map((item, index) => {
              return (
                <button
                  className="capitalize"
                  key={index}
                  id={item}
                  onClick={handleSideBarNavigation}
                >
                  <li
                    className={
                      activeSideBar == item
                        ? "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] bg-[#FFF6F4] text-[#56A430] animate-bg-bounce-in"
                        : "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem]"
                    }
                  >
                    <div className="relative md:w-[17px] md:h-[17px] lg:w-[21px] lg:h-[21px] xl:w-[24px] xl:h-[24px]">
                      <Image
                        className={"object-cover"}
                        src={`/assets/images/SellerDashboardImages/${item}Icon.svg`}
                        alt={`${item}Icon`}
                        fill
                      />
                      <Image
                        className={
                          activeSideBar == item
                            ? "object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0"
                            : "object-cover opacity-0 absolute inset-0"
                        }
                        src={`/assets/images/SellerDashboardImages/${item}IconHover.svg`}
                        alt="dashboardIcon"
                        fill
                      />
                    </div>
                    <p>{item}</p>
                  </li>
                </button>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Seller Profile Section */}
      <div className="relative w-[100%] border-t-[2px] border-[#FFFFFF8C] flex flex-col items-center mx-auto">

        {/* Following is the pop-up */}
        {/* Logout and Profile Section */}
        <div
          className={
            display === true
              ? "absolute top-[-6rem] rounded-[1.5rem] md:w-[12rem] lg:w-[14rem] 2xl:w-[15.9375rem] h-[11.0625rem] py-[1.2rem] bg-[#fff] border-[2px] border-[#697F75]"
              : "hidden"
          }
        >
          <ul className="flex flex-col gap-[1rem]">
            <li className="text-[#56A430] text-[1.1875rem] font-medium capitalize flex gap-[1rem] items-center cursor-pointer pl-[2rem]">
              <div className="relative w-[1.5rem] h-[1.5rem]">
                <Image
                  src={
                    "/assets/images/SellerDashboardImages/sellerProfileIcon.svg"
                  }
                  alt="sellerProfileIcon"
                  className="object-cover"
                  fill
                />
              </div>
              <h2>Profile</h2>
            </li>

            <li
              className="text-[#FF4B4B] text-[1.1875rem] font-medium capitalize flex gap-[1rem] items-center cursor-pointer  pl-[2rem]"
              onClick={handleSellerLogout}
            >
              <div className="relative w-[1.5rem] h-[1.5rem]">
                <Image
                  src={
                    "/assets/images/SellerDashboardImages/sellerLogoutIcon.svg"
                  }
                  alt="sellerProfileIcon"
                  className="object-cover"
                  fill
                />
              </div>
              <h2>Logout</h2>
            </li>
          </ul>
        </div>

        {/* Following div consist of seller-profile,seller-name and other things */}
        <div
          className="z-10 md:w-[12rem] lg:w-[14rem] md:h-[4rem] 2xl:w-[15.9375rem] 2xl:h-[4.0625rem] rounded-[1.5rem] flex justify-center items-center md:px-[0.5rem] lg:px-[1rem] gap-[0.8rem] m-[1rem] bg-[#fff] border-[1.5px] border-[#697F75] cursor-pointer"
          onClick={handleLogoutLogin}
        >
          <div className="w-[100%] h-[100%] flex justify-between py-[0.5rem]">
            {/* Nursery Profile Photo goes here! */}
            <div className="flex items-center">
              <div className="relative w-[2.425rem] h-[2.425rem] rounded-full overflow-hidden bg-[#56A430]">
                {/* Profile Photo Image  goes here */}
                {sellerData.profilePictureURL ? (
                  <Image
                    src={sellerData.profilePictureURL}
                    alt="profileImage"
                    className="object-cover"
                    fill
                    sizes="2.425rem" // Add this - matches your container size
                  />
                ) : (
                  <Image
                    src={
                      "/assets/images/SellerDashboardImages/seller-image-placeholder.svg"
                    }
                    alt="noimage"
                    className="object-cover"
                    fill
                  />
                )}
              </div>
            </div>

            <div className="md:w-[75%] lg:w-[77%] h-[100%] flex justify-between items-center gap-[1rem]">
              {/* Nursery Name */}
              <div className="flex flex-col justify-center font-medium capitalize h-[100%]">
                <h1 className="text-[#123524] text-[0.75rem] max-h-max leading-[15px]">
                  {sellerData.nurseryName}
                </h1>
                <h3 className="text-[#697F75] text-[0.6875rem] h-[50%] flex items-end">
                  Seller account
                </h3>
              </div>

              <div
                className={
                  display === true
                    ? "w-[1rem] h-[1rem] relative"
                    : "w-[1rem] h-[1rem] relative rotate-180"
                }
              >
                <Image
                  src={
                    "/assets/images/SellerDashboardImages/sellerDashboardDownArrow.svg"
                  }
                  alt="downarow"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
