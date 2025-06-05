import Image from "next/image";
export const BusinessInfoSection = () => {
  return (
    <div className="w-full rounded-[0.75rem] border-2 border-[#E5E5E5] bg-white p-6 shadow-md flex flex-col gap-5">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[#171717] font-[Poppins] text-[2.016rem] font-semibold leading-[2.621rem]">
              Business Information
            </h2>
            <p className="text-[#8C8C8C] font-[Poppins] text-[1.197rem] font-medium leading-[1.556rem]">
              This information is displayed on your public store page
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[1.26rem] border border-[#CBD0D3] text-[#000000] font-[Poppins] text-[1rem] font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6H9v-2l6-6z"
              />
            </svg>
            Edit
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-start gap-4">
            {/* Image */}
            <div
              className="w-[6.363rem] h-[6.363rem] rounded-full bg-center bg-cover"
              style={{ backgroundImage: "url('/path-to-image.jpg')" }}
            ></div>
            {/* Text */}
            <div>
              <p className="text-[#171717] font-[Poppins] text-[1.512rem] font-semibold leading-[1.966rem]">
                Evergreen Gardens
              </p>
              <p className="text-[#8C8C8C] font-[Poppins] text-[1.236rem] font-medium leading-normal">
                Family-owned nursery specializing in rare indoor plants,
                succulents, and gardening supplies with expert advice.
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#123524] text-white rounded-[1.26rem]">
            <span className="text-[#FFCE31] text-[1rem]">★</span>
            <span className="font-[Poppins] text-[1.236rem] font-medium uppercase">
              4.5
            </span>
          </div>
        </div>
      </div>

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
