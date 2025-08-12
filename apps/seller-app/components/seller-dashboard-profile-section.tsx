"use client";

import { useSellerDataStore } from "@repo/shared-store";
import { BusinessInfoCard } from "./business-Info-card";
import { useActiveSellerDashboardSideBar } from "@repo/shared-store";
import { useDisplayAddProductSectionStore } from "@repo/shared-store";
import { AnaylticalCards } from "./seller-dashboard-analytical-cards";
import { SellerDashboardWelcomeMsg } from "./seller-dashboard-welcome-msg";

export const SellerDashboardProfileSection = () => {
  // Following is the Zustand state management code for displaying different section on seller dashboadr
  const { activeSideBar } = useActiveSellerDashboardSideBar();
  const{displayAddProductSection}=useDisplayAddProductSectionStore();


  // Following is the Zustand state management code for sellerData
  const sellerData = useSellerDataStore((state) => state.sellerData);
  const updateSellerData = useSellerDataStore((state) => state.updateSellerData);

  if (activeSideBar === "dashboard" && displayAddProductSection === false) {
    return (
      <div className="w-[100%] px-[1rem] flex flex-col gap-[1.5rem] justify-center">
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
