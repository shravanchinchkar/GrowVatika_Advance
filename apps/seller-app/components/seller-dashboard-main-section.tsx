"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import Skeleton from "@repo/ui/loading";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useSellerProductDataStore } from "@repo/shared-store";
import { useSellerDataStore, useSpecialties } from "@repo/shared-store";
import { SellerDashboardProfileSection } from "./seller-dashboard-profile-section";
import { SellerDashboardAddProductSection } from "./seller-dashboard-add-product-section";
import { SellerDashboardProductManagementSection } from "./seller-dashboard-product-management-section";

export const SellerDashboardMainSection = memo(() => {
  const searchParams = useSearchParams();
  const sellerId = searchParams?.get("id") || "";
  const [loading, setLoading] = useState(true);

  // Following is the Zustand state management code for sellerData
  const updateSellerData = useSellerDataStore(
    (state) => state.updateSellerData
  );

  // Following is the Zustand state management code for seller Product data
  const updateSellerProductData = useSellerProductDataStore(
    (state) => state.updateSellerProductData
  );

  const { setSpecialties } = useSpecialties();

  useEffect(() => {
    if (sellerId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `/api/getsellerdashboarddata?id=${encodeURIComponent(sellerId)}`
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
            profilePictureURL: res.data.sellerData.profilePictureURL,
          });
          updateSellerProductData(res.data.sellerProductData);
          setSpecialties(res.data.sellerData.specialities);
          setLoading(false);
        } catch (error) {
          console.error(
            "Error while getting data of seller in seller dashboard:",
            error
          );
          toast.error("Failed to fetch seller data", toastStyle);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [sellerId]);

  if (!sellerId) {
    return (
      <div className="w-[95%] h-[100%] flex justify-center items-center font-poppins text-[#171717] text-[1.22669rem]">
        <p className="w-[60%] text-center">
          Please go on the seller website{" "}
          <Link
            href={"/"}
            className="underline uppercase text-[#FF4B4B] font-semibold"
          >
            Home Page
          </Link>{" "}
          and Click on the{" "}
          <span className="text-[#FF4B4B]">Start Selling Now!</span>
        </p>
      </div>
    );
  } else {
    if (loading) {
      return (
        <Skeleton className="w-[100%] h-[100%] flex justify-center items-center" />
      );
    } else {
      return (
        <div className="w-[100%]">
          <SellerDashboardProfileSection />
          <SellerDashboardProductManagementSection />
          <SellerDashboardAddProductSection />
        </div>
      );
    }
  }
});
