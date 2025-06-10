"use client";

import Image from "next/image";
import { SellerDashboardMediaProductSection } from "./seller-dashboard-media-product-section";
import { displayAddProductSectionStore } from "../store/displayAddProductSection";

export const SellerDashboardAddProductSection = () => {
  const displayAddProductSection = displayAddProductSectionStore(
    (state: any) => state.displayAddProductSection
  );

  const updateVisibility = displayAddProductSectionStore(
    (state: any) => state.updateDisplayAddProductSectionStore
  );

  const handleDisplaySellerDashboardMainSection=()=>{
    updateVisibility(false);
    
  }

  if (displayAddProductSection) {
    return (
      <div className="flex flex-col items-center mx-[1rem] pt-[1rem]">
        {/* Add Product header section */}
        <div className="w-[98%] flex justify-between">
          {/* Following div consist of left arrow image and title */}
          <div className="flex items-center gap-4">
            {/* Left Arrow Image */}
            <button
              className="relative h-[1.5rem] w-[1.5rem]"
              onClick={handleDisplaySellerDashboardMainSection}
            >
              <Image
                src="/assets/images/AddProductSectionImages/leftarrow.svg"
                alt="laftarrow"
                fill
              />
            </button>

            <div>
              <div className="text-[2rem] font-semibold">Add Product</div>
              <div className="text-[1.1875rem] text-[#8C8C8C] leading-4">
                Create the product listing
              </div>
            </div>
          </div>

          {/* Following div consist of Cancle and Publish Product Button */}
          <div className="flex items-center gap-5">
            <button className="rounded-[0.625rem] h-[3.1875rem] w-[10rem] border-[1.5px] border-[#CBD0D3] bg-white flex justify-center items-center gap-4">
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image
                  src="/assets/images/AddProductSectionImages/cancelIcon.svg"
                  alt="publishProductIcon"
                  fill
                />
              </div>
              <div>Cancel</div>
            </button>

            <button className="rounded-[0.625rem] h-[3.1875rem] w-[14.5rem] bg-[#56A430] flex justify-center items-center gap-4">
              <div className="relative h-[1.5rem] w-[1.5rem]">
                <Image
                  src="/assets/images/AddProductSectionImages/publishProductIcon.svg"
                  alt="publishProductIcon"
                  fill
                />
              </div>
              <p className="text-white">Publish Product</p>
            </button>
          </div>
        </div>

        {/* Add Product Bottom div */}
        <div className="w-[98%] flex justify-between pt-[1rem]">
          {/* Following div consist of Business Information section and Media Section  */}
          <div>
            {/* Business Information section */}
            <div className="w-[41rem] h-max p-6 bg-white rounded-xl">
              {/* Heading */}
              <div className="w-[22.08575rem] mb-1.5">
                <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
                  Business Information
                </h1>
              </div>
              {/* Subheading */}
              <div className="mb-6">
                <p className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium leading-[1.54375rem]">
                  Add the basic information about your product
                </p>
              </div>
              {/* Product Name */}
              <div className="mb-2">
                <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                  Product Name<span className="text-[#FF4B4B]"> *</span>
                </label>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="e.g. Monstera Deliciosa"
                  className="w-[37.0625rem] h-[3.1875rem] rounded-[0.625rem] border border-[#CBD0D3] bg-white 
            placeholder:text-[#697F75] placeholder:font-[Poppins] placeholder:text-[1.22669rem] placeholder:font-normal px-4"
                />
              </div>
              {/* Price & Compare-at Price */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Price */}
                <div className="grid gap-2">
                  <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                    Price<span className="text-[#FF4B4B]"> *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="$ 0.00"
                      className="w-full h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
                text-[#697F75] text-[1.22669rem] font-poppins font-normal pl-4 pr-10"
                    />
                    <Image
                      src="/assets/images/productSectionImages/upDownIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Compare-at Price */}
                <div className="grid gap-2">
                  <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                    Compare-at Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="$ 0.00"
                      className="w-full h-[3.1875rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
                text-[#697F75] text-[1.22669rem] font-poppins font-normal pl-4 pr-10"
                    />
                    <Image
                      src="/assets/images/productSectionImages/upDownIcon.svg"
                      alt="icon"
                      width={20}
                      height={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="grid gap-2 mb-4">
                <label className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
                  Description<span className="text-[#FF4B4B]"> *</span>
                </label>
                <textarea
                  placeholder="Describe your product in detail..."
                  className="w-full min-h-[6rem] rounded-[0.625rem] border-[1.5px] border-[#CBD0D3] bg-white 
            text-[#697F75] text-[1.22669rem] font-poppins font-normal px-4 py-2"
                ></textarea>
              </div>
            </div>

            {/* Media Section */}
            <SellerDashboardMediaProductSection />
          </div>

          {/* Organization,Status & Visibility Section */}
          <div className="flex flex-col gap-5">
            {/* Organization Section */}
            <div className="h-[30.8125rem] w-[19.875rem] bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col">
              <div className="flex flex-col gap-12">
                <div className="text-[2rem] font-semibold">Organization</div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-[1.22669rem]">Collection</div>
                    <div className="h-[3.1875rem] w-[15.9375rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-between">
                      <div className="text-[1.22669rem] ml-3">
                        Select collection
                      </div>
                      <div className="relative h-[1.5rem] w-[1.5rem] mr-3">
                        <Image
                          src="/assets/images/AddProductSectionImages/dropdownIcon.svg"
                          alt="dropdownIcon"
                          fill
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-[1.22669rem]">Category</div>
                    <div className="h-[3.1875rem] w-[15.9375rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-between">
                      <div className="text-[1.22669rem] ml-3">
                        Select category
                      </div>
                      <div className="relative h-[1.5rem] w-[1.5rem] mr-3">
                        <Image
                          src="/assets/images/AddProductSectionImages/dropdownIcon.svg"
                          alt="dropdownIcon"
                          fill
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-[1.22669rem]">Tags</div>
                    <div className="flex gap-2">
                      <div className="h-[3.1875rem] w-[13rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center">
                        <p className="ml-3">Add tag</p>
                      </div>
                      <div className="h-[3.1875rem] w-[2.375rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex justify-center items-center">
                        <div className="relative h-[1.5rem] w-[1.5rem]">
                          <Image
                            src="/assets/images/AddProductSectionImages/addTagIcon.svg"
                            alt="addTagIcon"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Visibility Section */}
            <div className="h-[21.125rem] w-[19.875rem] bg-white rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col gap-5 ">
              <div className="text-[2rem] font-semibold">
                Status & Visibility
              </div>
              <div>
                <div className="text-[1.22669rem]">Visibility *</div>
                <div className="h-[3.1875rem] w-[15.9375rem] border-[1.5px] border-[#CBD0D3] rounded-[0.625rem] flex items-center justify-between">
                  <div className="text-[1.22669rem] ml-3">Public</div>
                  <div className="relative h-[1.5rem] w-[1.5rem] mr-3">
                    <Image
                      src="/assets/images/AddProductSectionImages/dropdownIcon.svg"
                      alt="dropdownIcon"
                      fill
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <input className="h-[1.25rem] w-[1.25rem]" type="checkbox" />
                </div>
                <div className="w-[10.5rem] h-[3.625rem] text-[1.2rem] ml-2">
                  Mark as featured product
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
