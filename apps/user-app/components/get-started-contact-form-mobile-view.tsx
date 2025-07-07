import Image from "next/image";

const InputField = ({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div className="relative mb-[1.75rem]">
    <div className="absolute -top-2 left-6 px-1 bg-white text-sm text-[#56A430]">
      {label}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-[21.3125rem] h-[3.0625rem] px-6 border-[1.6px] border-[#56A430] rounded-[5.25rem] focus:outline-none"
    />
  </div>
);

export const GetStartedContactFormMobileView = () => {
  return (
    <div className="absolute new-sm:block md:hidden w-full min-h-screen flex items-center justify-center bg-[#00000040] font-[Poppins]">
      <div className="relative bg-white p-6 rounded-[1.5625rem] flex flex-col items-center">
        {/* Close Icon */}
        <Image
          src="\assets\images\ContactFormImages\x.svg"
          alt="Close"
          width={28}
          height={28}
          className="absolute top-4 right-4 cursor-pointer"
        />

        <div className="text-center text-[#123524] font-poppins text-[0.9375rem] font-medium leading-[1.35844rem] capitalize mb-7">
          Join Our Growing Network Of <br /> Trusted Sellers!
        </div>

        <InputField label="Full Name" placeholder="Enter your name here" />
        <InputField label="Phone No." placeholder="+91" />
        <InputField
          label="Email"
          placeholder="Enter your email here"
          type="email"
        />
        <InputField
          label="Nursery Name"
          placeholder="Enter your nursery name here"
        />
        <InputField label="City" placeholder="Enter your city here" />

        {/* Checkbox */}
        <div className="flex items-center mb-[2.31rem] w-full">
          <input
            type="checkbox"
            className="w-[2.375rem] h-[1.5rem] flex-shrink-0 mr-2"
          />
          <div className="text-[#123524] text-center font-poppins text-[0.875rem] font-normal capitalize">
            I Agree To The{" "}
            <span className="font-semibold">Terms And Conditions.</span>
          </div>
        </div>

        {/* Submit */}
        <button
          className="
            w-[20.875rem]
            h-[4.0625rem]
            flex-shrink-0
            rounded-[6.25rem]
            border-white border-[1.605px]
            bg-[#56A430]
            shadow-[0px_3.21px_32.099px_-0.802px_rgba(0,0,0,0.25)]
            [backdrop-filter:blur(16.049386978149414px)]
            text-[#FFF6F4]
            font-poppins
            text-[1.23044rem]
            font-normal
            uppercase
          "
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};
