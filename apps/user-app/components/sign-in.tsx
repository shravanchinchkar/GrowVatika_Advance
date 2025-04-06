"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { feSigninInputs } from "@repo/common-types/types";
import { toastStyle } from "../app/lib/toast-style";
import { SiteLogo } from "@repo/ui/brand-logo";
import { LabelInput } from "@repo/ui/label-input";
import { AuthButton } from "@repo/ui/auth-button";
import AuthImage from "../public/assets/images/AuthImages/AuthImages.png";
import { ButtonLoadingSign } from "@repo/ui/loading-sign";

export const Sign_In = () => {
  const router = useRouter();
  const [signInInputs, setSignInInputs] = useState<feSigninInputs>({
    email: "",
    password: "",
  });
  const [signInError, setSignInError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);

  // Handle Login with credentials
  async function handleLogIn() {
    setLoading(true);
    const res = await signIn("credentials", {
      email: signInInputs.email,
      password: signInInputs.password,
      redirect: false,
    });

    console.log("Response to FE:", res);
    setLoading(false);

    if (res?.error) {
      const errorResponse = JSON.parse(res.error) as {
        success: boolean;
        message?: string;
        error?: string;
        status?: string;
      };
      console.log("signin  error :", errorResponse);
      setSignInError(true);
      toast.error("Signin Failed", toastStyle);
    } else if (res?.ok) {
      // Check session to determine verification status
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();
      console.log("session in signin:", session);

      if (session?.user?.isVerified) {
        console.log("Email already Verified signin successful!");
        toast.success("Signin successful!", toastStyle);
        router.push("/");
      } else {
        console.log("Email not verified, redirecting to verify!");
        router.push(`/verify?email=${signInInputs.email}`);
      }
    }
  }

  // Handle Login with google
  async function handleLoginWithGoogle() {
    try {
      console.log("Google hit!");
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
          toastStyle
        );
      } else if (result?.ok) {
        toast.success("Sign-in Successful", toastStyle);
        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("An unexpected error occurred during sign-in", toastStyle);
    }
  }

  return (
    <div className="w-screen h-screen bg-[#FFF6F4] flex font-[Poppins]">
      <div className="w-[50%] flex flex-col gap-[1rem]">
        {/* Following div consist of site logo */}
        <div className="flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <div>
            <SiteLogo />
          </div>
        </div>

        <div className="flex flex-col items-start pl-[6.5rem] mt-[2rem]">
          {/* Following div consist of welcome message */}
          <div className="font-bold flex flex-col gap-0">
            <p className="text-[#000] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem]">
              Hello there!
            </p>
            <p className="text-[#606060] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Ready to Grow Green?
            </p>
          </div>

          {/* Following div consist of Signup Form, OR and Signin with google option */}
          <div
            className={`h-max flex flex-col items-center gap-[1rem] lg:mt-[0.2rem] ${!signInError ? "2xl:mt-[2rem]" : "2xl:mt-0"}`}
          >
            {signInError ? (
              <div className="w-[30rem] bg-red-500 p-[1rem] text-[#fff] font-semibold text-center shadow-md">
                Invalid Credentials!
              </div>
            ) : null}

            {/* Signin form */}
            <form className="w-max h-max flex flex-col items-start gap-[1.5rem]">
              {/* Following is the Email Input Field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-[3.56894rem]">
                <LabelInput
                  legendName="Email"
                  useType="authForm"
                  placeHolder="Enter your email here"
                  name="email"
                  value={signInInputs.email}
                  onChange={(e) => {
                    setSignInError(false);
                    setSignInInputs({
                      ...signInInputs,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Following is the Password Input Field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-[3.56894rem]">
                <LabelInput
                  legendName="Password"
                  useType="authForm"
                  placeHolder="Enter your password here"
                  name="password"
                  value={signInInputs.password}
                  onChange={(e) => {
                    setSignInError(false);
                    setSignInInputs({
                      ...signInInputs,
                      password: e.target.value,
                    });
                  }}
                />
              </div>

              {/* Login Button */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem] 2xl:w-[30.1875rem] 2xl:h-[3.56894rem]">
                <AuthButton
                  buttonName="Sign In"
                  onClick={handleLogIn}
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
            <div
              className={`m-auto ${signInError ? "mt-0" : "mt-[2rem]"} text-[#123524] lg:text-[1rem] 2xl:text-[1.25rem] font-normal flex`}
            >
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
