import Image from "next/image";

export const SellerDashboardAddProductSection = () => {
  return (
    <div className="w-[41rem] h-auto border-[2px] p-6 bg-white rounded-xl">
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
  );
};
