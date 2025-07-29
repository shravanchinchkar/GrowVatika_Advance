"use client";

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
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      userTimezone: userTimezone,
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
          position: "bottom-left",
        });
        console.error("Error While sending reset password mail:", res.error);
      } else {
        router.push(`/resetpasswordmessage?email=${email}`);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen max-h-max bg-[#FFF6F4] flex font-[Poppins]">
      <div className="w-[50%] flex flex-col gap-[1rem]">
        {/* Following div consist of site logo */}
        <div className="flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <div>
            <SiteLogo />
          </div>
        </div>

        <div
          className={`flex flex-col items-start pl-[6.5rem] ${errors.email || errors.password ? "mt-[1rem]" : "mt-[2rem]"}`}
        >
          {/* Following div consist of welcome message */}
          <div className="font-bold flex flex-col gap-0">
            <p className="text-[#000] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem]">
              Hello there! {userTimezone}
            </p>
            <p className="text-[#606060] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Ready to Grow Green?
            </p>
          </div>

          {/* Following div consist of Signup Form, OR and Signin with google option */}
          <div
            className={`h-max flex flex-col items-center gap-[1rem] lg:mt-[0.2rem] ${errors.email || errors.password ? "2xl:mt-[0.5rem]" : "2xl:mt-[2rem]"}`}
          >
            {/* Signin form */}
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="w-max h-max flex flex-col items-end gap-[1rem]"
            >
              {/* Following is the input field for email */}
              <div className="lg:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] h-max">
                {errors.email && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-bold">
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
              <div className="lg:w-[23rem] xl:w-[28rem] 2xl:w-[30.1875rem] h-max">
                {errors.password && (
                  <div className="w-[90%] px-[1rem] text-red-500 font-bold">
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

              {/* Forgot password option */}
              <button
                type="button"
                className={`text-[#123524] text-[1.25rem] font-semibold underline ${resetPasswordLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={handleResetPasswordEmail}
                disabled={resetPasswordLoading}
              >
                {resetPasswordLoading ? "Loading..." : "Forgot Password"}
              </button>

              {/*Following div consist of Signin Button*/}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem]">
                <AuthButton
                  buttonName="Sign In"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>

            {/* Following is the OR Section */}
            <div className="text-[#606060] text-[1.25rem] font-normal">
              - OR -
            </div>

            {/* Following is the Login with Google Section */}
            <button
              className={`lg:w-[13rem] lg:h-[3rem] 2xl:w-[15.1rem] 2xl:h-[4.01379rem] flex justify-evenly items-center bg-[#fff] border-[2px] border-[#8C8C8C] rounded-l-full rounded-r-full ${loadingGoogleLogin ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={handleLoginWithGoogle}
              disabled={loadingGoogleLogin}
            >
              {!loadingGoogleLogin ? (
                <>
                  <div className="lg:w-[1.5rem] lg:h-[1.5rem] 2xl:w-[1.80619rem] 2xl:h-[1.80619rem] relative">
                    <Image
                      src={"/assets/images/AuthImages/auth-Google.svg"}
                      alt="google-auth"
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="font-[Roboto] text-[#1F1F1F] lg:text-[1rem] 2xl:text-[1.18963rem] font-medium">
                    Sign in with Google
                  </div>
                </>
              ) : (
                <ButtonLoadingSign />
              )}
            </button>

            {/* Following is the Sign-up Option */}
            <div className="m-auto mt-[0.5rem]  text-[#123524] lg:text-[1rem] 2xl:text-[1.25rem] font-normal flex">
              <p>Don’t have an account?</p>
              <Link href={"/signup"} className="font-bold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Following div consist of Image */}
      <div className="w-[50%] flex justify-center items-center">
        <div className="lg:w-[30rem] lg:h-[30rem] xl:w-[31rem] xl:h-[31rem] 2xl:w-[42rem] 2xl:h-[42rem] shrink-0 relative rounded-[28px] overflow-hidden">
          <Image
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            src={AuthImage}
            alt="auth-image"
          />
        </div>
      </div>
    </div>
  );
};
