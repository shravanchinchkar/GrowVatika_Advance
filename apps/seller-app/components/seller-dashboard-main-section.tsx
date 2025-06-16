"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sellerDataStore } from "../store/sellerData";
import { toastStyle } from "@repo/shared/utilfunctions";
import { BusinessInfoCard } from "./business-Info-card";
import { activeSideBarStore } from "../store/activeSideBar";
import { SellerDashboardLoader } from "./seller-dashboard-loader";
import { AnaylticalCards } from "./seller-dashboard-analytical-cards";
import { SellerDashboardWelcomeMsg } from "./seller-dashboard-welcome-msg";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardMainSection = () => {
  const { data: session, status } = useSession();
  const sellerEmailId = session?.user?.email;
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const sellerData = sellerDataStore((state) => state.sellerData);
  const updateSellerData = sellerDataStore((state) => state.updateSellerData);
  useEffect(() => {
    const getSellerDataInDashboard = async () => {
      // Don't make API call if session is still loading
      if (status === "loading") {
        console.log("Session is still loading...");
        return <SellerDashboardLoader />;
      }

      // Only show error if session is loaded but no email found
      if (status === "authenticated" && !sellerEmailId) {
        console.error("Seller EmailId not available!");
        toast.error("Seller Email Id not available!", toastStyle);
        return;
      }

      // Don't make API call if user is not authenticated
      if (status === "unauthenticated") {
        console.error("User not authenticated!");
        toast.error("Please log in to access seller dashboard", toastStyle);
        return;
      }

      // Only proceed if we have a valid email
      if (sellerEmailId) {
        try {
          const res = await axios.get("api/getdataforsellerdashboard", {
            params: {
              email: sellerEmailId,
            },
          });
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
      }
    };
    getSellerDataInDashboard();
  }, [sellerEmailId]);

  // Following is the state management code using zustan
  const activeSideBar = activeSideBarStore((state: any) => state.activeSideBar);
  const displayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );

  if (activeSideBar === "dashboard" && displayAddProductSection === false) {
    if (status === "loading" || isDataLoaded === false) {
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
