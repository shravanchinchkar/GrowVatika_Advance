"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { SiteLogo } from "@repo/ui/brand-logo";
import { useSearchParams } from "next/navigation";
import { toastStyle } from "@repo/shared/utilfunctions";

export const ResetPasswordMsg = () => {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  useEffect(() => {
    if (email === "") {
      toast.error("Invalid email", toastStyle);
    }
  }, []);

  return (
    <div className="flex justify-center pt-[1rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <div className="w-[80%] text-[1.5rem] font-[Poppins] font-semibold text-[#123524] text-center">
          <p>
            A password reset link has been sent to your registered{" "}
            <span className="underline">{email}</span> address. Please check
            your inbox and follow the instructions to reset your password.
          </p>
          <p>Thank you for using Growvatika.</p>
        </div>
      </div>
    </div>
  );
};
