"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { resendOTP } from "../actions/auth";
import { toastStyle } from "@repo/shared/utilfunctions";
import { SignupResponse } from "@repo/common-types/types";
import { formatCountdown } from "@repo/shared/utilfunctions";

export const VerifyCodeFooter = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [disableResendMail, setdisableResendMail] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setdisableResendMail(false);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const handleResendOTP = async () => {
    setLoading(true);
    setdisableResendMail(true);
    const res: SignupResponse = await resendOTP({ email });
    setTimeLeft(120);
    setLoading(false);
    if (res.errors) {
      toast.error("resend failed", toastStyle);
    } else if (res.message === "User already verified") {
      toast.success("User already verified", toastStyle);
    } else {
      toast.success("Mail send!", toastStyle);
    }
  };
  const formattedTime = formatCountdown(timeLeft);

  return (
    <div className="flex items-center justify-between w-[29rem] rounded-[28px] mt-[2.5rem]">
      <div className="ml-[1rem]">{formattedTime}</div>

      <div className="w-[8rem] h-[2.5rem]">
        <button
          className={`group w-[100%] h-[100%] border-[1.605px] rounded-[2.10294rem] bg-[#56A430] shadow-custom-boxshadow backdrop-blur-[6.408869743347168px] text-[#FFF6F4] new-sm-1:text-[1rem] md:text-[1.1rem] lg:text-[1rem] font-poppins font-normal uppercase ${disableResendMail ? "uppercase cursor-not-allowed" : "transition-transform duration-300 ease-in-out hover:bg-[#123524] hover:bg-none hover:font-bold hover:border-none uppercase cursor-pointer"}`}
          disabled={disableResendMail}
          onClick={handleResendOTP}
        >
          <div
            className={`w-[100%] h-[100%] rounded-[2.10294rem] ${!disableResendMail && "group-hover:bg-none"}  flex justify-center items-center bg-button-custom-gradient`}
          >
            {!loading ? "Resend" : "Loading..."}
          </div>
        </button>
      </div>
    </div>
  );
};
