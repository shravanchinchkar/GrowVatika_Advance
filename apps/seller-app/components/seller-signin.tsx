"use client";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SiteLogo } from "@repo/ui/brand-logo";
import { AuthButton } from "@repo/ui/auth-button";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastStyle } from "@repo/shared/utilfunctions";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { SignInInputs, SignInSchema } from "@repo/common-types/types";

export const SellerSignin = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // Get the userTimezone in client side
  const userTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (session?.user) {
      const sellerId = session.user.id;
      redirect(`/sellerdashboard?id=${sellerId}`);
    }
  }, []);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInInputs>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to handle Seller Signin
  async function handleSellerSignin(data: SignInInputs) {
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      userTimezone: userTimezone,
      redirect: false,
    });
    setLoading(false);

    // If error
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
        console.error("User Signin error response to FE :", errorResponse.error);
      } catch (parseError) {
        // If JSON parsing fails, use the raw error message
        console.error("Seller SignIn error:", res.error);
        errorMessage = "Internal Server Error!";
      }
      toast.error(errorMessage, toastStyle);
    }
    //If Successful signin
    else if (res?.ok) {
      setValue("email", "");
      setValue("password", "");

      // Check session to determine verification status
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();
      const sellerId = session.user.id;
      if (session?.user?.isVerified) {
        toast.success("Signin successful!", toastStyle);
        router.push(`/sellerdashboard?id=${sellerId}`);
      } else {
        router.push(`/verify?email=${data.email}`);
      }
    }
  }

  return (
    <div className="w-screen min-h-screen max-h-max bg-[#FFF6F4] flex font-[Poppins]">
      {/* Following is the left side div which consist of Image */}

      <div className="w-[50%] flex justify-center items-center">
        <div className="lg:w-[30rem] lg:h-[36rem] new-lg:w-[34rem] xl:w-[37rem]  2xl:w-[42rem] 2xl:h-[42rem] shrink-0 rounded-[28px] overflow-hidden bg-[url(/assets/images/AuthImages/seller-signin.png)] bg-cover bg-no-repeat border-[1px] border-[#8C8C8C]">
          <div className="mx-auto flex flex-col items-center text-[#606060] mt-[2rem]">
            <h1 className="lg:text-[1.5rem] new-lg:text-[1.7rem] xl:text-[1.8rem] 2xl:text-[2rem] font-bold w-[32rem] text-center">
              Nursery For Everyone
            </h1>
            <p className="lg:w-[27rem] new-lg:w-[30rem] xl:w-[32rem] 2xl:w-[38rem] lg:text-[1rem] new-lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.5rem] lg:leading-[1.5rem] 2xl:leading-[1.9rem] text-center font-semibold">
              Welcome back to your seller dashboard. Manage your plant
              inventory, track orders, and grow your business.
            </p>
          </div>
        </div>
      </div>

      {/* Following is the right side div */}
      <div className={"w-[50%] flex flex-col gap-[1rem]"}>
        {/* Following div consist of site logo*/}
        <div className="flex flex-col items-start gap-[2rem] pl-[2rem] pt-[1rem]">
          <div>
            <SiteLogo />
          </div>
        </div>

        {/* Following div consist of welcome message, signin error message, signin form , and signup message */}
        <div
          className={`flex flex-col items-start pl-[6.5rem] mt-[1rem] ${errors.email || errors.password ? "gap-[0rem]" : "gap-[1rem]"}`}
        >
          {/* Following div consist of welcome message */}
          <div className="font-bold flex flex-col gap-0">
            <p className="text-[#000] lg:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2rem] ">
              Sign in to your account {userTimezone}
            </p>
            <p className="text-[#606060] w-[23rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
              Enter your credentials to access your seller dashboard
            </p>
          </div>

          {/* Following div consist of  signin form , and signup message */}
          <div className="flex flex-col items-center">
            {/* Signin Form */}
            <form
              onSubmit={handleSubmit(handleSellerSignin)}
              className={`h-max flex flex-col items-center gap-[1rem] lg:mt-[0.5rem] ${errors.email || errors.password ? "2xl:mt-[1rem]" : "2xl:mt-[2rem]"}`}
            >
              {/* Following is the Email Input Field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-max">
                {errors.email && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
                    {errors.email.message}
                  </div>
                )}
                <LabelInput
                  legendName="Business Email"
                  useType={FormType.AUTH}
                  placeHolder="Enter your email here"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Following is the Password Input Field */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-max">
                {errors.password && (
                  <div className="ml-[1rem] text-red-500 font-bold text-start">
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

              {/* Login Button */}
              <div className="lg:w-[23rem] lg:h-[3rem] xl:w-[28rem]  2xl:w-[30.1875rem] 2xl:h-[3.56894rem] mt-[0.5rem]">
                <AuthButton
                  type="submit"
                  buttonName="Sign In"
                  loading={loading}
                />
              </div>
            </form>

            {/* Signup message */}
            <div className=" mt-[1.3rem] text-[#123524] lg:text-[1rem] xl:text-[1.25rem] font-normal flex gap-[0.5rem]">
              <p>Don't have a seller account?</p>
              <Link href={"/register"} className="font-bold">
                Register here
              </Link>
            </div>
          </div>

          {/* Copyright div */}
          <div className="flex flex-col lg:ml-[2rem] xl:ml-[4rem] mt-[2.5rem] text-[#8C8C8C] lg:text-[1rem] xl:text-[1.25rem] font-normal">
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
