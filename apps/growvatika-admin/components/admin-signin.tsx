"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { adminSigninSchema, TAdminSigninSchema } from "@repo/common-types";

export const AdminSignin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminSigninSchema>({
    resolver: zodResolver(adminSigninSchema),
    defaultValues: { email: "", password: "" },
  });


  const handleAdminSignin = async (data: TAdminSigninSchema) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
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
        console.error("Admin Signin error response:", errorResponse.error);
      } catch (parseError) {
        // If JSON parsing fails, use the raw error message
        console.error("Signin error:", res.error, parseError);
        errorMessage = "Internal Server Error!";
      }
      toast.error(errorMessage, toastStyle);
    } else if (res?.ok) {
      // Check session to determine verification status
      setValue("email", "");
      setValue("password", "");
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();
      if (session?.user) {
        toast.success("Signin successful!", toastStyle);
        router.push(`/adminpanel`);
      }
    }
  };
  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-[1rem] justify-center items-center">
      <div className="w-[35%] h-[60%] rounded-[1.6rem] border-[1px] border-[#56A430] bg-[#ffffff] flex flex-col items-start p-[1rem]">
        {/* Header Section */}
        <div className="w-[100%] h-[30%] flex flex-col items-center justify-between">
          <div className="w-[100%] pl-[20%]">
            <SiteLogo />
          </div>
          <h1 className="uppercase font-unbounded text-[1.5rem] text-[#123524]">
            GrowVatika Super Admin
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(handleAdminSignin)}
          className="w-[100%] h-[70%] flex flex-col gap-[1rem] justify-center items-center px-[1rem]"
        >
          <div className="w-[100%]">
            {errors.email && (
              <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
                {errors.email.message}
              </div>
            )}
            <LabelInput
              legendName="Email"
              useType={FormType.AUTH}
              placeHolder="adc@example.com"
              {...register("email")}
            />
          </div>
          <div className="w-[100%]">
            {errors.password && (
              <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
                {errors.password.message}
              </div>
            )}
            <LabelInput
              legendName="Password"
              useType={FormType.AUTH}
              placeHolder="Enter your password here"
              {...register("password")}
            />
          </div>
          <div className="w-[100%] h-[25%]">
            <AuthButton buttonName="Sign in" type="submit" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};
