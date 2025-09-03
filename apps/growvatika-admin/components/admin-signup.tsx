"use client";
import axios from "axios";
import { useState } from "react";
import Skeleton from "@repo/ui/loading";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { LabelInput, FormType } from "@repo/ui/label-input";
import {
  adminSignupSchema,
  TAdminSignupSchema,
  TApiResponse,
} from "@repo/common-types";

export const AdminSignup = () => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminSignupSchema>({
    resolver: zodResolver(adminSignupSchema),
    defaultValues: {
      assignedBy: session.data?.user.name,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  if (session.status === "loading") {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
  const handleAdminRegistration = async (data: TAdminSignupSchema) => {
    try {
      setLoading(true);
      // If password and confirm-password are not exactly similar then, execute the below block
      if (data.password !== data.confirmPassword) {
        toast.error("Invalid Password", toastStyle);
        setLoading(false);
        return;
      }
      // If both the passwords are correct then execute the following below block
      else {
        const res = await axios.post("/api/admin/createadmin", {
          assignedBy: data.assignedBy,
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        const responseData: TApiResponse = res.data;
        if (responseData.success) {
          toast.success("Admin Created Successfully", toastStyle);
          router.push("/adminpanel");
        } else {
          toast.error("Error while creating admin");
          reset();
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while creating new admin of the nursery", error);
      // Handle axios errors
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          console.log("error.response.data.error:", error.response.data.error);
          toast.error(error.response.data.error, toastStyle);
        } else {
          toast.error(error.message, toastStyle);
        }
      } else {
        toast.error("An unexpected error occurred", toastStyle);
      }
      setLoading(false);
    }
  };

  return (
    <div
      className={
        "w-[40%] h-[80%] border-[1px] border-[#56A430] bg-[#ffffff] flex flex-col items-start p-[1rem] rounded-[1.6rem]"
      }
    >
      <div className="w-[100%] pl-[26%]">
        <SiteLogo />
      </div>
      <form
        className={
          "w-[100%] h-[90%] flex flex-col  justify-between items-center gap-[1rem] px-[1rem]"
        }
        onSubmit={handleSubmit(handleAdminRegistration)}
      >
        {/* assigned by */}
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.assignedBy && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.assignedBy.message}
            </div>
          )}
          <LabelInput
            legendName="Assigned By"
            useType={FormType.AUTH}
            readonly={true}
            value={session.data?.user.name}
            {...register("assignedBy", { required: true })}
          />
        </div>

        {/* Admin Name */}
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.name && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.name.message}
            </div>
          )}
          <LabelInput
            legendName="Name"
            useType={FormType.AUTH}
            placeHolder="Enter your name here"
            {...register("name", { required: true })}
          />
        </div>

        {/* Admin Email */}
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.email && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.email.message}
            </div>
          )}
          <LabelInput
            legendName="Email"
            useType={FormType.AUTH}
            placeHolder="adc@example.com"
            {...register("email", { required: true })}
          />
        </div>

        {/* Password */}
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.password && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
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

        {/* Confirm Password */}
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.confirmPassword && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.confirmPassword.message}
            </div>
          )}
          <LabelInput
            legendName="Confirm Password"
            useType={FormType.AUTH}
            placeHolder="Re-enter your password"
            {...register("confirmPassword", { required: true })}
          />
        </div>

        {/* Create admin button */}
        <div className="w-[100%] h-[12%]">
          <AuthButton buttonName="Sign up" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  );
};
