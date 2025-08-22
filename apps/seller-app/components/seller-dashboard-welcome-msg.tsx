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
  const { setVisibilityOfAddProductSection } =
    useDisplayAddProductSectionStore();

  const { setActiveSideBar } = useActiveSellerDashboardSideBar();

  const handleDisplayAddProductSection = () => {
    setVisibilityOfAddProductSection(true);
    setActiveSideBar("products");
  };

  const sellerData = useSellerDataStore((state) => state.sellerData);

  return (
    <div className="w-[100%] md:p-[1rem] xl:p-6 flex flex-col lg:gap-[0.5rem] xl:gap-[1rem] bg-custom-bg rounded-[1.25rem] lg:h-[8rem] xl:h-[9.313rem]">
      <div className="md:w-[85%] xl:w-[100%] lg:leading-[1.7rem] text-white font-bold md:text-[1rem] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] capitalize font-unbounded">
        {`Welcome back, ${nurseryName} !`}
      </div>

      <div className="flex justify-between items-center lg:m-0 xl:mt-2">
        {/* following div consist of Daily summary of the nursery  */}
        <div className="text-[#CBD0D3] w-[29.375rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1.25rem] font-medium leading-[1.625rem] font-poppins">
          {`No Daily Summary Message to display`}
        </div>

        <button
          className={`md:w-[9rem] lg:w-[9.5rem] md:h-[2.5rem] xl:w-[14.1875rem] xl:h-[3.1875rem] rounded-[0.625rem] bg-white text-[#697F75] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.2267rem] capitalize font-poppins font-normal text-center leading-normal shrink-0 flex justify-center items-center gap-[0.5rem] animate-bg-bounce-in ${sellerData.nurseryBio === null ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={sellerData.nurseryBio === null ? true : false}
          onClick={handleDisplayAddProductSection}
        >
          <div className="relative md:w-[1.2rem] md:h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem]">
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
