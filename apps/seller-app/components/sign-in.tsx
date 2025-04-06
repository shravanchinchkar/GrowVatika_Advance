"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { LabelInput } from "@repo/ui/label-input";
import { AuthButton } from "@repo/ui/auth-button";
import { feSigninInputs } from "@repo/common-types/types";
import { toastStyle } from "@repo/shared/utilfunctions";

export const SellerSignin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signInInputs, setSignInInputs] = useState<feSigninInputs>({
    email: "",
    password: "",
  });
  const [signInError, setSignInError] = useState(false);

  // Function to handle Seller Signin
  async function handleSellerSignin() {
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

  return (
    <div className="w-screen h-screen bg-[#FFF6F4] flex font-[Poppins]">
      {/* Following is the left side div which consist of Image */}
      <div className="w-[50%] flex justify-center items-center">
        <div className="lg:w-[30rem] lg:h-[30rem] xl:w-[31rem] xl:h-[31rem] 2xl:w-[42rem] 2xl:h-[42rem] shrink-0 rounded-[28px] overflow-hidden bg-[url(/assets/images/AuthImages/seller-signin.png)] bg-cover bg-no-repeat border-[1px] border-[#8C8C8C]">
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

      {/* Following is the right side div */}
      <div className={"w-[50%] flex flex-col gap-[1rem] lg:mt-[0.2rem]"}>
        {/* Following div consist of site logo*/}
        <div className="flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <div>
            <SiteLogo />
          </div>
        </div>

        {/* Following div consist of welcome message, signin error message, signin form , and signup message */}
        <div className="flex flex-col gap-[2rem] items-start pl-[6.5rem] mt-[1rem]">
          {/* Following div consist of welcome message */}
          <div className="font-bold flex flex-col gap-0">
            <p className="text-[#000] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] ">
              Sign in to your account
            </p>
            <p className="text-[#606060] w-[23rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Enter your credentials to access your seller dashboard
            </p>
          </div>

          {/* Following div consist of signin error message, signin form , and signup message */}
          <div className="flex flex-col items-center">
            {/* Signin Error message */}
            {signInError ? (
              <div className="w-[100%] flex justify-center">
                <div className="w-[20rem] bg-red-500 p-[0.5rem] text-[#fff] font-semibold text-center shadow-md">
                  Invalid Credentials!
                </div>
              </div>
            ) : null}

            {/* Signin Form */}
            <form
              className={`h-max flex flex-col items-center gap-[1.5rem] lg:mt-[0.5rem] ${signInError ? "2xl:mt-[0rem]" : "2xl:mt-[2rem]"}`}
            >
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
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-[3.56894rem]">
                <AuthButton
                  buttonName="Sign In"
                  onClick={handleSellerSignin}
                  loading={loading}
                />
              </div>
            </form>

            {/* Signup message */}
            <div className=" mt-[1.3rem] text-[#123524] text-[1.25rem] font-normal flex">
              <p>Don't have a seller account?</p>
              <Link href={"/register"} className="font-bold">
                Register here
              </Link>
            </div>
          </div>

          {/* Copyright div */}
          <div
            className="flex flex-col ml-[4rem] mt-[1rem] text-[#8C8C8C] text-[1.25rem] font-normal"
          >
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
