import Image from "next/image";
export const BusinessInfoSection = () => {
  return (
    <div className="w-full rounded-[0.75rem] border-2 border-[#E5E5E5] bg-white p-6 shadow-md flex flex-col gap-5">

      <div className="border-t-[0.0625rem]"></div>

      {/* Business Details Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-14">
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
            <p className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
              Address
            </p>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1.22669rem] font-normal">
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
            <p className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
              Phone
            </p>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1.22669rem] font-normal">
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
            <p className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
              Email
            </p>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1.22669rem] font-normal">
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
            <p className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
              Business Hours
            </p>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1.22669rem] font-normal">
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
            <p className="text-[#171717] font-[Poppins] text-[1.22669rem] font-medium">
              Location (Google Map Link)
            </p>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1.22669rem] font-normal underline break-all">
              https://maps.app.goo.gl/YB7Sfq5u6bTvTiHh9https://maps.app.goo.gl/YB7Sfq5u6bTvTiHh9
            </p>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="mt-6">
        <p className="text-[#171717] font-[Poppins] text-[1.5rem] font-semibold leading-[1.95rem]">
          Specialties
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mt-2">
        <button className="w-[10.46094rem] h-[3.0625rem] flex-shrink-0 border border-[#56A430] rounded-full">
          <span className="text-[#56A430] text-center font-[Poppins] text-[1.22669rem] font-medium">
            Indoor Plants
          </span>
        </button>
        <button className="w-[10.46094rem] h-[3.0625rem] flex-shrink-0 border border-[#56A430] rounded-full">
          <span className="text-[#56A430] text-center font-[Poppins] text-[1.22669rem] font-medium">
            Gardening tools
          </span>
        </button>
        <button className="w-[10.46094rem] h-[3.0625rem] flex-shrink-0 border border-[#56A430] rounded-full">
          <span className="text-[#56A430] text-center font-[Poppins] text-[1.22669rem] font-medium">
            Rare Plants
          </span>
        </button>
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
  );
};
