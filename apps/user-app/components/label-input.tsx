// "use client";

import { useState } from "react";
import Image from "next/image";

interface LabelInputProps {
  name?: string;
  value?: any;
  legendName: string;
  placeHolder?: string;
  useType: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const LabelInput = ({
  name,
  value,
  legendName,
  placeHolder,
  useType,
  onChange,
}: LabelInputProps) => {
  const [viewPassword, setViewPassword] = useState(false);

  const handlePasswordVisibility = () => {
    if (viewPassword === false) {
      setViewPassword(true);
    } else {
      setViewPassword(false);
    }
  };

  return (
    <div className="font-[Poppins]">
      <fieldset
        className={
          useType === "sellerForm"
            ? "w-[100%] h-[100%] px-[2rem] border-[2px] border-[#fff] rounded-[6.5625rem] flex gap-[1rem] pb-[0.5rem]"
            : useType === "authForm"
              ? "w-[100%] h-[100%] px-[1rem]  border-[2px] text-[#8C8C8C] border-[#8C8C8C] rounded-[6.5625rem] flex items-center gap-[1rem] pb-[0.5rem]"
              : ""
        }
      >
        <legend
          className={
            useType === "sellerFrom"
              ? "text-[1.125rem] text-[#123524] font-normal"
              : useType === "authForm"
                ? "text-[0.99138rem] text-[#8C8C8C] font-medium"
                : ""
          }
        >
          {legendName}
        </legend>

        {/* w-[100%] */}
        <input
          className={`${legendName === "Password" ? "w-[130%]" : "w-[100%]"}  pl-[0.4rem] bg-transparent text-[#8C8C8C] outline-none text-[1.25rem] font-normal  rounded-l-full rounded-r-full`}
          type={
            legendName === "Phone Number"
              ? "tel"
              : legendName === "Password" && viewPassword === false
                ? "password"
                : legendName === "Password" && viewPassword === true
                  ? "text"
                  : "text"
          }
          name={name}
          value={value}
          placeholder={placeHolder}
          onChange={onChange}
        />

        {legendName === "Password" && (
          <button
            type="button"
            className="w-[3rem] h-[2rem] relative border-none outline-none"
            onClick={handlePasswordVisibility}
          >
            {viewPassword === false ? (
              <Image
                src="/assets/images/AuthImages/eye_close.svg"
                alt="eye_open"
                fill
              />
            ) : (
              <Image
                src="/assets/images/AuthImages/eye_open.svg"
                alt="eye_open"
                fill
              />
            )}
          </button>
        )}
      </fieldset>
    </div>
  );
};
