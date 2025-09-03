"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { act, useEffect, useReducer } from "react";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  adminResetPasswordSchema,
  TAdminResetPasswordSchema,
  TApiResponse,
} from "@repo/common-types";
import Skeleton from "@repo/ui/loading";

type TResetPasswordFrom = {
  loading: boolean;
  adminEmail: string;
  fetchingData: boolean;
  error: string;
};

const reducer = (
  state: TResetPasswordFrom,
  action: any
): TResetPasswordFrom => {
  switch (action.type) {
    case "SET_FETCHING_FALSE":
      return { ...state, fetchingData: false };
    case "LOADING":
      return { ...state, loading: true };
    case "SET_LOADING_FALSE":
      return { ...state, loading: false };
    case "ERROR":
      return { ...state, error: action.payload };
    case "SET_ADMIN_EMAIL":
      return { ...state, adminEmail: action.payload };
    default:
      return state;
  }
};

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [state, dispatch] = useReducer<TResetPasswordFrom, any>(reducer, {
    loading: false,
    fetchingData: true,
    adminEmail: "",
    error: "",
  });

  const router = useRouter();
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TAdminResetPasswordSchema>({
    resolver: zodResolver(adminResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // backend call to get admin email
  useEffect(() => {
    const getAdminEmail = async () => {
      try {
        const res = await axios.get(`/api/admin/getadminemail?adminId=${id}`);
        const responseData = res.data;
        console.log("response data:", responseData);
        if (responseData.success && responseData.adminEmail) {
          setValue("email", responseData.adminEmail);
          dispatch({
            type: "SET_ADMIN_EMAIL",
            payload: responseData.adminEmail,
          });
        }
      } catch (error) {
        console.log("Error fetching adminEmail:", error);
        // Handle axios errors
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.error) {
            console.log("error:", error.response.data.error);
            dispatch({
              type: "ERROR",
              payload: error.response.data.error,
            });
          } else {
            dispatch({
              type: "ERROR",
              payload: error.message,
            });
          }
        } else {
          dispatch({
            type: "ERROR",
            payload: "An unexpected error occurred",
          });
        }
        dispatch({ type: "SET_LOADING_FALSE" });
      }
      dispatch({ type: "SET_FETCHING_FALSE" });
    };
    if (!id) {
      console.log("id", !id);
      dispatch({ type: "SET_FETCHING_FALSE" });
      return;
    }
    getAdminEmail();
  }, []);

  const handleAdminResetPassword = async (data: TAdminResetPasswordSchema) => {
    try {
      dispatch({ type: "LOADING" });
      if (data.newPassword !== data.confirmNewPassword) {
        toast.error("Invalid Confirm Password", toastStyle);
        return;
      }
      const res = await axios.patch(`/api/admin/resetadminpassword`, {
        email: data.email,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });
      const responseData: TApiResponse = res.data;
      console.log("response:", responseData);

      if (responseData.success && responseData.message) {
        toast.success(responseData.message, toastStyle);
        reset();
        router.push("/");
      }
    } catch (error) {
      console.log("Error fetching adminEmail:", error);
      // Handle axios errors
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          console.log("error:", error.response.data.error);
          dispatch({
            type: "ERROR",
            payload: error.response.data.error,
          });
        } else {
          dispatch({
            type: "ERROR",
            payload: error.message,
          });
        }
      } else {
        dispatch({
          type: "ERROR",
          payload: "An unexpected error occurred",
        });
      }
    }
    dispatch({ type: "SET_LOADING_FALSE" });
  };

  if (state.fetchingData) {
    return <Skeleton />;
  }
  if (state.error) {
    return <div className="font-poppins">{state.error}</div>;
  }
  return (
    <div className="w-[40%] h-[60%] rounded-[1.6rem] border-[1px] border-[#56A430] bg-[#ffffff] flex flex-col items-start p-[1rem]">
      {/* Header Section */}
      <div className="w-[100%] pl-[26%]">
        <SiteLogo />
      </div>
      <form
        className="w-[100%] h-[90%] flex flex-col  justify-between items-center gap-[1rem] px-[1rem]"
        onSubmit={handleSubmit(handleAdminResetPassword)}
      >
        {/* Email */}
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.email && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.email.message}
            </div>
          )}
          <LabelInput
            legendName="Email"
            useType={FormType.AUTH}
            readonly={true}
            value={state.adminEmail}
            {...register("email", { required: true })}
          />
        </div>
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.newPassword && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.newPassword.message}
            </div>
          )}
          <LabelInput
            legendName="New Password"
            placeHolder="Enter your password here"
            useType={FormType.AUTH}
            {...register("newPassword", { required: true })}
          />
        </div>
        <div className="w-[100%] min-h-[3rem] max-h-max">
          {errors.confirmNewPassword && (
            <div className="w-[90%] new-sm:text-[0.875rem] md:text-[1rem] px-[1rem] text-red-500 font-bold">
              {errors.confirmNewPassword.message}
            </div>
          )}
          <LabelInput
            legendName="Confirm Password"
            placeHolder="Re-enter your password"
            useType={FormType.AUTH}
            {...register("confirmNewPassword", { required: true })}
          />
        </div>
        <div className="w-[100%] h-[20%]">
          <AuthButton buttonName="Reset Password" loading={state.loading} />
        </div>
      </form>
    </div>
  );
};
