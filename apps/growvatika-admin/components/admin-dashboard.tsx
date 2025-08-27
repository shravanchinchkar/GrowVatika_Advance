"use client";
import axios from "axios";
import { Header } from "./header";
import { useSession } from "next-auth/react";
import { NurseriesList } from "./nurseries-list";
import { memo, useEffect, useState } from "react";
import { TApiResponse } from "@repo/common-types";
import { useAdminNurseryDataStore } from "@repo/shared-store";

export const AdminDashboard = memo(() => {
  const session = useSession();
  const adminName: string = session?.data?.user.name || "";

  // Following are all the useState
  const [activeNurseryType, setActiveNurseryType] =
    useState("Approved Nurseries");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Following is the zustand state
  const { nurseriesData, setNurseriesData } = useAdminNurseryDataStore();

  const FilterButtonName = [
    "New Nurseries",
    "Approved Nurseries",
    "Suspended Nurseries",
  ];

  //  call to the backend
  useEffect(() => {
    const getNurseriesData = async () => {
      console.log("getNurseriesData");
      try {
        let res;
        setLoading(true);
        if (activeNurseryType === "New Nurseries") {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${false}&isSuspended=${false}`
          );
        } else if (activeNurseryType === "Approved Nurseries") {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${true}&isSuspended=${false}`
          );
        } else {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${true}&isSuspended=${true}`
          );
        }

        const temp: TApiResponse = res.data;

        if (temp.success && temp.adminNurseriesData) {
          setNurseriesData(temp.adminNurseriesData);
          setError("");
        } else if (!temp.success && temp.error) {
          setError(temp.error);
        } else {
          // Handle case where success is true but no data
          setNurseriesData([]);
          setError("");
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching nurseries data:", error);
        // Handle axios errors
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error) {
            console.log(
              "error.response.data.error:",
              error.response.data.error
            );
            setError(error.response.data.error);
          } else {
            setError(`Request failed: ${error.message}`);
          }
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };
    getNurseriesData();
  }, [setError, setLoading, setNurseriesData, activeNurseryType]);

  const filterButtonStyle =
    "flex justify-around items-center bg-[#FFFFFF] w-[20%] text-[1.22669rem] text-[#171717] font-medium rounded-[0.3125rem] cursor-pointer capitalize outline-none";

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-[1rem] items-center pt-[1rem]">
      <Header />
      <h1 className="font-unbounded text-[2rem]">{`Welcome, Admin ${adminName}.`}</h1>
      <div className="w-[95%] h-[10%]  flex justify-between font-poppins">
        {FilterButtonName.map((item, index) => {
          return (
            <button
              key={index}
              className={`${filterButtonStyle} ${activeNurseryType === item && "shadow-productcard-custom-boxShadow border-[1.6px] border-[#56A430]"}`}
              onClick={() => {
                setActiveNurseryType(item);
              }}
            >
              {item}
              <div
                className={`w-[1rem] h-[1rem] rounded-full ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-[#56A430]" : "bg-[#FF4B4B]"}`}
              ></div>
            </button>
          );
        })}
        <div className="flex justify-around items-center bg-[#FFFFFF] w-[20%] text-[1.22669rem] text-[#171717] font-medium rounded-[0.3125rem]capitalize outline-none">
          {`Total ${nurseriesData.length} Collaborations`}
        </div>
      </div>
      <NurseriesList
        loading={loading}
        error={error}
        setLoading={setLoading}
        setError={setError}
      />
    </div>
  );
});

AdminDashboard.displayName = "AdminDashboard";
