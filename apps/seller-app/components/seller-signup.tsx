"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerRegistration } from "../app/actions/auth";
import { toastStyle } from "@repo/shared/utilfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import { LabelInput, FormType } from "@repo/ui/label-input";
import {
  SignUpInputs,
  SignupResponse,
  SignUpSchema,
} from "@repo/common-types/types";

export const SellerRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const searchParamsEmail = searchParams?.get("email") || "";

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nurseryName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Get Data of the seller
  // async function getData() {
  //   const res = await axios.get(
  //     `/api/getsellerdata?email=${encodeURIComponent(searchParamsEmail)}`
  //   );
  //   console.log("Seller Data is:", res.data.sellerData);
  //   if (res.data.error) {
  //     toast.error(res.data.error.toString(), toastStyle);
  //   } else {
  //     setValue("nurseryName", res.data.sellerData?.nurseryName);
  //     setValue("email", res.data.sellerData?.email || "");
  //     setValue("phoneNumber", res.data.sellerData?.phoneNumber);
  //   }
  // }
  // async function main() {
  //   await getData();
  // }
  // useEffect(() => {
  //   main();
  // }, [main]);

  useEffect(() => {
    if (!searchParamsEmail) return;

    let isCancelled = false; // Cleanup flag

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/getsellerdata?email=${encodeURIComponent(searchParamsEmail)}`
        );

        // Don't update state if component unmounted
        if (isCancelled) return;

        console.log("Seller Data is:", res.data.sellerData);

        if (res.data.error) {
          toast.error(res.data.error.toString(), toastStyle);
        } else {
          const { sellerData } = res.data;
          setValue("nurseryName", sellerData?.nurseryName || "");
          setValue("email", sellerData?.email || "");
          setValue("phoneNumber", sellerData?.phoneNumber || "");
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching seller data:", error);
          toast.error("Failed to fetch seller data", toastStyle);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [searchParamsEmail, setValue, toast, toastStyle]);

  // Handle Seller Registration
  const handelSellerRegistration: SubmitHandler<SignUpInputs> = async (
    data: SignUpInputs
  ) => {
    setLoading(true);
    // If password and confirm-password are not exactly similar then, execute the below block
    if (data.password !== data.confirmPassword) {
      toast.error("Invalid Password", toastStyle);
      setLoading(false);
    }
    // If both the passwords are correct then execute the following below block
    else {
      const res: SignupResponse = await sellerRegistration(data);
      setLoading(false);
      if (res.errors) {
        console.error("Error While registrating the seller:", res.errors);
        toast.error(res.errors.toString(), toastStyle);
      } else if (res.success) {
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("password", "");
        setValue("confirmPassword", "");
        if (
          res.message ===
          "Seller Created Successfully. Please verify your email"
        ) {
          router.push(`/verify?email=${encodeURIComponent(searchParamsEmail)}`);
        } else {
          toast.success("Registration Successful", toastStyle);
          router.push("/signin");
        }
      }
    }
  };

  return (
    <div className="w-screen relative bg-[#FFF6F4] flex font-[Poppins] overflow-x-hidden">
      {/* Following is the left side div*/}
      <div className="w-[50%] flex justify-center items-center relative">
        {/* Following div consist of image */}
        <div className="lg:w-[30rem] lg:h-[30rem] xl:w-[31rem] xl:h-[31rem] 2xl:w-[42rem] 2xl:h-[42rem] shrink-0 rounded-[28px] overflow-hidden bg-[url(/assets/images/AuthImages/seller-registration.png)] bg-cover bg-no-repeat border-[1px] border-[#8C8C8C] fixed top-[10px] bottom-0">
          <div className="flex flex-col items-center text-[#606060] mt-[2rem]">
            <h1 className="text-[2rem] font-bold w-[32rem] text-center">
              Nursery For Everyone
            </h1>
            <p className="w-[38rem] h-max text-[1.5rem] leading-[1.9rem] text-center font-semibold">
              Join our community of plant sellers. Create your account to start
              listing your plants and growing your business.
            </p>
          </div>
        </div>
      </div>

      {/* Following is the right side div */}
      <div className="w-[50%] flex flex-col gap-[1rem]">
        {/* Following div consist of site logo*/}
        <div className="h-[5.5rem] flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <SiteLogo />
        </div>

        {/* Following div consist of welcome message, signup form, signin message and copyright message */}
        <div className="flex flex-col gap-[2rem] items-start pl-[6.5rem]">
          {/* Following div consist of welcome message */}
          <div className="font-bold flex flex-col gap-0">
            <p className="text-[#000] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem]">
              Create a seller account
            </p>
            <p className="text-[#606060] w-[23rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Fill in your details to start selling on GrowVatika
            </p>
          </div>

          {/* Following div consist of signup form , and signup message */}
          <div className="flex flex-col items-center">

            {/* Seller Registration Form */}
            <form
              className="flex flex-col items-start gap-[1rem] lg:mt-[0.5rem]"
              onSubmit={handleSubmit(handelSellerRegistration)}
            >
              {/* Following div consist of firstName and lastName */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-max grid grid-cols-2 gap-x-[1rem]">
                {/* Following div consist of firstName*/}
                <div>
                  {errors.firstName && (
                    <div className="ml-[1rem] text-red-500 font-bold text-start">
                      {errors.firstName.message}
                    </div>
                  )}
                  <LabelInput
                    legendName="First Name"
                    useType={FormType.AUTH}
                    placeHolder="First Name"
                    {...register("firstName", { required: true })}
                  />
                </div>
                {/* Following div consist of lastName */}
                <div>
                  {errors.lastName && (
                    <div className="ml-[1rem] text-red-500 font-bold text-start">
                      {errors.lastName.message}
                    </div>
                  )}
                  <LabelInput
                    legendName="Last Name"
                    useType={FormType.AUTH}
                    placeHolder="Last Name"
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>

              {/* Following div consist of input field for nursery name */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-max">
                {errors.nurseryName && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
                    {errors.nurseryName.message}
                  </div>
                )}
                <LabelInput
                  legendName="Nursery Name"
                  useType={FormType.AUTH}
                  placeHolder="Enter your nursery name here"
                  {...register("nurseryName", { required: true })}
                  readonly={true}
                />
              </div>

              {/* Following is the Email Input Field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-max ">
                {errors.email && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
                    {errors.email.message}
                  </div>
                )}
                <LabelInput
                  legendName="Business Email"
                  useType={FormType.AUTH}
                  placeHolder="Enter your business email here"
                  {...register("email", { required: true })}
                  readonly={true}
                />
              </div>

              {/* Following div consist of input field for Phone number */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-max">
                {errors.phoneNumber && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
                    {errors.phoneNumber.message}
                  </div>
                )}
                <LabelInput
                  legendName="Phone No."
                  useType={FormType.AUTH}
                  placeHolder="Enter your phone no. here"
                  {...register("phoneNumber", { required: true })}
                  readonly={true}
                />
              </div>

              {/* Following is the Password Input Field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-max">
                {errors.password && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
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

              {/* Following is the confirm password field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-max">
                {errors.confirmPassword && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
                    {errors.confirmPassword.message}
                  </div>
                )}
                <LabelInput
                  legendName="Confirm Password"
                  useType={FormType.AUTH}
                  placeHolder="Enter your password again"
                  {...register("confirmPassword", { required: true })}
                />
              </div>

              {/* Singup Button */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.5rem] mt-[0.5rem]">
                <AuthButton
                  type="submit"
                  buttonName="Create Account"
                  loading={loading}
                />
              </div>
            </form>

            {/* Signin message */}
            <div className=" mt-[1.3rem] text-[#123524] text-[1.25rem] font-normal flex">
              <p>Already have a seller account?</p>
              <Link href={"/signin"} className="font-bold">
                 Sign in
              </Link>
            </div>
          </div>

          {/* Copyright div */}
          <div className="flex flex-col ml-[4rem] mt-[1rem] mb-[1rem] text-[#8C8C8C] text-[1.25rem] font-normal">
            <div className="flex">
              <div>&#169;</div>
              <div>2025 GrowVatika. All rights reserved.</div>
            </div>
            <div className="w-[250px] mx-auto flex gap-[0.5rem] justify-between">
              <p>Terms</p>
              <p>Privacy</p>
              <p>Help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
