"use client";

import { sellerDataStore } from "../store/sellerData";
import { BusinessInfoCard } from "./business-Info-card";
import { activeSideBarStore } from "../store/activeSideBar";
import { AnaylticalCards } from "./seller-dashboard-analytical-cards";
import { SellerDashboardWelcomeMsg } from "./seller-dashboard-welcome-msg";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardProfileSection = () => {

  // Following is the Zustand state management code for displaying different section on seller dashboadr
  const activeSideBar = activeSideBarStore((state: any) => state.activeSideBar);
  const displayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );

  // Following is the Zustand state management code for sellerData
  const sellerData = sellerDataStore((state) => state.sellerData);
  const updateSellerData = sellerDataStore((state) => state.updateSellerData);

  if (activeSideBar === "dashboard" && displayAddProductSection === false) {
    return (
      <div className="w-[100%] p-[1rem] flex flex-col gap-[1.5rem] justify-center">
        {/* Following is the welcome back message div */}
        <SellerDashboardWelcomeMsg nurseryName={sellerData.nurseryName} />
        {/* Stats Cards */}
        <AnaylticalCards />
        {/* Business Information Card */}
        <BusinessInfoCard
          sellerData={sellerData}
          setSellerData={updateSellerData}
        />
      </div>
    );
  }
};
