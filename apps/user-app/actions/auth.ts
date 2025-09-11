"use server";

// Following is the backend SignUp route
import client from "@repo/db/client";
import { hashPassword } from "../utils/hash";
import { getIp } from "../helper/get-ip-address";
import {
  authRateLimit,
  getStartedFromLimit,
  resetPasswordLimit,
} from "../lib/rate-limit";
import { getUserByEmail } from "../services/user.service";
import { getExpiryDate } from "@repo/shared/utilfunctions";
import { generateVerifyCode } from "@repo/shared/utilfunctions";
import {
  SignUpInputs,
  SignUpSchema,
  SignupResponse,
  EmailOnlySchema,
  ApiResponseType,
  TGetStartedFormSchema,
  GetStartedFormSchema,
  SignInInputs,
  TEmailOnlySchema,
  SignInSchema,
} from "@repo/common-types/types";
import {
  emailVerification,
  resetPasswordEmail as resetPasswordEmailService,
  successfulCollaborationService,
} from "@/services/email.services";

interface VerifyCodeProps {
  email?: string;
  userVerifyCode: string;
}

// Following server action is used for signup
export async function signup(
  signupCredentials: SignUpInputs
): Promise<SignupResponse> {
  //validate the user's input
  const validateInput = SignUpSchema.safeParse(signupCredentials);

  // If the user's input is incorrect execute the below code
  if (!validateInput.success) {
    console.error("errors:", validateInput.error.flatten().fieldErrors);
    return {
      success: false,
      errors: "Invalid Inputs",
      status: 400,
    };
  }

  //If the signup request count goes beyond 5 within 5 minutes,then block the user for 5 minutes
  const IpAddress = await getIp(); //get the Ip address of the user
  const { success } = await authRateLimit.limit(IpAddress);
  if (!success) {
    console.error("Signup Limit Exhausted,try again after Miinutes");
    return {
      success: false,
      errors: "Sigup Limit Exhausted,Try again after 5 minutes!",
      status: 429,
    };
  } else {
    try {
      const { email, confirmPassword, name } = validateInput.data;

      //check if the user already exists
      const existingUserByEmail = await getUserByEmail(email);

      const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
      const expiryDate = getExpiryDate();

      //If the user already exists then evaluate the user as follows:
      if (existingUserByEmail) {
        //If the user already exists and is verified
        if (existingUserByEmail.isVerified) {
          console.error("Email already in use", existingUserByEmail);
          return { success: false, errors: "Email already in use" };
        }

        //If the user already exists but is not verified
        else {
          const hashedPassword = await hashPassword(confirmPassword!);

          await client.user.update({
            where: { email },
            data: {
              password: hashedPassword,
              verifyCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });

          // Send verification email for the unverified user
          const emailResponse = await emailVerification(
            name || "",
            email,
            verifyCode
          );

          // If error while sending email
          if (!emailResponse.success) {
            console.error("email not send message:", emailResponse.message);
            return { success: false, errors: emailResponse.message };
          }

          // If success in sending email
          return {
            success: true,
            message: "User updated successfully. Please verify your email",
          };
        }
      }
      // If the user is new then execute the following block
      else {
        const hashedPassword = await hashPassword(confirmPassword!);

        const newUser = await client.user.create({
          data: {
            name: name || "",
            email: email,
            password: hashedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
          },
        });
        // If new fresh user can't be created then
        if (!newUser) {
          console.error("Please try again! Can't create the account");
          return {
            success: false,
            errors: "Please try again! Can't create the account",
          };
        }

        // If the new fresh user is created, then send an otp to the user's email to verify
        const emailResponse = await emailVerification(
          newUser.name,
          newUser.email,
          verifyCode
        );

        // If error while sending email to the new user
        if (!emailResponse.success) {
          console.error(
            "new user created email not send message:",
            emailResponse.message
          );
          return { success: false, errors: emailResponse.message };
        }

        // If success in sending email to the new user
        return {
          success: true,
          message: "User registered successfully. Please verify your email",
        };
      }
    } catch (err) {
      console.error("error while Signup! please try again", err);
      return { success: false, errors: "Error while signup! Please try again" };
    }
  }
}

//Following is the server action that sends reset password email
export async function resetPasswordEmail(
  email: TEmailOnlySchema
): Promise<ApiResponseType> {
  //Validate the input type
  const validateInput = EmailOnlySchema.safeParse(email);

  if (!validateInput) {
    return { success: false, error: "Invalid Email" };
  }
  //If the resetPassword request count goes beyond 2 within 5 minutes,then block the user for 5 minutes
  const IpAddress = await getIp(); //get the Ip address of the user
  const { success } = await resetPasswordLimit.limit(IpAddress);

  if (!success) {
    console.error("ResetPassword Limit Exhausted,try again after 5 Minutes");
    return {
      success: false,
      error: "ResetPassword Limit Exhausted,try again after 5 Minutes!",
      status: "429",
    };
  } else {
    try {
      const existingUserByEmail = await getUserByEmail(validateInput.data!);

      if (!existingUserByEmail) {
        return {
          success: false,
          error: `user with email ${validateInput.data} not found!`,
        };
      }
      const emailResponse = await resetPasswordEmailService(
        validateInput.data || "",
        existingUserByEmail.id
      );

      // If error while sending email
      if (!emailResponse.success) {
        return { success: false, error: emailResponse.message };
      }
      // If success in sending email
      return {
        success: true,
        message: "Reset Password email send successfully!",
      };
    } catch (error) {
      console.error("Error while sending reset password link", error);
      return {
        success: false,
        error: "Error while sending reset password link",
      };
    }
  }
}

// following is the server action that gets the email of the user, who wants to reset there password
export async function getUserEmail(id: string): Promise<ApiResponseType> {
  try {
    if (!id || id === "") {
      return { success: false, error: "Invalid Id" };
    } else {
      const existingUser = await client.user.findUnique({
        where: {
          id,
        },
      });
      if (!existingUser) {
        return { success: false, error: `user with id ${id} dose not exists` };
      }
      return { success: true, userEmail: existingUser.email };
    }
  } catch (error) {
    console.error("error while getting the user eamil address:", error);
    return { success: false };
  }
}

//following server action resets the passwords of the user
export async function resetPassword(
  resetPasswordData: SignInInputs
): Promise<ApiResponseType> {
  //Validate input
  const validateInput = SignInSchema.safeParse(resetPasswordData);
  if (!validateInput) {
    return { success: false, error: "Invalid Data" };
  }
  // If the inputs are valid then
  else {
    try {
      // Check if the user exists in the User table
      const existingUserByEmail = await getUserByEmail(
        validateInput.data?.email!
      );

      // If the user dose not exists return the error message
      if (!existingUserByEmail) {
        return { success: false, error: "User Not Found" };
      }

      // If the user exists, then hash the new password and store it in db
      else {
        const hashedPassword = await hashPassword(
          validateInput.data?.confirmPassword!
        );

        const updateExistingUser = await client.user.update({
          where: {
            email: existingUserByEmail.email,
          },
          data: {
            password: hashedPassword,
          },
        });

        if (!updateExistingUser) {
          return {
            success: false,
            error: "Error while updating the user password",
          };
        }

        return { success: true, message: "Password Updated Successfully" };
      }
    } catch (error) {
      console.error("Error While updating the user's password");
      return { success: false, error: "error while updating the password" };
    }
  }
}

// Following is the server action to verify the otp entered by the user
export async function verifyCode({
  email,
  userVerifyCode,
}: VerifyCodeProps): Promise<SignupResponse> {
  try {
    const existingUserByEmail = await getUserByEmail(email!);

    // If the email dose not exists then
    if (!existingUserByEmail) {
      console.error("verify user not found!");
      return { success: false, errors: "User not found!", status: 400 };
    }

    const currentTime = new Date();
    if (
      !existingUserByEmail.verifyCode ||
      !existingUserByEmail.verifyCodeExpiry ||
      existingUserByEmail.verifyCode !== userVerifyCode ||
      currentTime > existingUserByEmail.verifyCodeExpiry
    ) {
      console.error("Invalid OTP");
      return { success: false, errors: "Invalid or expired OTP" };
    }

    const updateUser = await client.user.update({
      where: { email: email },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    });

    if (!updateUser) {
      console.error("Error While Updating Verified User");
      return { success: false, errors: "Error While Updating Verified User" };
    }
    return { success: true, message: "Email verified successfully" };
  } catch (err) {
    console.error("Error verifying end-user otp");
    return {
      success: false,
      errors: "Error verifying end-user otp",
      status: 500,
    };
  }
}

// Following is the server action to resend the otp to the user
export async function resendOTP({
  email,
}: {
  email: string;
}): Promise<SignupResponse> {
  try {
    //Get the requested user from db
    const existingUserByEmail = await getUserByEmail(email);

    // If user not found
    if (!existingUserByEmail) {
      return { success: false, errors: "User not found" };
    }
    //If user is already Verified
    if (existingUserByEmail.isVerified) {
      return { success: false, message: "User already verified" };
    }

    // Generate new OTP and new expiry time
    const newOTP = generateVerifyCode();
    const expiryDate = getExpiryDate();

    // Upadate the user with newOTP and new expiryDate
    await client.user.update({
      where: { email: email },
      data: {
        verifyCode: newOTP,
        verifyCodeExpiry: expiryDate,
      },
    });

    //Resend the OTP to the which is to be verified
    const emailResponse = await emailVerification(
      existingUserByEmail.name,
      existingUserByEmail.email,
      newOTP
    );

    // If fail to send mail
    if (!emailResponse.success) {
      console.error("resend email not send message:", emailResponse.message);
      return { success: false, errors: emailResponse.message };
    }
    // If success in send mail
    return {
      success: true,
      message: "New OTP sent successfully. Please verify your email",
    };
  } catch (error) {
    console.error("Error while resending OTP", error);
    return { success: false, message: "Not able to resend otp" };
  }
}

// Following server action is used to store data in google sheets
export async function storeGetStartedFormDetails(
  userDetails: TGetStartedFormSchema
): Promise<ApiResponseType> {
  //  First Validate the input
  const validateInput = GetStartedFormSchema.safeParse(userDetails);

  if (!validateInput.success) {
    return { success: false, error: "Invalid Inputs" };
  }

  //If the form request count goes beyond 5 within 5 minutes,then block the user for 5 minutes
  const IpAddress = await getIp(); //get the Ip address of the user

  const { success } = await getStartedFromLimit.limit(IpAddress);
  if (!success) {
    console.error("GetStarted form Limit Exhausted try again after 5 minutes");
    return {
      success: false,
      error: "Limit Exhausted try again after 5 minutes!",
      status: "429",
    };
  }
  // If above everything succeed then execute the following block
  else {
    const { email, city, fullName, nurseryName, phoneNumber } =
      validateInput.data;

    try {
      const existingSellerByEmail = await client.seller.findUnique({
        where: { email },
      });

      //If the seller already exists then evaluate the seller as follows:
      if (existingSellerByEmail) {
        //If the seller already exists and is verified
        if (existingSellerByEmail.isVerified) {
          console.error(
            "Seller Email already in use",
            existingSellerByEmail.email
          );
          return { success: false, error: "Seller Email already exists" };
        }

        //If the seller already exists but is not verified
        else {
          await client.seller.update({
            where: { email },
            data: {
              fullName,
              nurseryName,
              phoneNumber,
              address: city,
            },
          });

          // Send verification email for the unverified seller
          const emailResponse = await successfulCollaborationService(
            nurseryName,
            fullName,
            email
          );

          // If error while sending email
          if (!emailResponse.success) {
            console.error("email not send message:", emailResponse.message);
            return { success: false, message: emailResponse.message };
          }

          // If success in sending email
          return {
            success: true,
            message: "Email send to the seller successsfully!",
          };
        }
      } else {
        //If the Seller Email address is unique then store the details of the seller in the database

        const createNewSeller = await client.seller.create({
          data: {
            fullName,
            nurseryName,
            email,
            phoneNumber,
            password: "",
            address: city,
          },
        });

        if (!createNewSeller) {
          console.error("New Seller cannot be created");
          return {
            success: false,
            error: "New Seller cannot be created in the database",
          };
        }

        //Send a successful collaboration mail to the end user
        const emailResponse = await successfulCollaborationService(
          nurseryName,
          fullName,
          email
        );

        // If error while sending email
        if (!emailResponse.success) {
          console.error("email not send message:", emailResponse.message);
          return { success: false, message: emailResponse.message };
        }
        return {
          success: true,
          message: "Form submitted successfully",
        };
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: "error",
      };
    }
  }
}
