"use client";

import Image from "next/image";
import { useState } from "react";
import { SellerDashboardSiteLogo } from "./seller-dashboard-sitelogo";

export const SellerDashboardSideBar = () => {
  const [active, setActive] = useState(true);
  const [display, setDisplay] = useState(false);
  const [activeSideBarSection, setactiveSideBarSection] = useState("Dashboard");

  const handleLogoutLogin = () => {
    console.log("Hello");
    if (display === false) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const SideBarMainSectionList = [
    "Dashboard",
    "Products",
    "Collections",
    "Orders",
  ];
  const SideBarSettingSectionList = ["setting", "help center"];

  const handleSideBarNavigation = (e: any) => {
    const targetSideBar = e.target.innerText;
    setactiveSideBarSection(targetSideBar);
    console.log("Active Side bar main section:", activeSideBarSection);
  };

  return (
    <div className="fixed top-0 left-0 h-[100%] bg-custom-bg rounded-[1.88rem] flex flex-col">
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
                      activeSideBarSection === item
                        ? "group flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] bg-[#FFF6F4] transition-colors duration-300 text-[#56A430]"
                        : "group flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] hover:bg-[#FFF6F4] transition-colors duration-300 hover:text-[#56A430]"
                    }
                  >
                    <div className="relative w-[24px] h-[24px]">
                      <Image
                        className="object-cover group-hover:opacity-0 transition-opacity duration-300"
                        src={`/assets/images/SellerDashboardImages/${item}Icon.svg`}
                        alt={`${item}Icon`}
                        fill
                      />
                      <Image
                        className={
                          activeSideBarSection === item
                            ? "object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0"
                            : "object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0"
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
      <div className="mt-[0.5rem]">
        <ul className="text-[#fff]">
          <li className="text-[11px] pl-[1.5rem]">Settings</li>
          <div className="flex flex-col text-[19.63px] font-medium capitalize">
            {SideBarSettingSectionList.map((item, index) => {
              return (
                <li
                  className="group flex items-center gap-[1rem] cursor-pointer pl-[1.5rem] py-[0.5rem] hover:bg-[#FFF6F4] transition-colors duration-300 hover:text-[#56A430]"
                  key={index}
                >
                  <div className="relative w-[24px] h-[24px]">
                    <Image
                      className="object-cover group-hover:opacity-0 transition-opacity duration-300"
                      src={`/assets/images/SellerDashboardImages/${item}Icon.svg`}
                      alt={`${item}Icon`}
                      fill
                    />
                    <Image
                      className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0"
                      src={`/assets/images/SellerDashboardImages/${item}IconHover.svg`}
                      alt="dashboardIcon"
                      fill
                    />
                  </div>
                  <p>{item}</p>
                </li>
              );
            })}
          </div>
        </ul>
      </div>

      {/* Seller Profile Section */}
      <div className="relative w-[100%]  border-t-[2px] border-[#FFFFFF8C] flex flex-col items-center mt-[6.5rem] mx-auto">
        {/* Logout and Profile Section */}
        <div
          className={
            display === true
              ? "absolute top-[-6rem] rounded-[1.5rem] w-[15.9375rem] h-[11.0625rem] py-[1.2rem] px-[2rem] bg-[#fff] border-[2px] border-[#697F75]"
              : "hidden"
          }
        >
          <ul className="flex flex-col gap-[1rem]">
            <li className="text-[#56A430] text-[1.1875rem] font-medium capitalize flex gap-[1rem] items-center cursor-pointer">
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

            <li className="text-[#FF4B4B] text-[1.1875rem] font-medium capitalize flex gap-[1rem] items-center cursor-pointer">
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
              <h1 className="text-[#123524] text-[1rem]">Evergreen Gardens</h1>
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
