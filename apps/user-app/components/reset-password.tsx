"use client";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { SignInInputs, SignInSchema } from "@repo/common-types";

export const ResetPasswordComponent = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const searchPearamsEmail = searchParams?.get("email") || "";
  const router = useRouter();

  useEffect(() => {
    console.log("reset password useEffect")
    if (searchPearamsEmail === "") {
      toast.error("Invalid Email", toastStyle);
    }
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: searchPearamsEmail,
      password: "",
      confirmPassword: "",
    },
  });

  async function handleResetPassword(data: SignInInputs) {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      toast.error("Invalid Password", toastStyle);
      setLoading(false);
    } else {
      const response = await resetPassword(data);
      console.log("Reset Password Response:",response);
      if (response.error) {
        toast.error(response.error.toString(), toastStyle);
        setValue("password", "");
        setValue("confirmPassword", "");
        setLoading(false);
      } else if (response.success) {
        router.push("/signin");
      }
    }
  }

  return (
    <div className="bg-[#FFF6F4] w-screen h-screen flex justify-center items-center font-[Poppins]">
      {/* Following is the main card section */}
      <div className="w-[35rem] h-[35rem] rounded-[28px] border-[2px] border-[#56A430] shadow-md flex flex-col gap-[2rem] items-center pt-[1rem] bg-white">
        {/* Following div consist of SiteLogo and heading message */}
        <div className="flex flex-col items-center gap-[1rem]">
          <div className="mr-[2.5rem]">
            <SiteLogo />
          </div>
          <div className="text-[#123524] flex flex-col items-center gap-[0.2rem]">
            <h1 className="text-xl font-bold">
              Reset the password for your account
            </h1>
            <div className="flex flex-col items-center">
              <p className="font-semibold underline">
                shravanchinchkar@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Following div consist of reset password form */}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="w-[70%] flex flex-col gap-[1rem]"
        >
          {/* Input field for email */}
          <div>
            {errors.email && (
              <div className="ml-[1rem] text-red-500 font-bold text-start">
                {errors.email.message}
              </div>
            )}
            <LabelInput
              legendName="Email"
              useType={FormType.AUTH}
              placeHolder="Enter your business email here"
              {...register("email", { required: true })}
              readonly={true}
            />
          </div>

          {/* Input field for password */}
          <div>
            {errors.password && (
              <div className="ml-[1rem] text-red-500 font-bold text-start">
                {errors.password.message}
              </div>
            )}
            <LabelInput
              legendName="New Password"
              useType={FormType.AUTH}
              placeHolder="Enter new password"
              {...register("password", { required: true })}
            />
          </div>

          {/* Input field to re-enter the passowrd */}
          <div>
            {errors.confirmPassword && (
              <div className="ml-[1rem] text-red-500 font-bold text-start">
                {errors.confirmPassword.message}
              </div>
            )}
            <LabelInput
              legendName="Confirm Password"
              useType={FormType.AUTH}
              placeHolder="Re-enter the password"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          {/* Button */}
          <div className="w-[100%] h-[3.5rem]">
            <AuthButton
              type="submit"
              buttonName="Reset Password"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
