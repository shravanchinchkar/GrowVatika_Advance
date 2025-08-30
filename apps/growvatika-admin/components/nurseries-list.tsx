import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { memo, useState } from "react";
import Skeleton from "@repo/ui/loading";
import { TApiResponse } from "@repo/common-types";
import { toastStyle } from "@repo/shared/utilfunctions";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import { useAdminNurseryDataStore } from "@repo/shared-store";

type TNurseriesList = {
  loading: boolean;
  error: string;
  removedNurseries: number;
  activeNurseryType: string;
};

type TNurseryId = {
  launchingNurseryId: string;
  suspendingNurseryId: string;
  removingNurseryId: string;
};

export const NurseriesList = memo(
  ({ loading, error, removedNurseries, activeNurseryType }: TNurseriesList) => {
    const { nurseriesData, setNurseriesData } = useAdminNurseryDataStore();
    const [selectedNurseryId, setSelectedNurseryId] = useState<TNurseryId>({
      launchingNurseryId: "",
      suspendingNurseryId: "",
      removingNurseryId: "",
    });

    // Approve Nursery
    const handleApproveNursery = async (
      e: React.MouseEvent<HTMLButtonElement>,
      nurseryId: string,
      tag: string
    ) => {
      console.log("tag:", tag);
      try {
        e.preventDefault();
        setSelectedNurseryId({
          ...selectedNurseryId,
          launchingNurseryId: nurseryId,
        });
        const res = await axios.patch(
          `/api/admin/actiononnursery?nurseryId=${nurseryId}&tag=${tag}`
        );
        const tempData: TApiResponse = res.data;

        if (tempData.success) {
          const updatedNurseryData = nurseriesData.filter((nursery) => {
            return nursery.id !== nurseryId;
          });
          setNurseriesData(updatedNurseryData);
          toast.success("Nursery approved by admin!", toastStyle);
        }
      } catch (error) {
        console.error("Error while approving nursery", error);
        toast.error("Error while approving nursery", toastStyle);
      }
      setSelectedNurseryId({
        ...selectedNurseryId,
        launchingNurseryId: "",
      });
    };

    // Suspend Nursery
    const handleSuspendNursery = async (
      e: React.MouseEvent<HTMLButtonElement>,
      nurseryId: string,
      tag: string
    ) => {
      e.preventDefault();
      try {
        setSelectedNurseryId({
          ...selectedNurseryId,
          suspendingNurseryId: nurseryId,
        });
        const res = await axios.patch(
          `/api/admin/actiononnursery?nurseryId=${nurseryId}&tag=${tag}`
        );
        const tempData: TApiResponse = res.data;
        if (tempData.success) {
          const updatedNurseryData = nurseriesData.filter((nursery) => {
            return nursery.id !== nurseryId;
          });
          setNurseriesData(updatedNurseryData);
          toast.success("Nursery Suspended by admin!", toastStyle);
        }
      } catch (error) {
        console.error("Error while suspending nursery", error);
        toast.error("Error while suspending nursery", toastStyle);
      }
      setSelectedNurseryId({
        ...selectedNurseryId,
        suspendingNurseryId: "",
      });
    };

    const handleRemoveNursery = async (
      e: React.MouseEvent<HTMLButtonElement>,
      nurseryId: string,
      tag: string
    ) => {
      e.preventDefault();
      try {
        setSelectedNurseryId({
          ...selectedNurseryId,
          removingNurseryId: nurseryId,
        });
        const res = await axios.patch(
          `/api/admin/actiononnursery?nurseryId=${nurseryId}&tag=${tag}`
        );
        const tempData: TApiResponse = res.data;
        if (tempData.success) {
          const updatedNurseryData = nurseriesData.filter((nursery) => {
            return nursery.id !== nurseryId;
          });
          setNurseriesData(updatedNurseryData);
          toast.success("Nursery Removed by admin!", toastStyle);
        }
      } catch (error) {
        console.error("Error while removing nursery", error);
        toast.error("Error while removing nursery", toastStyle);
      }
      setSelectedNurseryId({
        ...selectedNurseryId,
        removingNurseryId: "",
      });
    };

    if (loading) {
      return <Skeleton />;
    }
    if (error || nurseriesData.length === 0) {
      return (
        <div className="w-[100%] h-[95%] flex justify-center items-start pt-[10rem] text-[#CBD0D3] uppercase text-[1.5rem]">
          {error}
        </div>
      );
    }
    return (
      <div className="relative w-[95%] h-[80%] rounded-[1.25rem] flex flex-col font-poppins bg-[#FFFFFF] shadow-admindashboard-button-boxShadow mb-[1rem] overflow-y-scroll">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FFFFFF] w-[100%] flex border-b-[1px] border-[#0000001A] text-[1.22669rem] text-[#697F75] font-medium capitalize text-center">
          <h1
            className={`${
              activeNurseryType !== "Removed Nurseries" && removedNurseries > 0
                ? "w-[70%] border-r-[1px] border-[#0000001A]"
                : "w-[100%]"
            } p-[0.7rem] flex justify-center items-center`}
          >
            Nursery Details
          </h1>
          {activeNurseryType !== "Removed Nurseries" &&
            removedNurseries >= 0 && (
              <>
                <h1 className="w-[10%] p-[0.7rem] flex justify-center items-center border-r-[1px] border-[#0000001A]">
                  Launch Nursery
                </h1>
                <h1 className="w-[10%] p-[0.7rem] flex justify-center items-center border-r-[1px] border-[#0000001A]">
                  Stop Nursery
                </h1>
                <h1 className="w-[10%] p-[0.7rem] flex justify-center items-center">
                  Remove Nursery
                </h1>
              </>
            )}
        </div>
        {/* Nursery Content*/}
        {nurseriesData.map((nursery) => {
          return (
            <Link
              href={`/adminpanel/${nursery.id}`}
              key={nursery.id}
              className="w-[100%] flex border-b-[1px] border-[#0000001A]"
            >
              {/* Nursery Image and content */}
              <div className={`w-[70%] min-h-[35%] max-h-max flex items-center justify-between pl-[1.5rem] py-[0.5rem]  cursor-pointer ${activeNurseryType !== "Removed Nurseries" && removedNurseries > 0 ?"border-r-[1px] border-[#0000001A]":""}`}>
                {/* Nursery Image */}
                <div className="relative w-[15%] h-[80%] rounded-[100%] overflow-hidden">
                  <Image
                    src={
                      nursery.profilePictureURL
                        ? nursery.profilePictureURL
                        : "/assets/images/Common/ImagePlaceholder2.png"
                    }
                    alt="image_placeholder"
                    className="object-cover"
                    fill
                  />
                </div>
                {/* Nursery Details */}
                <div className="w-[80%] h-[100%] grid grid-cols-[25%_75%] text-[1.22669rem] text-[#171717]">
                  <div className="flex flex-col capitalize">
                    <h2>Owner Name:</h2>
                    <h2>Mobile Number:</h2>
                    <h2>Business Email:</h2>
                    <h2>Nursery Name:</h2>
                    <h2>City:</h2>
                    {nursery.isSuspended ? (
                      <h2>suspended By:</h2>
                    ) : (
                      <h2>approved By:</h2>
                    )}
                  </div>
                  <div className="flex flex-col font-medium">
                    <h1>
                      {nursery.fullName === ""
                        ? "Not Available"
                        : nursery.fullName}
                    </h1>
                    <h1>{`+91 ${nursery.phoneNumber}`}</h1>
                    <h1>{nursery.email}</h1>
                    <h1>{nursery.nurseryName}</h1>
                    <h1>{nursery.address}</h1>
                    <h1
                      className={`${nursery.adminName !== "" && "text-[#56A430] font-medium"}`}
                    >
                      {nursery.adminName === ""
                        ? "Not Available"
                        : nursery.adminName}
                    </h1>
                  </div>
                </div>
              </div>

              {activeNurseryType !== "Removed Nurseries" &&
                removedNurseries > 0 && (
                  <>
                    {/* Launch Nursery Button */}
                    <div className="w-[10%] flex justify-center items-center border-r-[1px] border-[#0000001A] outline-none">
                      <button
                        className={`w-[85%] h-[35%] rounded-[5.26619rem] border-[1.5px] border-[#CBD0D3] text-[1.23044rem] bg-[#56A430] text-[#FFFFFF] outline-none ${nursery.isAdminVerified && !nursery.isSuspended ? "cursor-not-allowed" : selectedNurseryId.launchingNurseryId === nursery.id ? "bg-[#123524] cursor-not-allowed" : "cursor-pointer hover:bg-[#123524] hover:font-semibold"}`}
                        onClick={(e) => {
                          handleApproveNursery(e, nursery.id, "launch");
                        }}
                        disabled={
                          (nursery.isAdminVerified && !nursery.isSuspended) ||
                          selectedNurseryId.launchingNurseryId !== ""
                        }
                      >
                        {selectedNurseryId.launchingNurseryId === nursery.id ? (
                          <ButtonLoadingSign />
                        ) : (
                          "Launch"
                        )}
                      </button>
                    </div>

                    {/* Stop Nursery Button */}
                    <div className="w-[10%] flex items-center justify-center border-r-[1px] border-[#0000001A] outline-none">
                      <button
                        className={`w-[85%] h-[35%] rounded-[5.26619rem] border-[1.5px] border-[#CBD0D3] text-[1.23044rem] bg-yellow-500 text-[#FFFFFF] outline-none ${
                          nursery.isSuspended
                            ? "cursor-not-allowed"
                            : selectedNurseryId.suspendingNurseryId ===
                                nursery.id
                              ? "bg-yellow-700 cursor-not-allowed"
                              : selectedNurseryId.suspendingNurseryId == ""
                                ? "cursor-pointer hover:bg-yellow-700 hover:font-semibold"
                                : "cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          handleSuspendNursery(e, nursery.id, "suspend");
                        }}
                        disabled={
                          (nursery.isAdminVerified && nursery.isSuspended) ||
                          selectedNurseryId.suspendingNurseryId !== ""
                        }
                      >
                        {selectedNurseryId.suspendingNurseryId ===
                        nursery.id ? (
                          <ButtonLoadingSign />
                        ) : (
                          "Stop"
                        )}
                      </button>
                    </div>

                    {/* Remove Nursery Button */}
                    <div className="w-[10%] flex items-center justify-center outline-none">
                      <button
                        className={`w-[85%] h-[35%] rounded-[5.26619rem] border-[1.5px] border-[#CBD0D3] text-[1.23044rem] bg-[#FF4B4B] text-[#FFFFFF] outline-none ${
                          nursery.isRemoved
                            ? "cursor-not-allowed"
                            : selectedNurseryId.removingNurseryId === nursery.id
                              ? "bg-red-800 cursor-not-allowed"
                              : selectedNurseryId.removingNurseryId == ""
                                ? "cursor-pointer hover:bg-red-800 hover:font-semibold"
                                : "cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          handleRemoveNursery(e, nursery.id, "remove");
                        }}
                        disabled={
                          (nursery.isAdminVerified &&
                            nursery.isSuspended &&
                            nursery.isRemoved) ||
                          selectedNurseryId.removingNurseryId !== ""
                        }
                      >
                        {selectedNurseryId.removingNurseryId === nursery.id ? (
                          <ButtonLoadingSign />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </>
                )}
            </Link>
          );
        })}
      </div>
    );
  }
);

NurseriesList.displayName = "NurseriesList";
