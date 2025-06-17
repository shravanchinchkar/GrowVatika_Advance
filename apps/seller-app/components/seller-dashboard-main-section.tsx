"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sellerDataStore } from "../store/sellerData";
import { toastStyle } from "@repo/shared/utilfunctions";
import { BusinessInfoCard } from "./business-Info-card";
import { activeSideBarStore } from "../store/activeSideBar";
import { SellerDashboardLoader } from "./seller-dashboard-loader";
import { AnaylticalCards } from "./seller-dashboard-analytical-cards";
import { SellerDashboardWelcomeMsg } from "./seller-dashboard-welcome-msg";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardMainSection = () => {
  const searchParams = useSearchParams();
  const sellerId = searchParams?.get("id") || "";
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Following is the Zustand state management code
  const sellerData = sellerDataStore((state) => state.sellerData);
  const updateSellerData = sellerDataStore((state) => state.updateSellerData);

  useEffect(() => {
    setIsDataLoaded(false);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/getdataforsellerdashboard?id=${encodeURIComponent(sellerId)}`
        );
        console.log("Seller Dashboard Data:", res.data.sellerData);
        updateSellerData({
          email: res.data.sellerData.email,
          address: res.data.sellerData.address,
          location: res.data.sellerData.location,
          nurseryBio: res.data.sellerData.nurseryBio,
          phoneNumber: res.data.sellerData.phoneNumber,
          nurseryName: res.data.sellerData.nurseryName,
          specialities: res.data.sellerData.specialities,
          businesshours: res.data.sellerData.business_hours,
        });
        setIsDataLoaded(true);
        console.log("sellerData State:", sellerData);
      } catch (error) {
        console.error(
          "Error while getting data of seller in seller dashboard:",
          error
        );
        toast.error("Failed to fetch seller data", toastStyle);
      }
    };
    fetchData();
  }, [sellerId]);

  // Following is the state management code using zustan
  const activeSideBar = activeSideBarStore((state: any) => state.activeSideBar);
  const displayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );

  if (activeSideBar === "dashboard" && displayAddProductSection === false) {
    if (isDataLoaded === false) {
      return (
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          <SellerDashboardLoader />
        </div>
      );
    } else {
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
  }
};
