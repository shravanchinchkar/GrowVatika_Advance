import Image from "next/image";

export const SellerDashboardMediaProductSection = () => {
  return (
    <div className="w-[41rem] h-auto p-6 bg-white rounded-xl mt-5">
      {/* Media Heading */}
      <div className="w-[22.08575rem] mb-1.5">
        <h1 className="text-[#171717] font-[Poppins] text-[2rem] font-semibold leading-[2.6rem]">
          Media
        </h1>
      </div>

      {/* Subheading */}
      <div className="mb-6">
        <p className="text-[#8C8C8C] font-[Poppins] text-[1.1875rem] font-medium leading-[1.54375rem]">
          Add photos of your product
        </p>
      </div>

      {/* Upload Section */}
      <div className="w-[37.0625rem] h-[24.125rem] flex-shrink-0 rounded-[0.625rem] border-[1.5px] border-dashed border-[#CBD0D3] bg-white flex flex-col items-center justify-center px-6 py-4 space-y-4">
        {/* Icon Box */}
        <div className="w-[3.3125rem] h-[3.25rem] flex-shrink-0 rounded-[1.25rem] bg-[#EDF2E5] flex items-center justify-center">
          <Image
            src="/assets/images/SellerDashboardMediaImages/addMediaImageIcon.svg"
            alt="upload icon"
            width={25} // ~1.53325rem
            height={24} // ~1.5rem
          />
        </div>

        {/* Upload Title */}
        <div>
          <h3 className="text-[#171717] text-center font-[Poppins] text-[1.22669rem] font-medium">
            Upload Product Images
          </h3>
        </div>

        {/* Upload Subtext */}
        <div>
          <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-medium">
            Drag and drop your images here, or click to browse
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <button className="w-[14.5rem] h-[3.1875rem] flex items-center justify-center gap-3 rounded-[0.625rem] bg-[#56A430] text-white text-center font-[Poppins] text-[1.22669rem] font-normal capitalize">
            <Image
              src="/assets/images/SellerDashboardMediaImages/uploadImageIcon.svg"
              alt="upload icon"
              width={20}
              height={20}
              className="mt-[2px]"
            />
            Upload Images
          </button>
        </div>

        {/* File Format Note */}
        <div>
          <p className="text-[#697F75] text-center font-[Poppins] text-[0.9375rem] font-normal">
            Supported formats: JPEG, PNG, WebP. Max size: 5MB per image.
          </p>
        </div>
      </div>
    </div>
  );
};
