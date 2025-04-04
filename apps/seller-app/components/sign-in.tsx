"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { feSignupInputs, SignupResponse } from "@repo/common-types/types";
import { SiteLogo } from "@repo/ui/brand-logo";
import { LabelInput } from "@repo/ui/label-input";
import { AuthButton } from "@repo/ui/auth-button";
import AuthImage from "../public/assets/images/AuthImages/seller-signin.png";
// import { toastStyle } from "../app/lib/toast-style";
// import { signup } from "../app/actions/auth";
// import { toast } from "react-hot-toast";

interface SignupError {
  nameError: string;
  emailError: string;
  passwordError: string;
}

export const SellerSignin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signupInputs, setSignupInputs] = useState<feSignupInputs>({
    name: "",
    email: "",
    password: "",
  });
  const [signupErrors, setSignupErrors] = useState<SignupError>({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  //   const handleSignup = async () => {
  //     setLoading(true);
  //     console.log("Signin Inputs:", signupInputs);
  //     const res: SignupResponse = await signup(signupInputs); //here signup() is the server action function
  //     console.log("Response of BE to FE is:", res);
  //     setLoading(false);

  //     // Check if errors exists
  //     if (res.errors) {
  //       if (typeof res.errors === "string") {
  //         // If errors is a string, assign it to emailError
  //         setSignupErrors({
  //           nameError: "",
  //           emailError: res.errors,
  //           passwordError: "",
  //         });
  //       } else {
  //         // If errors is an object, extract field-specific errors
  //         setSignupErrors({
  //           nameError: res.errors.name?.join(", ") || "",
  //           emailError: res.errors.email?.join(", ") || "",
  //           passwordError: res.errors.password?.join(", ") || "",
  //         });
  //       }
  //     } else {
  //       // Reset errors if no errors are present
  //       setSignupErrors({
  //         nameError: "",
  //         emailError: "",
  //         passwordError: "",
  //       });
  //     }

  //     // Handle success
  //     if (res?.success && res?.message?.includes("successfully")) {
  //       setSignupInputs({
  //         name: "",
  //         email: "",
  //         password: "",
  //       });
  //       setSignupErrors({
  //         nameError: "",
  //         emailError: "",
  //         passwordError: "",
  //       });
  //       router.push(`/verify?email=${signupInputs.email}`);
  //     }

  //     // Handle other messages (e.g., errors)
  //     if (res?.message && !res.success) {
  //       console.error("Error message:",res.message)
  //       toast.error("Please try again", toastStyle);
  //     }
  //   };
  return (
    <div className="w-screen h-screen bg-[#FFF6F4] flex font-[Poppins]">
      {/* Following div consist of Image */}
      <div className="w-[50%] flex justify-center items-center">
        <div className="lg:w-[30rem] lg:h-[30rem] xl:w-[31rem] xl:h-[31rem] 2xl:w-[42rem] 2xl:h-[42rem] shrink-0 rounded-[28px] overflow-hidden bg-[url(/assets/images/AuthImages/seller-signin.png)] bg-cover bg-no-repeat">

          <div className="mx-auto flex flex-col items-center text-[#606060] mt-[2rem]">
            <h1 className="text-[2rem] font-bold w-[32rem] text-center">
              Nursery For Everyone
            </h1>
            <p className="w-[38rem] text-[1.5rem] leading-[1.9rem] text-center font-semibold">
              Welcome back to your seller dashboard. Manage your plant
              inventory, track orders, and grow your business.
            </p>
          </div>

        </div>
      </div>

      {/* Following div consist of Signin form */}
      <div className="w-[50%] flex flex-col">
        {/* Following div consist of site logo and welcome message */}
        <div className="flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <div>
            <SiteLogo />
          </div>

          <div className="font-bold flex flex-col gap-0 ml-[2rem]">
            <p className="text-[#000] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] ">
              Sign in to your account
            </p>
            <p className="text-[#606060] w-[23rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Enter your credentials to access your seller dashboard
            </p>
          </div>
        </div>

        {/* Following div consist of Auth Steps */}
        <div
          className={
            signupErrors.nameError === "" &&
            signupErrors.emailError === "" &&
            signupErrors.passwordError === ""
              ? "w-[100%] h-max flex flex-col items-center gap-[1rem] lg:mt-[0.5rem] 2xl:mt-[3rem]"
              : signupErrors.nameError === "" &&
                  signupErrors.passwordError === "" &&
                  signupErrors.emailError != ""
                ? "w-[100%] h-max flex flex-col items-center gap-[1rem] lg:mt-[0.5rem] 2xl:mt-[1rem]"
                : "w-[100%] h-max flex flex-col items-center gap-[1rem] lg:mt-[0.5rem] 2xl:mt-[1rem]"
          }
        >
          {/* Following is the login form */}
          <form className="w-[70%] h-max flex flex-col items-center gap-[1rem]">
            {/* Following is the Email Input Field */}
            <div
              className={
                signupErrors.emailError != "" && signupErrors.nameError != ""
                  ? "lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem] flex flex-col mt-[1rem]"
                  : signupErrors.emailError != "" &&
                      signupErrors.nameError === ""
                    ? "lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem] flex flex-col"
                    : "lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem] flex flex-col"
              }
            >
              {signupErrors.emailError != "" ? (
                <div className="w-[90%] m-auto px-[2rem] text-red-500 font-bold pt-[0.2rem]">
                  {signupErrors.emailError}
                </div>
              ) : null}
              <LabelInput
                name="userEmail"
                legendName="Email"
                useType="authForm"
                placeHolder="Enter your email here"
                value={signupInputs.email}
                onChange={(e) => {
                  setSignupErrors({
                    ...signupErrors,
                    nameError: "",
                    emailError: "",
                    passwordError: "",
                  });
                  setSignupInputs({
                    ...signupInputs,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            {/* Following is the Password Input Field */}
            <div
              className={
                signupErrors.passwordError != "" ||
                signupErrors.emailError != ""
                  ? "lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem] flex flex-col mt-[1rem]"
                  : "lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem] flex flex-col"
              }
            >
              {signupErrors.passwordError != "" ? (
                <div className="w-[90%] m-auto px-[2rem] text-red-500 font-bold pt-[0.5rem]">
                  {signupErrors.passwordError}
                </div>
              ) : null}
              <LabelInput
                name="userPassword"
                legendName="Password"
                useType="authForm"
                placeHolder="Enter your password here"
                value={signupInputs.password}
                onChange={(e) => {
                  setSignupErrors({
                    ...signupErrors,
                    nameError: "",
                    emailError: "",
                    passwordError: "",
                  });
                  setSignupInputs({
                    ...signupInputs,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            {/* Login Button */}
            <div
              className={
                signupErrors.passwordError != ""
                  ? "lg:w-[23rem] lg:h-[3.5rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[4.01506rem] mt-[2.5rem]"
                  : "lg:w-[23rem] lg:h-[3.5rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[4.01506rem] mt-[0.5rem]"
              }
            >
              <AuthButton
                buttonName="Sign up"
                // onClick={handleSignup}
                loading={loading}
              />
            </div>
          </form>
        </div>

        {/* Following is the Sign-up Option */}
        <div className="mx-auto mt-[1.5rem]  text-[#123524] text-[1.25rem] font-normal flex">
          <p>Don't have a seller account?</p>
          <Link href={"/register"} className="font-bold">
            Register here
          </Link>
        </div>

        <div className="flex flex-col mx-auto mt-[4rem] text-[#8C8C8C] text-[1.25rem] font-normal">
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
  );
};
