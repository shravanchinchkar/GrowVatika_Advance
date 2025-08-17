"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { storeDataInExcel } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormType, LabelInput } from "@repo/ui/label-input";
import { useChangeMobileConnectFormVisibility } from "@repo/shared-store";
import { GetStartedFromInput, GetStartedFromSchema } from "@repo/common-types";

export const MobileGetStartedForm = () => {
  const [loading, setLoading] = useState(false);

  const {isMobileContactFormVisible,setVisibilityOfMobileContactForm}=useChangeMobileConnectFormVisibility();

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<GetStartedFromInput>({
    resolver: zodResolver(GetStartedFromSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      nurseryName: "",
      city: "",
      termsandconditions: false,
    },
  });

  // Submit form data to backend
  const handleGetStartedForm: SubmitHandler<GetStartedFromInput> = async (
    data: GetStartedFromInput
  ) => {
    setLoading(true);
    const res = await storeDataInExcel(data);
    setLoading(false);

    if (res.error) {
      toast.error(res.error, toastStyle);
    } else {
      setValue("fullName", "");
      setValue("phoneNumber", "");
      setValue("email", ""), setValue("nurseryName", ""), setValue("city", "");
      setValue("termsandconditions", false);
      toast.success("Submitted!", toastStyle);
    }
  };

  const handleCancleButton = () => {
    setVisibilityOfMobileContactForm(false);
  };

  if (isMobileContactFormVisible) {
    return (
      <div className="new-sm:block md:hidden w-[100%] h-[100vh] absolute z-50 top-0 flex items-center justify-center bg-[#00000040] font-[Poppins] p-[1rem] overflow-scroll">
        <div className="w-[100%] h-max bg-[#fff] rounded-[1.5625rem] border-[1.6px] border-[#56A430] overflow-hidden flex flex-col gap-[1rem] py-[1rem]">
          {/* Following is the heading of the form and cancle button */}
          <div className="w-[100%] h-[10%] flex justify-center items-center">
            <h1 className="w-[70%] ml-[2rem] text-[#123524] text-center text-[0.9375rem] font-medium">
              Join Our Growing Network of Trusted Sellers!
            </h1>

            <button
              type="button"
              className="w-[10%] flex justify-center items-center ml-[0.5rem]"
              onClick={handleCancleButton}
            >
              <div className="w-[1.75rem] h-[1.75rem] relative">
                <Image
                  src={"/assets/images/ContactFormImages/x.svg"}
                  fill
                  alt="cancle"
                  className="object-contain"
                />
              </div>
            </button>
          </div>

          {/* Following div consist of form and copyright details */}
          <div className="w-[100%] h-[90%] flex flex-col gap-[1rem] items-center px-[1rem]">
            {/* Following is the form */}
            <form
              className="w-[100%] h-max flex flex-col gap-[1rem]"
              onSubmit={handleSubmit(handleGetStartedForm)}
            >
              {/* First Name */}
              <div className="w-[100%] h-max">
                {errors.fullName && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-medium text-[0.8rem]">
                    {errors.fullName.message}
                  </div>
                )}
                <LabelInput
                  legendName="First Name"
                  placeHolder="Enter your name here"
                  fieldSetClassName="w-[100%] h-[100%] px-[1rem] border-[2px] border-[#56A430] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                  legendClassName="text-[0.875rem] text-[#56A430] font-normal"
                  useType={FormType.Seller}
                  {...register("fullName", { required: true })}
                />
              </div>

              {/* Phone Number */}
              <div className="w-[100%] h-max">
                {errors.phoneNumber && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-medium text-[0.8rem]">
                    {errors.phoneNumber.message}
                  </div>
                )}
                <LabelInput
                  legendName="Phone Number"
                  placeHolder="+91 9999999999"
                  fieldSetClassName="w-[100%] h-[100%] px-[1rem] border-[2px] border-[#56A430] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                  legendClassName="text-[0.875rem] text-[#56A430] font-normal"
                  useType={FormType.Seller}
                  {...register("phoneNumber", { required: true })}
                />
              </div>

              {/* Email */}
              <div className="w-[100%] h-max">
                {errors.email && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-medium text-[0.8rem]">
                    {errors.email.message}
                  </div>
                )}
                <LabelInput
                  legendName="Email"
                  placeHolder="Enter your email here"
                  fieldSetClassName="w-[100%] h-[100%] px-[1rem] border-[2px] border-[#56A430] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                  legendClassName="text-[0.875rem] text-[#56A430] font-normal"
                  useType={FormType.Seller}
                  {...register("email", { required: true })}
                />
              </div>

              {/* Nursery Name */}
              <div className="w-[100%] h-max">
                {errors.nurseryName && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-medium text-[0.8rem]">
                    {errors.nurseryName.message}
                  </div>
                )}
                <LabelInput
                  legendName="Nursery Name"
                  placeHolder="Enter your nursery name here"
                  fieldSetClassName="w-[100%] h-[100%] px-[1rem] border-[2px] border-[#56A430] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                  legendClassName="text-[0.875rem] text-[#56A430] font-normal"
                  useType={FormType.Seller}
                  {...register("nurseryName", { required: true })}
                />
              </div>

              {/* City Name */}
              <div className="w-[100%] h-max">
                {errors.city && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-medium text-[0.8rem]">
                    {errors.city.message}
                  </div>
                )}
                <LabelInput
                  legendName="City"
                  placeHolder="Enter your city name here"
                  fieldSetClassName="w-[100%] h-[100%] px-[1rem] border-[2px] border-[#56A430] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                  legendClassName="text-[0.875rem] text-[#56A430] font-normal"
                  useType={FormType.Seller}
                  {...register("city", { required: true })}
                />
              </div>

              {/* Terms and Conditions */}
              <div className=" flex justify-center items-center gap-[0.2rem]">
                <input
                  className="w-[1rem] h-[1rem] accent-[#123524] cursor-pointer rounded-[1rem]"
                  type="checkbox"
                  id="termsandconditions"
                  {...register("termsandconditions")}
                />
                <div
                  className={`new-sm:text-[0.7rem] new-sm-1:text-[0.875rem] font-[Poppins] font-normal capitalize ${errors.termsandconditions ? "text-red-500" : "text-[#123524]"}`}
                >
                  {errors.termsandconditions
                    ? "Agree to the "
                    : "I agree to the "}
                  <span className="font-semibold cursor-pointer">
                    Terms and Conditions
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className={"w-[100%] h-[3rem]"}>
                <AuthButton
                  buttonName="Submit"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>

            {/* Following div consist of logo and copy-rigth statement */}
            <div className="w-[100%] h-max flex flex-col gap-[0.5rem] items-center">
              <div className="w-[100%] flex justify-center items-center">
                <SiteLogo />
              </div>

              <div className="w-[100%] flex flex-col items-center new-sm:text-[0.8rem] new-sm-1:text-[0.875rem] text-[#8C8C8C]">
                <div>
                  <div>&copy; 2025 GrowVatika.All rights reserved</div>
                </div>
                <div className="w-[60%] flex justify-around">
                  <p>Terms</p>
                  <p>Privacy</p>
                  <p>Help</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
};
