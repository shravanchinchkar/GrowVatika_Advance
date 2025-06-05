import Image from "next/image";
export const BusinessInfoCard = () => {
  const Specialties = ["Indoor Plants", "Gardening tools", "Rare Plants"];
  return (
    <div className="w-[100%] rounded-[1.25rem] border-[1px] border-[#E5E5E5] bg-white p-[1.5rem] shadow-md flex flex-col gap-[1rem]">
      {/* Card Title and Edit Button */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[#171717] font-[Poppins] text-[1.5rem] font-semibold leading-[1.5rem]">
            Business Information
          </h1>
          <p className="text-[#8C8C8C] font-[Poppins] text-[1rem] font-medium leading-[2em]">
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
            <p className="w-[34rem] text-[#8C8C8C] font-[Poppins] text-[1rem] font-medium leading-normal">
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

      {/* Following div consist of business detail information */}
      <div className="border-t-[0.0625rem] pt-[2rem]">
        {/* Business Details Grid */}
        <div className="grid grid-cols-2 gap-y-[1.5rem] gap-x-14 text-[1rem]">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
              <Image
                src="/assets/images/BusinessInformationImage/addressIcon.svg"
                alt="address"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[#171717] font-[Poppins] font-medium">
                Address
              </p>
              <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                2134 Green Street, Shivajinagar, Pune
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
              {" "}
              <Image
                src="/assets/images/BusinessInformationImage/phone.svg"
                alt="phone"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[#171717] font-[Poppins] font-medium">Phone</p>
              <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                (989) 555-1234
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
              <Image
                src="/assets/images/BusinessInformationImage/emailIcon.svg"
                alt="email"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[#171717] font-[Poppins] font-medium">Email</p>
              <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                2134 Green Street, Shivajinagar, Pune
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-4">
            <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
              <Image
                src="/assets/images/BusinessInformationImage/bussinessHourIcon.svg"
                alt="business hours"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[#171717] font-[Poppins] font-medium">
                Business Hours
              </p>
              <p className="text-[#8C8C8C] font-[Poppins] font-normal">
                Mon–Sat: 9AM–6PM, Sun: 10AM–4PM
              </p>
            </div>
          </div>

          {/* Location - Full width */}
          <div className="col-span-2 flex items-start gap-4">
            <div className="w-[1.5rem] h-[1.5rem] flex-shrink-0 relative">
              <Image
                src="/assets/images/BusinessInformationImage/locationIcon.svg"
                alt="location"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[#171717] font-[Poppins] font-medium">
                Location (Google Map Link)
              </p>
              <p className="text-[#8C8C8C] font-[Poppins] font-normal underline break-all">
                https://maps.app.goo.gl/YB7Sfq5u6bTvTiHh9https://maps.app.goo.gl/YB7Sfq5u6bTvTiHh9
              </p>
            </div>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="mt-6">
          <p className="text-[#171717] font-[Poppins] text-[1.2rem] font-semibold leading-[1.95rem]">
            Specialties
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-[1rem] mt-2 text-[1.2rem]">
          {Specialties.map((items, index) => {
            return (
              <button
                className="w-[10.46094rem] min-h-[3.0625rem] max-h-max flex-shrink-0 border border-[#56A430] rounded-full text-[#56A430] text-center font-[Poppins] font-medium"
                key={index}
              >
                {items}
              </button>
            );
          })}

          <button className="w-[10.46094rem] h-[3.0625rem] flex items-center justify-center gap-2 border border-[#56A430] rounded-full">
            <div className="w-[1.5rem] h-[1.5rem] relative flex-shrink-0">
              <Image
                src="/assets/images/BusinessInformationImage/addMoreIcon.svg"
                alt="business hours"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[#6CE530] text-center font-[Poppins] text-[1.22669rem] font-medium not-italic leading-none">
              Add more
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
