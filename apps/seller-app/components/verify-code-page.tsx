"use client";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { verifyCode } from "../app/actions/auth";
import { useSearchParams } from "next/navigation";
import { AuthButton } from "@repo/ui/auth-button";
import { toastStyle } from "@repo/shared/utilfunctions";
import { SignupResponse } from "@repo/common-types/types";
import { VerifyCodeFooter } from "./verify-code-footer";

export const VerifyCodePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [userVerifyCode, setUserVerifyCode] = useState("");

  let toastId: string;

  useEffect(() => {
    toastId = toast.loading("Verify Your Email", toastStyle);
    return () => {
      toast.dismiss(toastId);
    };
  }, []);

  const handelVerifyCode = async () => {
    setLoading(true);
    const res: SignupResponse = await verifyCode({ email, userVerifyCode });
    console.log("verify code response to FE", res);
    setLoading(false);
    if (res.errors) {
      if (res.errors === "User not found!") {
        toast.error("Invalid User!", toastStyle);
      } else if (res.errors === "Invalid or expired OTP") {
        toast.error("Invalid or expired OTP", toastStyle);
      } else if (
        res.errors === "Error verifying user" ||
        res.errors === "Error While Updating Verified User"
      ) {
        toast.error("Error verifying user", toastStyle);
      }
    } else if (res.success) {
      if (
        res.message === "Seller's Email verified successfully in first step"
      ) {
        console.log("seller verify response:",res.message);
        toast.success("Email verified!", toastStyle);
        router.push(`/register?email=${encodeURIComponent(email)}`);
      } else if (
        res.message === "Seller's Email verified successfully in 2nd step"
      ) {
        console.log("seller verify response:",res.message);
        toast.success("Email Verified!", toastStyle);
        router.push("/signin");
      }
    }
  };

  return (
    <div className="bg-[#FFF6F4] w-screen h-screen flex justify-center items-center font-[Poppins]">
      <div className="w-[30rem] h-[30rem] rounded-[28px] border-[2px] border-[#56A430] shadow-md flex flex-col gap-[2rem] items-center pt-[1rem] bg-white">
        <div className="mr-[2.5rem]">
          <SiteLogo />
        </div>
        <div className="text-[#123524] flex flex-col items-center gap-[0.5rem]">
          <h1 className="text-3xl font-bold">We need to verify you</h1>
          <div className="flex flex-col items-center">
            <p className="w-[100%] text-center text-sm">
              Enter the code GrowVatika send to
            </p>
            <p className="font-semibold">{email}</p>
          </div>
        </div>

        <div className="mt-[1rem] flex flex-col gap-[0.3rem] items-center text-[#123524]">
          <p className="font-medium">Enter Your OTP:</p>
          <input
            className="font-[Poppins] lg:w-[11rem] xl:w-[17.3125rem] h-[1.8125rem] border-[2px] border-[#56A430] text-center outline-none placeholder:font-[Poppins] lg:text-[1rem] xl:text-[1.1rem] px-[2rem] py-[1.5rem] rounded-[28px] text-[#123524] text-3xl"
            type="text"
            value={userVerifyCode}
            onChange={(e) => {
              setUserVerifyCode(e.target.value);
            }}
          />
          <div className="w-[15rem] h-[3rem] mt-[0.5rem]">
            <AuthButton
              buttonName="Continue"
              onClick={handelVerifyCode}
              loading={loading}
            />
          </div>
          <VerifyCodeFooter email={email} />
        </div>
      </div>
    </div>
  );
};
