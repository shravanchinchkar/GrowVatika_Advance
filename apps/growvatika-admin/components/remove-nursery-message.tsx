"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { TApiResponse } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import {
  useAdminNurseryDataStore,
  useCountOfNurseries,
  useRemoveNurseryMessageStore,
} from "@repo/shared-store";
import toast from "react-hot-toast";

export const RemoveNurseryMessage = () => {
  const [loading, setLoading] = useState(false);

  // zustand state
  const { setCountOfNurseries } = useCountOfNurseries();
  const { message, setMessage } = useRemoveNurseryMessageStore();
  const { nurseriesData, setNurseriesData } = useAdminNurseryDataStore();

  const removeNurseryMessage = {
    display: false,
    nurseryId: "",
    nurseryName: "",
    tag: "",
  };

  const handleRemoveNursery = async (
    e: React.MouseEvent<HTMLButtonElement>,
    nurseryId: string,
    tag: string
  ) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/admin/actiononnursery?nurseryId=${nurseryId}&tag=${tag}`
      );
      const tempData: TApiResponse = res.data;
      if (tempData.success && tempData.countOfNurseries) {
        const updatedNurseryData = nurseriesData.filter((nursery) => {
          return nursery.id !== nurseryId;
        });
        setNurseriesData(updatedNurseryData);
        setCountOfNurseries(tempData.countOfNurseries);
        toast.success("Nursery Removed by admin!", toastStyle);
      }
    } catch (error) {
      console.error("Error while removing nursery", error);
      toast.error("Error while removing nursery", toastStyle);
    }
    setLoading(false);
    setMessage(removeNurseryMessage);
  };

  return (
    <div className="absolute top-0 z-20 w-[100%] h-[100%] flex justify-center items-center bg-[#00000040] bg-opacity-10 font-poppins">
      <div className="w-[40%] h-[60%] bg-[#ffffff] rounded-[1.25rem] flex flex-col items-end overflow-hidden animate-slide-in-right">
        {/* Cancle Icon */}
        <button
          className="w-[100%] h-[15%] flex justify-end items-center p-[1rem]"
          onClick={(e) => {
            e.preventDefault();
            setMessage(removeNurseryMessage);
          }}
          disabled={loading}
        >
          <div className="relative new-sm:w-[1rem] new-sm:h-[1rem] new-sm-1:w-[1.2rem] new-sm-1:h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] cursor-pointer">
            <Image
              src="/assets/images/Common/cancelIcon.svg"
              alt="cancle"
              className="object-contain"
              fill
            />
          </div>
        </button>
        <div className="w-[100%] h-[90%] border-t-[1px] border-[#0000001A] flex flex-col justify-around items-center">
          <p className="w-[100%] font-medium text-center text-[1.1rem]">
            Do you want to remove the{" "}
            <span className="underline">{message.nurseryName}</span> Nursery?.
            Onced Removed it cannot be launched again and all its products will
            be discontinued from the growvatika-userapp
          </p>
          <button
            className={`w-[50%] h-[20%] rounded-[5.26619rem] text-[#ffffff] text-[1.23044rem] outline-none ${loading ? "cursor-not-allowed bg-red-500" : "bg-[#FF4B4B] hover:bg-red-500 hover:font-semibold"}`}
            onClick={(e) =>
              handleRemoveNursery(e, message.nurseryId, message.tag)
            }
            disabled={loading}
          >
            {loading ? <ButtonLoadingSign /> : "Remove Nursery"}
          </button>
        </div>
      </div>
    </div>
  );
};
