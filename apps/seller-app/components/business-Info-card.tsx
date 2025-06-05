import Image from "next/image";
export const BusinessInfoCard = () => {
  return (
    <div className="w-[100%] rounded-[1.25rem] border-[1px] border-[#E5E5E5] bg-white p-[1rem] shadow-md flex flex-col gap-[1rem]">
      {/* Card Title and Edit Button */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[#171717] font-[Poppins] text-[1.5rem] font-semibold leading-[1.5rem]">
            Business Information
          </h1>
          <p className="text-[#8C8C8C] font-[Poppins] text-[1rem] font-medium leading-[1.5em]">
            This information is displayed on your public store page
          </p>
        </div>
        <button className="w-[6.875rem] h-[3.1875rem] flex justify-center items-center gap-[1rem] px-4 py-2 rounded-[1.25rem] border-[#CBD0D3] text-[#000000] font-[Poppins] text-[1.3rem] font-normal border-[1.5px] capitalize">
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

      {/* Following div consist of Profile Picture,Nursery Name,description and Rating Section */}
      <div className="flex justify-between items-center">
        {/* Profile Picture,Nursery Name,description */}
        <div className="flex items-center gap-4">
          <div className="w-[4.363rem] h-[4.363rem] rounded-full bg-center bg-cover relative">
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
            <p className="w-[34rem] text-[#8C8C8C] font-[Poppins] text-[0.9rem] font-medium leading-normal">
              Family-owned nursery specializing in rare indoor plants,
              succulents, and gardening supplies with expert advice.
            </p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="w-[6rem] h-[3rem] flex justify-center items-center gap-2 px-4 py-2 bg-[#123524] text-white rounded-[1.26rem]">
          <div className="w-[1.2rem] h-[1.2rem] relative">
            <Image
              src={"/assets/images/SellerDashboardMainImages/ratingIcon.svg"}
              alt="starIcon"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-[Poppins] text-[1.1rem] font-medium uppercase">
            4.5
          </span>
        </div>
      </div>

      <div>
        Hello
      </div>
    </div>
  );
};
