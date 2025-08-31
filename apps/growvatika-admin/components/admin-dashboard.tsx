"use client";
import axios from "axios";
import { Header } from "./header";
import { useSession } from "next-auth/react";
import { NurseriesList } from "./nurseries-list";
import { TApiResponse } from "@repo/common-types";
import { useCountOfNurseries } from "@repo/shared-store";
import { memo, useEffect, useReducer, useState } from "react";
import { useAdminNurseryDataStore } from "@repo/shared-store";

type AdminDashboardType = {
  activeNurseryType: string;
  error: string;
  loading: boolean;
};

const reducer = (
  state: AdminDashboardType,
  action: any
): AdminDashboardType => {
  switch (action.type) {
    case "SET_LOADING_TRUE":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        error: action.payload.error,
      };
    case "ERROR":
      return { ...state, error: action.payload.error };
    case "SET_LOADING_FALSE":
      return { ...state, loading: false };
    case "SET_ACTIVE_NURSERY_TYPE":
      return { ...state, activeNurseryType: action.payload.activeNurseryType };
    default:
      return state;
  }
};

export const AdminDashboard = memo(() => {
  const session = useSession();
  const adminName: string = session?.data?.user.name || "";

  // Following is the useReducer hook
  const [state, dispatch] = useReducer<AdminDashboardType, any>(reducer, {
    activeNurseryType: "Approved Nurseries",
    error: "",
    loading: true,
  });

  // Following is the zustand state
  const { setNurseriesData } = useAdminNurseryDataStore();
  const { countOfNurseries, setCountOfNurseries } = useCountOfNurseries();

  const FilterButtonName = [
    "New Nurseries",
    "Approved Nurseries",
    "Suspended Nurseries",
    "Removed Nurseries",
  ];

  //  call to the backend
  useEffect(() => {
    const getNurseriesData = async () => {
      try {
        let res;
        dispatch({ type: "SET_LOADING_TRUE" });
        if (state.activeNurseryType === "New Nurseries") {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${false}&isSuspended=${false}&isRemoved=${false}`
          );
        } else if (state.activeNurseryType === "Approved Nurseries") {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${true}&isSuspended=${false}&isRemoved=${false}`
          );
        } else if (state.activeNurseryType === "Removed Nurseries") {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${true}&isSuspended=${true}&isRemoved=${true}`
          );
        } else {
          res = await axios.get(
            `/api/admin/getnurseriesdata?isAdminVerified=${true}&isSuspended=${true}&isRemoved=${false}`
          );
        }

        const temp: TApiResponse = res.data;
        if (temp.success && temp.adminNurseriesData && temp.countOfNurseries) {
          setNurseriesData(temp.adminNurseriesData);
          setCountOfNurseries(temp.countOfNurseries);
          dispatch({
            type: "FETCH_SUCCESS",
            payload: {
              error: "",
            },
          });
        } else if (!temp.success && temp.error) {
          dispatch({
            type: "ERROR",
            payload: {
              error: temp.error,
            },
          });
        } else {
          setNurseriesData([]);
          dispatch({ type: "ERROR", payload: { error: "" } });
        }
        dispatch({ type: "SET_LOADING_FALSE" });
      } catch (error) {
        console.log("Error fetching nurseries data:", error);
        // Handle axios errors
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error) {
            console.log(
              "error.response.data.error:",
              error.response.data.error
            );
            dispatch({
              type: "ERROR",
              payload: { error: error.response.data.error },
            });
          } else {
            dispatch({
              type: "ERROR",
              payload: { error: error.message },
            });
          }
        } else {
          dispatch({
            type: "ERROR",
            payload: { error: "An unexpected error occurred" },
          });
        }
        dispatch({ type: "SET_LOADING_FALSE" });
      }
    };
    getNurseriesData();
  }, [setNurseriesData, state.activeNurseryType]);

  const filterButtonStyle =
    "flex justify-around items-center bg-[#FFFFFF] w-[20%] text-[1.22669rem] text-[#171717] font-medium rounded-[0.3125rem] capitalize outline-none";

  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-[1rem] items-center pt-[1rem]">
      <Header />
      <h1 className="font-unbounded text-[2rem]">{`Welcome, Admin ${adminName}.`}</h1>
      <div className="w-[95%] h-[10%]  flex justify-between font-poppins">
        {FilterButtonName.map((item, index) => {
          return (
            <button
              key={index}
              className={`${filterButtonStyle} ${state.activeNurseryType === item && "shadow-admindashboard-button-boxShadow"} ${state.loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                dispatch({
                  type: "SET_ACTIVE_NURSERY_TYPE",
                  payload: {
                    activeNurseryType: item,
                  },
                });
              }}
              disabled={state.loading}
            >
              {item}
              <div
                className={`w-[1.8rem] h-[1.8rem] rounded-full flex justify-center items-center ${index === 0 ? "bg-orange-500" : index === 1 ? "bg-[#56A430]" : index === 2 ? "bg-yellow-500" : "bg-[#FF4B4B]"} text-[1rem] text-[#FFFFFF] font-medium`}
              >
                {index === 0
                  ? countOfNurseries.newNurseries
                  : index === 1
                    ? countOfNurseries.approvedNurseries
                    : index === 2
                      ? countOfNurseries.suspendedNurseries
                      : countOfNurseries.removedNurseries}
              </div>
            </button>
          );
        })}
      </div>
      <NurseriesList
        loading={state.loading}
        error={state.error}
        removedNurseries={countOfNurseries.removedNurseries}
        activeNurseryType={state.activeNurseryType}
      />
    </div>
  );
});

AdminDashboard.displayName = "AdminDashboard";
