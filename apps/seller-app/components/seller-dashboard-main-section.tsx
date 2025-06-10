"use client";

import { BusinessInfoCard } from "./business-Info-card";
import { activeSideBarStore } from "../store/activeSideBar";
import { AnaylticalCards } from "./seller-dashboard-analytical-cards";
import { SellerDashboardWelcomeMsg } from "./seller-dashboard-welcome-msg";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardMainSection = () => {
  const activeSideBar = activeSideBarStore((state: any) => state.activeSideBar);
  const displayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );

  if (activeSideBar === "dashboard" && displayAddProductSection===false) {
    return (
      <div className="w-[100%] p-[1rem] flex flex-col gap-[1.5rem] justify-center">
        {/* Following is the welcome back message div */}
        <SellerDashboardWelcomeMsg />
        {/* Stats Cards */}
        <AnaylticalCards />
        {/* Business Information Card */}
        <BusinessInfoCard />
      </div>
    );
  }
};
