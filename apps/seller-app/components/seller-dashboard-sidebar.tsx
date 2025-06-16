"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { activeSideBarStore } from "../store/activeSideBar";
import { SellerDashboardSiteLogo } from "./seller-dashboard-sitelogo";
import { sellerDataStore } from "../store/sellerData";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardSideBar = () => {
  const [display, setDisplay] = useState(false);
  const sellerData = sellerDataStore((state) => state.sellerData);

  const currentActiveSideBar = activeSideBarStore(
    (state: any) => state.activeSideBar
  );
  const updateActiveSideBar = activeSideBarStore(
    (state: any) => state.updateActiveSideBar
  );

  const updateVisibility = displayAddProductSectionStore(
    (state: any) => state.updateDisplayAddProductSectionStore
  );

  const SideBarMainSectionList = [
    "dashboard",
    "products",
    "collections",
    "orders",
  ];
  const SideBarSettingSectionList = ["settings", "help center"];

  const handleLogoutLogin = () => {
    console.log("Hello");
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
      updateVisibility(false);
      updateActiveSideBar(targetSideBar);
      console.log("targetSideBar:", targetSideBar);
    } else {
      console.warn(`Invalid sidebar option: ${targetSideBar}`);
    }
  };

  const handleSellerLogout = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 left-0 h-[100%] bg-custom-bg rounded-[1.88rem] flex flex-col justify-between overflow-hidden">
      {/* Following div consist of Logo, Main Section and setting section */}
      <div className="flex flex-col gap-[0.5rem]">
        {/* Top div logo and main section */}
        <div className="h-max flex-col">
          {/* following div consist of log */}
          <div className="w-[15.9375rem] h-[4.0625rem] rounded-[24px] flex justify-start items-center m-[1rem] bg-[#fff] overflow-hidden">
            <SellerDashboardSiteLogo />
          </div>

          {/* Sidebar Menu Sectiom */}
          <ul className="flex flex-col text-[#fff]">
            <li className="text-[11px] pl-[1.5rem]">Main</li>

            <div className="flex flex-col text-[19.63px] font-medium capitalize">
              {SideBarMainSectionList.map((item, index) => {
                return (
                  <button
                    className="capitalize"
                    key={index}
                    id={item}
                    onClick={handleSideBarNavigation}
                  >
                    <li
                      className={
                        currentActiveSideBar == item
                          ? "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] bg-[#FFF6F4] text-[#56A430] animate-bg-bounce-in"
                          : "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem]"
                      }
                    >
                      <div className="relative w-[24px] h-[24px]">
                        <Image
                          className={"object-cover pointer-events-none"}
                          src={`/assets/images/SellerDashboardImages/${item}Icon.svg`}
                          alt={`${item}Icon`}
                          fill
                        />
                        <Image
                          className={
                            currentActiveSideBar == item
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
          <div className="flex flex-col text-[19.63px] font-medium capitalize">
            {SideBarSettingSectionList.map((item, index) => {
              if (currentActiveSideBar == item) {
                console.log("true");
              }
              return (
                <button
                  className="capitalize"
                  key={index}
                  id={item}
                  onClick={handleSideBarNavigation}
                >
                  <li
                    className={
                      currentActiveSideBar == item
                        ? "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] bg-[#FFF6F4] text-[#56A430] animate-bg-bounce-in"
                        : "flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem]"
                    }
                  >
                    <div className="relative w-[24px] h-[24px]">
                      <Image
                        className={"object-cover"}
                        src={`/assets/images/SellerDashboardImages/${item}Icon.svg`}
                        alt={`${item}Icon`}
                        fill
                      />
                      <Image
                        className={
                          currentActiveSideBar == item
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
        {/* Logout and Profile Section */}
        <div
          className={
            display === true
              ? "absolute top-[-6rem] rounded-[1.5rem] w-[15.9375rem] h-[11.0625rem] py-[1.2rem]  bg-[#fff] border-[2px] border-[#697F75]"
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

        <div className="z-10 w-[15.9375rem] h-[4.0625rem] rounded-[1.5rem] flex justify-around items-center m-[1rem] bg-[#fff] border-[2px] border-[#697F75]">
          <div className="w-[2.425rem] h-[2.425rem] rounded-full relative overflow-hidden">
            <Image
              src={
                "/assets/images/SellerDashboardImages/sellerDashboardProfileImage.png"
              }
              alt="profileImage"
              className="object-cover"
              fill
            />
          </div>

          <div className="flex items-center gap-[1rem]">
            <div className="font-medium capitalize">
              <h1 className="text-[#123524] text-[0.85rem]">
                {sellerData.nurseryName}
              </h1>
              <h3 className="text-[#697F75] text-[0.6875rem]">
                Seller account
              </h3>
            </div>

            <button
              className={
                display === true
                  ? "w-[1rem] h-[1rem] relative"
                  : "w-[1rem] h-[1rem] relative rotate-180"
              }
              onClick={handleLogoutLogin}
            >
              <Image
                src={
                  "/assets/images/SellerDashboardImages/sellerDashboardDownArrow.svg"
                }
                alt="downarow"
                fill
                className="object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
