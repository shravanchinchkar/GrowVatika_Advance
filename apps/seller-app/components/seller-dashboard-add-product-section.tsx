import Image from "next/image";

export const SellerDashboardAddProductSection = () => {
  return (
    <div className="flex flex-col items-center mx-[1rem] pt-[1rem]">
      {/* Add Product head section */}
      <div className="w-[98%] flex justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-[1.5rem] w-[1.5rem]">
            <Image
              src="/assets/images/AddProductSectionImages/leftarrow.svg"
              alt="laftarrow"
              fill
            />
          </div>
          <div>
            <div className="text-[2rem] font-semibold">Add Product</div>
            <div className="text-[1.1875rem] text-[#8C8C8C] leading-4">
              Create the product listing
            </div>
          </div>
        </div>

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
            <div className="text-white">Publish Product</div>
          </button>
        </div>
      </div>

      {/* Bottom View */}
      <div className="flex pt-[1rem]">
        {/* Business Information */}
        <div></div>

        {/* Organization and Status & Visibility*/}
        <div className="flex flex-col gap-5">
          {/* Organization */}
          <div className="h-[30.8125rem] w-[19.875rem] bg-white border-[2px] rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col">
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

          {/* Status & Visibility */}
          <div className="h-[21.125rem] w-[19.875rem] bg-white border-[2px] rounded-[1.25rem] pl-[2rem] pt-[1.5rem] flex flex-col gap-5">
            <div className="text-[2rem] font-semibold">Status & Visibility</div>
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
              <div className="text-[1.22669rem] ml-2">
                Mark as featured product
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
