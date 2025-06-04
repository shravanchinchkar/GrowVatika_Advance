import Image from "next/image";
export const BusinessInfoCard = () => {
  return (
    <div className="w-[100%] h-[12.625rem] rounded-[1.25rem] border-2 border-[#E5E5E5] bg-white p-[1rem] shadow-md flex flex-col gap-[0.5rem]">
      {/* Card Title and Edit Button */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[#171717] font-[Poppins] text-[1.7rem] font-semibold leading-[2.6rem]">
            Business Information
          </h1>
          <p className="text-[#8C8C8C] font-[Poppins] text-[1.1rem] font-medium leading-[1.54375rem]">
            This information is displayed on your public store page
          </p>
        </div>
        <button className="w-[7.875rem] h-[3.1875rem] flex justify-center items-center gap-[1rem] px-4 py-2 rounded-[1.25rem] border-[#CBD0D3] text-[#000000] font-[Poppins] text-[1.3rem] font-normal border-[1.5px] capitalize">
          <div className="w-[1.3rem] h-[1.3rem] relative">
            <Image
              src={"/assets/images/SellerDashboardMainImages/editIcon.svg"}
              alt="editbutton"
              className="object-contain"
              fill
            />
          </div>
          <p>Edit</p>
        </button>
      </div>

      <div className="flex justify-between items-center">
        {/* Profile Picture,Nursery Name,description */}
        <div className="flex items-center gap-4">
          <div className="w-[6.363rem] h-[6.363rem] rounded-full bg-center bg-cover relative">
            <Image
              src={
                "/assets/images/SellerDashboardMainImages/businessInfoProfile.svg"
              }
              alt="profilepicture"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-[#171717] font-[Poppins] text-[1.2rem] font-semibold leading-[1.966rem]">
              Evergreen Gardens
            </p>
            <p className="w-[34rem] text-[#8C8C8C] font-[Poppins] text-[1rem] font-medium leading-normal">
              Family-owned nursery specializing in rare indoor plants,
              succulents, and gardening supplies with expert advice.
            </p>
          </div>
        </div>

        <div className="w-[6.5rem] h-[3.1875rem] flex justify-center items-center gap-2 px-4 py-2 bg-[#123524] text-white rounded-[1.26rem]">
          <div className="w-[1.375rem] h-[1.375rem] relative">
            <Image
              src={"/assets/images/SellerDashboardMainImages/ratingIcon.svg"}
              alt="starIcon"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[Poppins] text-[1.22669rem] font-medium uppercase">
            4.5
          </span>
        </div>
      </div>
    </div>
  );
};
