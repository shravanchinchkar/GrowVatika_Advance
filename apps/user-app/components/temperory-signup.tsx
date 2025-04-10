"use client";
import { AuthButton } from "@repo/ui/auth-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LabelInput, FormType } from "@repo/ui/label-input";
import { SignUpInputs, SignUpSchema } from "@repo/common-types/types";

export const TemporarySignUp = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleUserSignup: SubmitHandler<SignUpInputs> = (
    data: SignUpInputs
  ) => {
    console.log("data is:", data);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#FFF6F4]">
      <form
        onSubmit={handleSubmit(handleUserSignup)}
        className="border-[2px] w-[350px] h-[400px] flex flex-col gap-[1rem]"
      >
        <div>
          {errors.name && (
            <div className="text-red-500 border-[2px]">
              {errors.name.message}
            </div>
          )}
          <LabelInput
            legendName="Name"
            useType={FormType.AUTH}
            {...register("name", { required: true })}
          />
        </div>

        <div>
          {errors.email && (
            <div className="text-red-500 border-[2px]">
              {errors.email.message}
            </div>
          )}
          <LabelInput
            legendName="Email"
            useType={FormType.AUTH}
            {...register("email", { required: true })}
          />
        </div>

        <div>
          {errors.password && (
            <div className="text-red-500 border-[2px]">
              {errors.password.message}
            </div>
          )}
          <LabelInput
            legendName="Password"
            useType={FormType.AUTH}
            {...register("password", { required: true })}
          />
        </div>

        <div className="h-[4rem] mt-[0.5rem]">
          <AuthButton buttonName="Sign up" type="submit" />
        </div>
      </form>
    </div>
  );
};
