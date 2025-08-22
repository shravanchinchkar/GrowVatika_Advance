"use client";
import { useState, memo } from "react";
import { toast } from "react-hot-toast";
import { AuthButton } from "@repo/ui/auth-button";
import { storeDataInExcel } from "../actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSuccess } from "./contact-success-msg";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { useChangeMobileConnectFormVisibility } from "@repo/shared-store";
import { GetStartedFromInput, GetStartedFromSchema } from "@repo/common-types";

export const ContactForm = memo(() => {
  const [loading, setLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { setVisibilityOfMobileContactForm } =
    useChangeMobileConnectFormVisibility();

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

  const displayMobileContactForm = () => {
    setVisibilityOfMobileContactForm(true);
  };

  const handleSuccessMessage = () => {
    if (successMessage) {
      setSuccessMessage(false);
      setDisplayForm(false);
    }
  };

  return (
    <div className="new-sm:w-[100%] h-max md:w-[45rem] lg:w-[60rem] xl:w-[75rem] 2xl:w-[82rem] flex flex-col new-sm:py-[1rem] md:py-[2rem] new-sm:gap-[1rem] md:gap-[1.5rem] items-center m-auto relative rounded-none md:rounded-[28px] bg-getstarted-linear-gradient">
      {/* Following is the title of the form */}

      <div className="text-[#123524] font-poppins new-sm:text-[0.8rem] new-sm-1:text-[0.9375rem] new-sm-2:text-[1rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.25rem] font-medium text-center leading-none">
        Join Our Growing Network of Trusted Sellers!
      </div>

      {/* Following form gets displayed from md screen size */}
      {displayForm && (
        <>
          <form
            onSubmit={handleSubmit(handleGetStartedForm)}
            className="new-sm:hidden md:grid w-[90%] md:grid-cols-[25rem auto 10rem] lg:grid-cols-[30rem auto 15rem] xl:grid-cols-[35rem auto 20rem] 2xl:grid-cols-[40rem auto 29rem] gap-y-[1rem] gap-x-0 my-[1rem] font-poppins"
          >
            {/* Input Field For Full Name */}
            <div className="md:w-[95%] lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] h-max col-span-2">
              {errors.fullName && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.fullName.message}
                </div>
              )}
              <LabelInput
                legendName="Full Name"
                useType={FormType.Seller}
                fieldSetClassName="w-[100%] h-[100%] px-[2rem] border-[2px] border-[#fff] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                legendClassName="text-[1.125rem] text-[#123524] font-normal"
                placeHolder="Enter your name here"
                {...register("fullName", { required: true })}
              />
            </div>

            {/* Input Field for Phone Number */}
            <div className="md:w-[100%] xl:w-[20rem] 2xl:w-[28.6875rem] h-max justify-self-start">
              {errors.phoneNumber && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.phoneNumber.message}
                </div>
              )}
              <LabelInput
                legendName="Phone Number"
                useType={FormType.Seller}
                fieldSetClassName="w-[100%] h-[100%] px-[2rem] border-[2px] border-[#fff] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                legendClassName="text-[1.125rem] text-[#123524] font-normal"
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
                fieldSetClassName="w-[100%] h-[100%] px-[2rem] border-[2px] border-[#fff] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                legendClassName="text-[1.125rem] text-[#123524] font-normal"
                placeHolder="Enter your email here"
                {...register("email", { required: true })}
              />
            </div>

            {/* Input Field for Nursery Name */}
            <div className="md:w-[95%] lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] h-max col-span-2">
              {errors.nurseryName && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.nurseryName.message}
                </div>
              )}
              <LabelInput
                legendName="Nursery Name"
                useType={FormType.Seller}
                fieldSetClassName="w-[100%] h-[100%] px-[2rem] border-[2px] border-[#fff] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                legendClassName="text-[1.125rem] text-[#123524] font-normal"
                placeHolder="Enter your nursery name here"
                {...register("nurseryName", { required: true })}
              />
            </div>

            {/* Input Field for City */}
            <div className="md:w-[100%] lg:w-[100%] xl:w-[20rem] 2xl:w-[28.6875rem] h-max justify-self-start">
              {errors.city && (
                <div className="w-[90%] px-[1rem] text-red-500 font-bold">
                  {errors.city.message}
                </div>
              )}
              <LabelInput
                legendName="City"
                useType={FormType.Seller}
                fieldSetClassName="w-[100%] h-[100%] px-[2rem] border-[2px] border-[#fff] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
                legendClassName="text-[1.125rem] text-[#123524] font-normal"
                placeHolder="Enter your city name here"
                {...register("city", { required: true })}
              />
            </div>

            {/* Following is the terms and conditions checkbox and submit button */}
            <div className="flex flex-col items-center col-span-3 mt-[3rem]">
              <div className="flex gap-[0.5rem]">
                <input
                  className="w-[2.375rem] h-[1.5rem] accent-[#123524] cursor-pointer "
                  type="checkbox"
                  id="termsandconditions"
                  {...register("termsandconditions")}
                />
                <div
                  className={`text-[1rem] font-poppins font-normal capitalize ${errors.termsandconditions ? "text-red-500" : "text-[#123524]"}`}
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
                  "md:w-[15rem] xl:w-[17.625rem] h-[4.0625rem] mt-[2rem]"
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

      {/* Following button gets displayed from md screen size */}
      {/* Get Started Button */}
      {!displayForm && (
        <>
          <div
            className={
              !displayForm
                ? `new-sm:hidden md:block md:w-[12rem] md:h-[4.0625rem] lg:w-[15rem] xl:w-[17.625rem] h-[4.0625rem]`
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

      {/* Mobile View Get Started */}
      <button
        className={`new-sm:block md:hidden border-[2px] new-sm:w-[10.5625rem] new-sm:h-[2rem] sm:w-[11rem] sm:h-[3rem]  hover:border-none rounded-[2.10294rem] bg-[#56A430] hover:bg-[#123524] shadow-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] new-sm:text-[0.725rem] sm:text-[1rem] hover:text-[1.1rem] font-poppins font-normal  hover:font-semibold  uppercase ${loading ? "cursor-not-allowed" : "cursor-pointer"} `}
        disabled={loading}
        onClick={displayMobileContactForm}
      >
        <div className="w-[100%] h-[100%] rounded-[2.10294rem] bg-button-custom-gradient group-hover:bg-none flex justify-center items-center">
          {!loading ? "Get Started" : <ButtonLoadingSign />}
        </div>
      </button>

      {/* Connect Success Message */}
      <ContactSuccess
        successMessage={successMessage}
        onClick={handleSuccessMessage}
      />
    </div>
  );
});
