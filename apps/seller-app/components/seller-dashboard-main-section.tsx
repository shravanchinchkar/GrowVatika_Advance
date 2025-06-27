"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sellerDataStore } from "../store/sellerData";
import { toastStyle } from "@repo/shared/utilfunctions";
import { SellerDashboardLoader } from "./seller-dashboard-loader";
import { sellerProductDataStore } from "../store/sellerProductData";
import { SellerDashboardProfileSection } from "./seller-dashboard-profile-section";
import { SellerDashboardAddProductSection } from "./seller-dashboard-add-product-section";
import { SellerDashboardProductManagementSection } from "./seller-dashboard-product-management-section";
import CustomAddProductForm from "./custom-add-product-form";

export const SellerDashboardMainSection = () => {
  const searchParams = useSearchParams();
  const sellerId = searchParams?.get("id") || "";
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Following is the Zustand state management code for sellerData
  const updateSellerData = sellerDataStore((state) => state.updateSellerData);

  // Following is the Zustand state management code for seller Product data
  const updateSellerProductData = sellerProductDataStore(
    (state) => state.updateSellerProductData
  );

  useEffect(() => {
    setIsDataLoaded(false);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/getdataforsellerdashboard?id=${encodeURIComponent(sellerId)}`
        );
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
        updateSellerProductData(res.data.sellerProductData)
        setIsDataLoaded(true);
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

  if (isDataLoaded === false) {
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <SellerDashboardLoader />
      </div>
    );
  }
  return (
    <>
      <SellerDashboardProfileSection />
      <SellerDashboardProductManagementSection />
      {/* <SellerDashboardAddProductSection /> */}
      <CustomAddProductForm/>
    </>
  );
};
