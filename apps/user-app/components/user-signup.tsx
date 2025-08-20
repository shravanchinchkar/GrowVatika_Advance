"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signup } from "../actions/auth";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  toastStyle,
  limitExhaustedToastStyle,
} from "@repo/shared/utilfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import { LabelInput, FormType } from "@repo/ui/label-input";
import {
  SignUpInputs,
  SignupResponse,
  SignUpSchema,
} from "@repo/common-types/types";
import AuthImage from "../public/assets/images/AuthImages/AuthImages.png";
import MobileAuthImage from "../public/assets/images/MobileView/signInMobileImage-1.png";

export const Sign_Up = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //Following is the Signup handler function
  const handleSignup: SubmitHandler<SignUpInputs> = async (
    data: SignUpInputs
  ) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      toast.error("Password Dose Not Match", toastStyle);
      setLoading(false);
    } else {
      const res: SignupResponse = await signup(data); //here signup() is the server action function
      setLoading(false);

      // If Error during Signup then executed the following below block
      if (res.errors) {
        if (res.errors === "Email already in use") {
          setError("email", { message: res.errors.toString() });
        } else if (
          res.errors === "Sigup Limit Exhausted,Try again after 5 minutes!"
        ) {
          toast.error(res.errors, limitExhaustedToastStyle);
        } else {
          toast.error(res.errors.toString(), toastStyle);
        }
      }
      // If Signup succeed then execute the following below block
      if (res?.success && res?.message?.includes("successfully")) {
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
        toast.success("Signup Successful", toastStyle);
        router.push(`/verify?email=${data.email}`);
      }
    }
  };

  return (
    <div className="w-screen h-screen  bg-[#FFF6F4] new-sm:flex new-sm:flex-col md:flex md:flex-row font-[Poppins] overflow-x-hidden new-sm:items-center">
      {/* Following div consist of Image */}
      <div className="new-sm:w-[100%] new-sm:h-[35%] md:w-[50%] md:h-[100%] flex new-sm:flex-col md:flex-row justify-center items-center new-sm:gap-[0.5rem] md:gap-0  cursor-pointer">
        {/* Brand Logo for mobile view */}
        <div className="new-sm:block md:hidden">
          <SiteLogo />
        </div>
        <div className="new-sm:w-[95%] md:w-[85%] new-sm:h-[75%] md:h-[95%] shrink-0 relative rounded-[28px] overflow-hidden">
          <Image
            className="new-sm:hidden md:block object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            src={AuthImage}
            alt="auth-image"
          />
          <Image
            className="new-sm:block md:hidden object-cover"
            fill
            placeholder="blur"
            src={MobileAuthImage}
            alt="auth-image"
          />
        </div>
      </div>

      {/* Following div consist of signup form  */}
      <div className="new-sm:w-[100%] new-sm:h-[65%] md:w-[50%] md:h-[100%] flex flex-col">
        {/* Following div consist of site logo*/}
        <div className="new-sm:hidden md:flex flex-col lg:items-start gap-[2rem] lg:pl-[2rem] pt-[1rem]">
          <SiteLogo />
        </div>

        {/* Following div consist of welcome message, signup form, and sign-in option */}
        <div className="flex flex-col items-start new-sm:px-[1rem] lg:pl-[6.5rem] md:mt-[1rem]">
          {/* Following div consist of welcome message  */}
          <div className="font-bold flex flex-col gap-0 md:w-[100%] lg:w-max">
            <p className="text-[#000] new-sm:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem]">
              Create an account
            </p>
            <p className="text-[#606060] new-sm:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem] ">
              Sign up to Explore Your Green World!
            </p>
          </div>

          {/* Following div consist of Signup form and sign-in option */}
          <div
            className={`new-sm:w-[100%] md:w-max h-max flex flex-col new-sm:mt-[1rem] md:mt-[0.2rem] ${errors.name || errors.email || errors.password ? "2xl:mt-[1rem]" : "2xl:mt-[1rem]"}`}
          >
            {/* Following div consist of Signup form and Signup button */}
            <form
              onSubmit={handleSubmit(handleSignup)}
              className={`new-sm:w-[100%] md:w-max h-max flex flex-col `}
            >
              {/* Following is the input field for Name */}
              <div className="new-sm:w-[100%] md:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] flex flex-col h-max">
                {errors.name && (
                  <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
                    {errors.name.message}
                  </div>
                )}
                <LabelInput
                  legendName="Name"
                  useType={FormType.AUTH}
                  placeHolder="Enter your name here"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Following is the input field for Email */}
              <div
                className={`h-max new-sm:w-[100%] md:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] flex flex-col ${errors.email ? "mt-[0rem]" : "mt-[1rem]"}`}
              >
                {errors.email && (
                  <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
                    {errors.email.message}
                  </div>
                )}
                <LabelInput
                  legendName="Email"
                  useType={FormType.AUTH}
                  placeHolder="Enter your email here"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Following is the input field for Password */}
              <div
                className={`new-sm:w-[100%] md:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] flex flex-col h-max ${errors.password ? "mt-[0rem]" : "mt-[1rem]"}`}
              >
                {errors.password && (
                  <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
                    {errors.password.message}
                  </div>
                )}
                <LabelInput
                  legendName="Password"
                  useType={FormType.AUTH}
                  placeHolder="Enter your password here"
                  {...register("password", { required: true })}
                />
              </div>

              {/* Following is the input field for Confirm Password */}
              <div
                className={`new-sm:w-[100%] md:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] flex flex-col h-max ${errors.confirmPassword ? "mt-[0rem]" : "mt-[1rem]"}`}
              >
                {errors.confirmPassword && (
                  <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
                    {errors.confirmPassword.message}
                  </div>
                )}
                <LabelInput
                  legendName="Confirm Password"
                  useType={FormType.AUTH}
                  placeHolder="Enter your password here"
                  {...register("confirmPassword", { required: true })}
                />
              </div>

              {/*Following div consist of Signup Button*/}
              <div
                className={`md:w-[23rem] new-sm:h-[3.0625rem] md:h-[3.5rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[4.01506rem] ${errors.confirmPassword ? "mt-[0.8rem]" : "mt-[1rem]"}`}
              >
                <AuthButton
                  buttonName="Sign up"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>

            {/* Following is the Sign-in Option */}
            <div
              className={`m-auto gap-[0.5rem] text-[#123524] new-sm:text-[0.9rem] md:text-[1rem] 2xl:text-[1.25rem] font-normal flex ${errors.confirmPassword ? "mt-[1rem]" : "mt-[2rem]"}`}
            >
              <p>Already have an account?</p>
              <Link href={"/signin"} className="font-bold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
