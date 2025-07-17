"use client";
import { toast } from "react-hot-toast";
import { useState, useCallback } from "react";
import { AuthButton } from "@repo/ui/auth-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeDataInExcel } from "../actions/auth";
import { ContactSuccess } from "./contact-success-msg";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { GetStartedFromInput, GetStartedFromSchema } from "@repo/common-types";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

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

  const handleGetStartedForm: SubmitHandler<GetStartedFromInput> = async (
    data: GetStartedFromInput
  ) => {
    setLoading(true);
    const res = await storeDataInExcel(data);
    setLoading(false);

    if (res.error) {
      toast.error(res.error, toastStyle);
    } else {
      setSuccessMessage(true);
      setValue("fullName", "");
      setValue("phoneNumber", "");
      setValue("email", ""), setValue("nurseryName", ""), setValue("city", "");
      setValue("termsandconditions", false);
    }
  };

  const handleSuccessMessage = () => {
    if (successMessage) {
      setSuccessMessage(false);
      setDisplayForm(false);
    }
  };

  return (
    <div
      className={`new-sm:w-[100%] new-sm:h-[4.9375rem] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] 
        2xl:w-[82rem] flex flex-col items-center m-auto bg-contact-form sm:pt-[2rem] md:pt-[1rem] md:pb-[1rem] 
        relative rounded-none sm:rounded-[28px] ${displayForm ? "sm:h-[40rem] gap-[2rem]" : "sm:h-[12.8125rem] new-sm:gap-[0.5rem] md:gap-[1rem]"} new-sm:mt-[1rem] md:mt-0`}
    >
      {/* Following is the title of the form */}

      <div className="text-[#123524] font-[Poppins] new-sm:text-[0.9375rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.25rem] font-medium  text-center new-sm:mt-[0.5rem] md:mt-[1rem]">
        Join Our Growing Network of Trusted Sellers!
      </div>

      {displayForm && (
        <>
          <form
            onSubmit={handleSubmit(handleGetStartedForm)}
            className="grid w-[90%] lg:grid-cols-[30rem auto 15rem] xl:grid-cols-[35rem auto 20rem] 2xl:grid-cols-[40rem auto 29rem] gap-y-[1rem] gap-x-0 my-[1rem] font-[Poppins]"
          >
            {/* Input Field For Full Name */}
            <div className="lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] h-max col-span-2">
              {errors.fullName && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.fullName.message}
                </div>
              )}
              <LabelInput
                legendName="Full Name"
                useType={FormType.Seller}
                placeHolder="Enter your name here"
                {...register("fullName", { required: true })}
              />
            </div>

            {/* Input Field for Phone Number */}
            <div className="lg:w-[100%] xl:w-[20rem] 2xl:w-[28.6875rem] h-max justify-self-start">
              {errors.phoneNumber && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.phoneNumber.message}
                </div>
              )}
              <LabelInput
                legendName="Phone Number"
                useType={FormType.Seller}
                placeHolder="+91 9999999999"
                {...register("phoneNumber", { required: true })}
              />
            </div>

            {/* Input Field for Email */}
            <div className="lg:w-[25rem] xl:w-[30rem] 2xl:w-[34.25rem] h-max col-span-3">
              {errors.email && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.email.message}
                </div>
              )}
              <LabelInput
                legendName="Business Email"
                useType={FormType.Seller}
                placeHolder="Enter your email here"
                {...register("email", { required: true })}
              />
            </div>

            {/* Input Field for Nursery Name */}
            <div className="lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] h-max col-span-2">
              {errors.nurseryName && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.nurseryName.message}
                </div>
              )}
              <LabelInput
                legendName="Nursery Name"
                useType={FormType.Seller}
                placeHolder="Enter your nursery name here"
                {...register("nurseryName", { required: true })}
              />
            </div>

            {/* Input Field for City */}
            <div className="lg:w-[100%] xl:w-[20rem] 2xl:w-[28.6875rem] h-max justify-self-start">
              {errors.city && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.city.message}
                </div>
              )}
              <LabelInput
                legendName="City"
                useType={FormType.Seller}
                placeHolder="Enter your city name here"
                {...register("city", { required: true })}
              />
            </div>

            {/* Following is the terms and conditions checkbox and submit button */}
            <div className="flex flex-col items-center col-span-3 mt-[3rem]">
              <div className="flex gap-[0.5rem]">
                <input
                  className="w-[2.375rem] h-[1.5rem] accent-[#123524] cursor-pointer rounded-[1rem]"
                  type="checkbox"
                  id="termsandconditions"
                  {...register("termsandconditions")}
                />
                <div
                  className={`text-[1rem] font-[Poppins] font-normal capitalize ${errors.termsandconditions ? "text-red-500" : "text-[#123524]"}`}
                >
                  {errors.termsandconditions
                    ? "Agree to the "
                    : "I agree to the "}
                  <span className="font-semibold cursor-pointer">
                    Terms and Conditions
                  </span>
                </div>
              </div>

              {/* Following div consist of Submit Button */}
              <div
                className={
                  "lg:w-[15rem] xl:w-[17.625rem] h-[4.0625rem] mt-[2rem]"
                }
              >
                <AuthButton
                  buttonName="Submit"
                  type="submit"
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </>
      )}

      {/* Get Started Button */}
      {!displayForm && (
        <>
          <div
            className={
              !displayForm
                ? `new-sm:w-[10.5625rem] new-sm:h-[1.5625rem] sm:w-[11rem] sm:h-[3rem] md:w-[12rem] md:h-[4.0625rem] lg:w-[15rem] xl:w-[17.625rem] h-[4.0625rem]`
                : "hidden"
            }
          >
            <AuthButton
              buttonName="Get Started"
              type="button"
              onClick={() => {
                setDisplayForm(true);
              }}
            />
          </div>
        </>
      )}

      {/* Connect Success Message */}
      <ContactSuccess
        successMessage={successMessage}
        onClick={handleSuccessMessage}
      />
    </div>
  );
};
