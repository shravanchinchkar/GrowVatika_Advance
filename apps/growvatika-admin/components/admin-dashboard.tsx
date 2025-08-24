"use client";
import axios from "axios";
import { Header } from "./header";
import { memo, useState } from "react";
import { useSession } from "next-auth/react";
import { NurseriesList } from "./nurseries-list";
import { TApiResponse } from "@repo/common-types";
import { useAdminNurseryDataStore } from "@repo/shared-store";

export const AdminDashboard = memo(() => {
  const session = useSession();
  const adminName: string = session?.data?.user.name || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("Approved Nurseries");
  
  // Following is the zustand state
  const { nurseriesData, setNurseriesData } = useAdminNurseryDataStore();

  const FilterButtonName = [
    "New Nurseries",
    "Approved Nurseries",
    "Suspended Nurseries",
  ];

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
              className={`${filterButtonStyle} ${isActive === item && "shadow-status-button-boxshadow"}`}
              onClick={async () => {
                // Check for new nurseries
                try {
                  setIsActive(item);
                  setLoading(true);
                  let res;
                  if (item === "New Nurseries") {
                    res = await axios.get(
                      `/api/admin/getnurseriesdata?isAdminVerified=${false}&isSuspended=${false}`
                    );
                  } else if (item === "Approved Nurseries") {
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
                } catch (error) {
                  console.error("Error fetching nurseries data:", error);
                  // Handle axios errors
                  if (axios.isAxiosError(error)) {
                    if (error.response?.data?.error) {
                      setError(error.response.data.error);
                    } else {
                      setError(`Request failed: ${error.message}`);
                    }
                  } else {
                    setError("An unexpected error occurred");
                  }
                }
                setLoading(false);
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

AdminDashboard.displayName = 'AdminDashboard';
