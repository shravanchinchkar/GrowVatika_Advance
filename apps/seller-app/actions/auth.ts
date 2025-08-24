"use server";
import bcrypt from "bcrypt";
import client from "@repo/db/client";
import {
  SignUpInputs,
  SignupResponse,
  SignUpSchema,
} from "@repo/common-types/types";
import { getIp } from "../helper/get-ip-address";
import { authRateLimit } from "../lib/rate-limit";
import { sendVerificationEmail } from "../helper/send-verification-mail";
import { generateVerifyCode, getExpiryDate } from "@repo/shared/utilfunctions";

interface VerifyCodeProps {
  email?: string;
  userVerifyCode: string;
}

// Register the new Seller
export async function sellerRegistration(
  registrationCredentials: SignUpInputs
): Promise<SignupResponse> {
  // First Validate the Inputs
  const validateInput = SignUpSchema.safeParse(registrationCredentials);
  if (!validateInput.success) {
    return { success: false, errors: "Invalid Inputs" };
  }

  //If the count of signup request goes beyond 5 wihin 5 minutes then  the user gets blocked for 5 minutes, following is its logic
  const IpAddress = await getIp();
  const { success } = await authRateLimit.limit(IpAddress);
  if (!success) {
    console.error("Signup Limit Exhausted,try again after 5 minutes.");
    return {
      success: false,
      errors: "Sigup Limit Exhausted,Try again after 5 minutes!",
      status: 429,
    };
  } else {
    try {
      const sellerExists = await client.seller.findUnique({
        where: {
          email: registrationCredentials.email,
        },
      });
      if (!sellerExists) {
        return {
          success: false,
          errors: "Invalid Seller Email Id",
        };
      }
      //If the seller already exists then evaluate the seller as follows:
      else {
        //If the seller already exists and is not verified
        if (!sellerExists.isVerified) {
          const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
          const expiryDate = getExpiryDate();

          const hashPassword = await bcrypt.hash(
            registrationCredentials.confirmPassword || "",
            10
          );

          const createNewSeller = await client.seller.update({
            where: {
              email: sellerExists.email,
            },
            data: {
              password: hashPassword,
              verifyCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });

          if (!createNewSeller) {
            console.error("Error while creating new seller");
            return {
              success: false,
              errors: "Please try again :(",
            };
          }

          const emailResponse = await sendVerificationEmail(
            sellerExists.fullName,
            sellerExists.email,
            verifyCode
          );

          // If error while sending email
          if (!emailResponse.success) {
            return { success: false, message: emailResponse.message };
          }

          return {
            success: true,
            message: "Seller Created Successfully. Please verify your email",
          };
        }
        //The seller exists and is verified
        else {
          const hashPassword = await bcrypt.hash(
            registrationCredentials.confirmPassword || "",
            10
          );
          const createNewSeller = await client.seller.update({
            where: {
              email: sellerExists.email,
            },
            data: {
              password: hashPassword,
            },
          });

          if (!createNewSeller) {
            console.error("Error while creating new seller");
            return {
              success: false,
              errors: "Please try again! Can't create the seller account",
            };
          }
          return {
            success: true,
            message: "Seller account created successfully!",
          };
        }
      }
    } catch (error) {
      console.error("Error while registrating seller", error);
      return {
        success: false,
      };
    }
  }
}

// Following is the server action to verify the otp entered by the user
export async function verifyCode({
  email,
  userVerifyCode,
}: VerifyCodeProps): Promise<SignupResponse> {
  try {
    const existingSeller = await client.seller.findUnique({
      where: {
        email: email,
      },
    });

    // If the email dose not exists then
    if (!existingSeller) {
      console.error("verify user not found!");
      return { success: false, errors: "User not found!", status: 400 };
    }

    const currentTime = new Date();
    if (
      !existingSeller.verifyCode ||
      !existingSeller.verifyCodeExpiry ||
      existingSeller.verifyCode !== userVerifyCode ||
      currentTime > existingSeller.verifyCodeExpiry
    ) {
      console.error("Invalid OTP");
      return { success: false, errors: "Invalid or expired OTP" };
    }

    // If the entered OTP is correct then update the seller
    const updateSeller = await client.seller.update({
      where: { email: email },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    });

    if (!updateSeller) {
      console.error("Error While Updating Verified seller");
      return { success: false, errors: "Error While Updating Verified seller" };
    }

    if (!updateSeller.password) {
      return {
        success: true,
        message: "Seller's Email verified successfully in first step",
      };
    }
    return {
      success: true,
      message: "Seller's Email verified successfully in 2nd step",
    };
  } catch (err) {
    console.error("Error verifying end-user otp", err);
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
    const seller = await client.seller.findFirst({
      where: { email: email },
    });

    // If user not found
    if (!seller) {
      return { success: false, errors: "User not found" };
    }
    //If user is already Verified
    if (seller.isVerified) {
      return { success: false, message: "User already verified" };
    }

    // Generate new OTP and new expiry time
    const newOTP = generateVerifyCode();
    const expiryDate = getExpiryDate();

    // Upadate the user with newOTP and new expiryDate
    await client.seller.update({
      where: { email: email },
      data: {
        verifyCode: newOTP,
        verifyCodeExpiry: expiryDate,
      },
    });

    //Resend the OTP to the which is to be verified
    const emailResponse = await sendVerificationEmail(
      seller.fullName,
      seller.email,
      newOTP
    );

    // If fail to send mail
    if (!emailResponse.success) {
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
