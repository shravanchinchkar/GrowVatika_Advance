"use client";
import Image from "next/image";
import { useSellerDataStore } from "@repo/shared-store";
import { useActiveSellerDashboardSideBar } from "@repo/shared-store";
import { useDisplayAddProductSectionStore } from "@repo/shared-store";

export const SellerDashboardWelcomeMsg = ({
  nurseryName,
}: {
  nurseryName: string;
}) => {
  // Following is the zustan state management code
  const updatedisplayAddProductSection = useDisplayAddProductSectionStore(
    (state: any) => state.updateDisplayAddProductSectionStore
  );

  const updateActiveSideBar = useActiveSellerDashboardSideBar(
    (state: any) => state.updateActiveSideBar
  );

  const handleDisplayAddProductSection = () => {
    updatedisplayAddProductSection(true);
    updateActiveSideBar("products");
  };
  
  const sellerData = useSellerDataStore((state) => state.sellerData);

  return (
    <div className=" w-[100%] lg:p-[1rem] xl:p-6 flex flex-col lg:gap-[0.5rem] xl:gap-[1rem] bg-custom-bg rounded-[1.25rem] lg:h-[8rem] xl:h-[9.313rem]">
      <div className="lg:w-[85%] xl:w-[100%] lg:leading-[1.7rem] text-white font-bold lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] capitalize font-[Unbounded]">
        {`Welcome back, ${nurseryName} !`}
      </div>

      <div className="flex justify-between items-center lg:m-0 xl:mt-2">
        {/* following div consist of Daily summary of the nursery  */}
        <div className="text-[#CBD0D3] w-[29.375rem] lg:text-[1rem] xl:text-[1.25rem] font-medium leading-[1.625rem] font-[Poppins]">
          {`No Daily Summary Message to display`}
        </div>

        <button
          className={`lg:w-[9.5rem] lg:h-[2.5rem] xl:w-[14.1875rem] xl:h-[3.1875rem] rounded-[0.625rem] bg-white text-[#697F75] lg:text-[1rem] xl:text-[1.2267rem] capitalize font-[Poppins] font-normal text-center leading-normal shrink-0 flex justify-center items-center gap-[0.5rem] animate-bg-bounce-in ${sellerData.nurseryBio === null ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={sellerData.nurseryBio === null ? true : false}
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
