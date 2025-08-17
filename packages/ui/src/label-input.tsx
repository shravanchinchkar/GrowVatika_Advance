import { useState } from "react";
import Image from "next/image";

export enum FormType {
  AUTH = "authForm",
  Seller = "sellerForm",
}

interface LabelInputProps {
  name?: string;
  value?: any;
  legendName: string;
  placeHolder?: string;
  useType: FormType;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly?: boolean;
  props?: any;
  fieldSetClassName?: string;
  legendClassName?: string;
}

export const LabelInput = ({
  name,
  value,
  legendName,
  placeHolder,
  useType,
  onChange,
  readonly,
  fieldSetClassName,
  legendClassName,
  ...props
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
          useType == FormType.Seller
            ? fieldSetClassName
            : useType == FormType.AUTH
              ? `w-[100%] h-[100%] px-[1rem] border-[2px] text-[#8C8C8C] border-[#8C8C8C] rounded-[6.5625rem] flex items-center gap-[1rem] pb-[0.5rem] ${readonly ? "cursor-not-allowed" : "cursor-default"}`
              : ""
        }
      >
        <legend
          className={
            useType === FormType.Seller
              ? legendClassName
              : useType === FormType.AUTH
                ? "new-sm:text-[0.875rem] md:text-[0.99138rem] text-[#8C8C8C] font-medium"
                : ""
          }
        >
          {legendName}
        </legend>
        <input
          className={`
            ${legendName === "Password" ? "w-[130%]" : readonly ? "cursor-not-allowed w-[100%]" : "w-[100%]"} 
            placeholder:text-[#8C8C8C] new-sm:placeholder:text-[1rem] md:placeholder:text-[1rem] lg:placeholder:text-[1.25rem] pl-[0.4rem]  text-[#0B1320] outline-none new-sm:text-[1rem] md:text-[1.1rem] font-normal rounded-l-full rounded-r-full bg-transparent`}
          type={
            legendName === "Phone Number"
              ? "tel"
              : (legendName.includes("Password") ||
                    legendName === "Confirm Password") &&
                  viewPassword === false
                ? "password"
                : legendName === "Password" && viewPassword === true
                  ? "text"
                  : legendName === "Business Email"
                    ? "email"
                    : "text"
          }
          name={name}
          value={value}
          placeholder={placeHolder}
          onChange={onChange}
          readOnly={readonly}
          {...props}
        />

        {legendName.includes("Password") ||
        legendName === "Confirm Password" ? (
          <button
            type="button"
            className="new-sm:w-[2rem] new-sm:h-[2rem] md:w-[3rem] md:h-[2rem] relative border-none outline-none"
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
        ) : null}
      </fieldset>
    </div>
  );
};
