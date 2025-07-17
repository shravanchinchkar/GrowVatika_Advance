import { FormType, LabelInput } from "@repo/ui/label-input";
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

export const MobileGetStartedForm = () => {
  return (
    <div className="absolute top-0 new-sm:block md:hidden w-screen h-screen flex items-center justify-center bg-[#00000040] font-[Poppins] p-[1rem]">
      <div className="w-[100%] h-[95%] bg-[#fff] rounded-[1.5625rem] border-[1.6px] border-[#56A430] overflow-hidden flex flex-col gap-[1rem]">
        {/* Following is the heading of the form */}
        <div className="w-[100%] h-[10%] flex justify-center items-center">
          <h1 className="w-[70%] ml-[2rem] text-[#123524] text-center text-[0.9375rem] font-medium">
            Join Our Growing Network of Trusted Sellers!
          </h1>
          <div className="w-[1rem] h-[1rem] relative ml-[1.5rem]">
            <Image
              src={"/assets/images/ConnectForm/cancle.svg"}
              fill
              alt="cancle"
              className="object-contain"
            />
          </div>
        </div>

        <form className="border-[2px] flex flex-col items-center">
          <div className="w-[19rem] h-[3.0625rem] border-[1.6px] border-[#56A430] rounded-[5.25rem]">
            <LabelInput
              legendName="Full Name"
              useType={FormType.Seller}
              placeHolder="Enter your name here"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
