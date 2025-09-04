"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { resetPasswordEmail } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";
import { FormType, LabelInput } from "@repo/ui/label-input";
import { SignInInputs, SignInSchema } from "@repo/common-types/types";
import AuthImage from "../public/assets/images/AuthImages/AuthImages.png";
import MobileAuthImage from "../public/assets/images/MobileView/signInMobileImage-1.png";

export const Sign_In = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);

  //Get the userTimezone in client side
  const userTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  // Handle Login with credentials
  async function handleSignIn(data: SignInInputs) {
    setLoading(true);
    const ipResponse = await axios.get("https://api.ipify.org");
    const ip = ipResponse.data;
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      userTimezone: userTimezone,
      IpAddress: ip,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      let errorMessage = "Signin Failed";
      try {
        const errorResponse = JSON.parse(res.error) as {
          success: boolean;
          message?: string;
          error?: string;
          status?: string;
        };
        errorMessage =
          errorResponse.error || errorResponse.message || "Signin Failed";
        console.error(
          "User Signin error response to FE :",
          errorResponse.error
        );
      } catch (parseError) {
        // If JSON parsing fails, use the raw error message
        console.error("Signin error:", res.error);
        errorMessage = "Internal Server Error!";
      }
      toast.error(errorMessage, {
        ...toastStyle,
        position: "bottom-left",
      });
    } else if (res?.ok) {
      // Check session to determine verification status
      setValue("email", "");
      setValue("password", "");
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();

      if (session?.user?.isVerified) {
        toast.success("Signin successful!", {
          ...toastStyle,
          position: "bottom-left",
        });
        router.push("/");
      } else {
        router.push(`/verify?email=${data.email}`);
      }
    }
  }

  // Handle Login with google
  async function handleLoginWithGoogle() {
    try {
      setLoadingGoogleLogin(true);
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });
      setLoadingGoogleLogin(false);
      if (result?.error) {
        toast.error(
          result.error === "AccessDenied"
            ? "Access denied. Please check your credentials."
            : "Sign-in failed. Please try again.",
          { ...toastStyle, position: "bottom-left" }
        );
      } else if (result?.ok) {
        toast.success("Sign-in Successful", {
          ...toastStyle,
          position: "bottom-left",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("An unexpected error occurred during sign-in", {
        ...toastStyle,
        position: "bottom-left",
      });
    }
  }

  //Handle ResetPassword
  const handleResetPasswordEmail = async () => {
    setResetPasswordLoading(true);
    const email = getValues("email");
    if (email === "") {
      toast.error("Invalid email", { ...toastStyle, position: "bottom-left" });
      setResetPasswordLoading(false);
    } else {
      const res = await resetPasswordEmail(email);
      setResetPasswordLoading(false);
      if (res.error) {
        toast.error(res.error.toString(), {
          ...toastStyle,
          position: "top-left",
          style: {
            width: "250px",
            height: "65px",
            color: "#fff",
            background: "#123524",
          },
        });
        console.error("Error While sending reset password mail:", res.error);
      } else {
        router.push(`/resetpasswordmessage?email=${email}`);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-[#FFF6F4] flex new-sm:flex-col-reverse md:flex-row font-poppins">
      {/* Left Div */}
      <div className="new-sm:w-[100%] new-sm:h-[60%] md:w-[50%] md:h-[100%] flex flex-col new-sm:gap-0 md:gap-[0.2rem] lg:gap-[1rem]">
        {/* Site Logo */}
        <div className="new-sm:hidden md:flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <SiteLogo />
        </div>

        <div
          className={`flex flex-col new-sm:items-start md:items-center lg:items-start new-sm:px-[1rem] lg:pl-[6.5rem] ${
            errors.email || errors.password
              ? "new-sm:mt-0 md:mt-[1rem]"
              : "new-sm:mt-0 md:mt-[2rem]"
          }`}
        >
          {/* Welcome Message */}
          <div className="font-bold flex flex-col gap-0 new-sm:text-start md:text-left">
            <p className="text-[#000] new-sm:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem]">
              Hello there!
            </p>
            <p className="text-[#606060] new-sm:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Ready to Grow Green?
            </p>
          </div>

          {/* Form + Buttons */}
          <div
            className={`new-sm:w-[100%] md:w-max h-max flex flex-col items-center gap-[1rem] new-sm:mt-[1rem] md:mt-[0.2rem] ${
              errors.email || errors.password
                ? "2xl:mt-[0.5rem]"
                : "2xl:mt-[2rem]"
            }`}
          >
            {/* Signin form */}
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="new-sm:w-[100%] md:w-max h-max flex flex-col items-end gap-[1rem]"
            >
              {/* Email */}
              <div className="new-sm:w-[100%] md:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] h-max">
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

              {/* Password */}
              <div className="new-sm:w-[100%] md:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] h-max">
                {errors.password && (
                  <div className="new-sm:w-[100%] md:w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
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

              {/* Forgot password */}
              <button
                type="button"
                className={`text-[#123524] new-sm:text-[0.875rem] md:text-[1rem] font-semibold underline ${
                  resetPasswordLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleResetPasswordEmail}
                disabled={resetPasswordLoading}
              >
                {resetPasswordLoading ? "Loading..." : "Forgot Password"}
              </button>

              {/* Signin button */}
              <div className="new-sm:w-[100%]  md:w-[23rem] new-sm:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem]">
                <AuthButton
                  buttonName="Sign In"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>

            {/* OR Section */}
            <div className="text-[#606060] text-[1rem] font-normal">- OR -</div>

            {/* Google Sign in */}
            <button
              className={`new-sm:w-[11rem] md:w-[13rem] new-sm:h-[3rem]  2xl:w-[15.1rem] 2xl:h-[4.01379rem] flex justify-evenly items-center bg-[#fff] border-[2px] border-[#8C8C8C] rounded-l-full rounded-r-full ${
                loadingGoogleLogin ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={handleLoginWithGoogle}
              disabled={loadingGoogleLogin}
            >
              {!loadingGoogleLogin ? (
                <>
                  <div className="w-[1.2rem] h-[1.2rem] md:w-[1.5rem] md:h-[1.5rem] 2xl:w-[1.80619rem] 2xl:h-[1.80619rem] relative">
                    <Image
                      src={"/assets/images/AuthImages/auth-Google.svg"}
                      alt="google-auth"
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="font-roboto text-[#1F1F1F] text-[0.9rem] md:text-[1rem] 2xl:text-[1.18963rem] font-medium">
                    Sign in with Google
                  </div>
                </>
              ) : (
                <ButtonLoadingSign />
              )}
            </button>

            {/* Signup link */}
            <div className="mt-[0.5rem] gap-[0.5rem] text-[#123524] new-sm:text-[0.9rem] md:text-[1rem] 2xl:text-[1.25rem] font-normal flex">
              <p>Don’t have an account?</p>
              <Link href={"/signup"} className="font-bold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right div */}
      {/* Following div consist of Image */}
      <div className="new-sm:w-[100%] new-sm:h-[40%] md:w-[50%] md:h-[100%] flex new-sm:flex-col md:flex-row justify-center items-center">
        {/* Brand Logo for mobile view */}
        <div className="new-sm:block md:hidden">
          <SiteLogo />
        </div>

        <div className="new-sm:w-[95%] md:w-[85%] new-sm:h-[70%] md:h-[95%] shrink-0 relative rounded-[28px] overflow-hidden">
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
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            src={MobileAuthImage}
            alt="auth-image"
          />
        </div>
      </div>
    </div>
  );
};
