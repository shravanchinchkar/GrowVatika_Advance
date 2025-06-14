"use client";
import Image from "next/image";
import { activeSideBarStore } from "../store/activeSideBar";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardWelcomeMsg = ({
  nurseryName,
}: {
  nurseryName: string;
}) => {
  // Following is the zustan state management code
  const updatedisplayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.updateDisplayAddProductSectionStore
  );

  const updateActiveSideBar = activeSideBarStore(
    (state: any) => state.updateActiveSideBar
  );
  const handleDisplayAddProductSection = () => {
    updatedisplayAddProductSection(true);
    updateActiveSideBar("products");
  };
  return (
    <div className="p-6 bg-custom-bg rounded-[1.25rem] h-[9.313rem] w-[100%]">
      <div className="text-white font-bold text-[2rem] capitalize font-[Unbounded]">
        {`Welcome back,${nurseryName}`}
      </div>

      <div className="flex justify-between items-center mt-2">
        {/* following div consist of Daily summary of the nursery  */}
        <div className="text-white w-[29.375rem] text-[1.25rem] font-medium leading-[1.625rem] font-[Poppins]">
          {`No Daily Summary Message to display`}
        </div>

        <button
          className="w-[14.1875rem] h-[3.1875rem] rounded-[0.625rem] bg-white text-[#697F75] text-[1.2267rem] capitalize font-[Poppins] font-normal text-center leading-normal shrink-0 flex justify-center items-center gap-[0.5rem] animate-bg-bounce-in"
          onClick={handleDisplayAddProductSection}
        >
          <div className="relative w-[1.5rem] h-[1.5rem]">
            <Image
              src={
                "/assets/images/SellerDashboardMainImages/addProductIcon.svg"
              }
              alt="plussign"
              className="object-cover"
              fill
            />
          </div>
          <h2>Add Product</h2>
        </button>
      </div>
    </div>
  );
};
