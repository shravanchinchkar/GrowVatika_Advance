"use server";

// Following is the backend SignUp route
import bcrypt from "bcrypt";
import { google } from "googleapis";
import client from "@repo/db/client";
import { JWT } from "google-auth-library";
import { getIp } from "../helper/get-ip-address";
import { getExpiryDate } from "@repo/shared/utilfunctions";
import { generateVerifyCode } from "@repo/shared/utilfunctions";
import { getCurrentFormattedDate } from "@repo/shared/utilfunctions";
import { authRateLimit, getStartedFromLimit } from "../lib/rate-limit";
import { sendVerificationEmail } from "../helper/sendVerificationMail";
import { sendResendPasswordMail } from "../helper/sendResetPasswordMail";
import { successfulCollaboration } from "../helper/successfulCollaborationMail";
import {
  SignUpInputs,
  SignUpSchema,
  SignupResponse,
  EmailOnlySchema,
  ApiResponseType,
  GetStartedFromInput,
  GetStartedFromSchema,
  SignInInputs,
  TEmailOnlySchema,
  SignInSchema,
} from "@repo/common-types/types";

interface VerifyCodeProps {
  email?: string;
  userVerifyCode: string;
}

// Following server action is used for signup
export async function signup(
  signupCredentials: SignUpInputs
): Promise<SignupResponse> {
  //validate the user's input
  const result = SignUpSchema.safeParse(signupCredentials);
  // If the user's input is incorrect execute the below code
  if (!result.success) {
    console.error("errors:", result.error.flatten().fieldErrors);
    return {
      success: false,
      errors: "Invalid Inputs",
      status: 400,
    };
  }

  //If the signup request count goes beyond 5 within 5 minutes,the block the user for 5 minutes
  const IpAddress = await getIp(); //get the Ip address of the user
  console.log("Ip address is:", IpAddress);
  const { success, pending, limit, reset, remaining } =
    await authRateLimit.limit(IpAddress);
  if (!success) {
    console.error("Signup Limit Exhausted,try again after");
    return {
      success: false,
      errors: "Sigup Limit Exhausted,Try again after 5 minutes!",
      status: 429,
    };
  } else {
    try {
      console.log("remaining:", remaining);
      //check if the user already exists
      const existingUserByEmail = await client.user.findUnique({
        where: {
          email: result.data.email,
        },
      });

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
          console.log("Email exists but not verified!", existingUserByEmail);
          const hashPassword = await bcrypt.hash(
            result.data.confirmPassword || "",
            10
          );
          await client.user.update({
            where: { email: result.data.email },
            data: {
              password: hashPassword,
              verifyCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });

          // Send verification email for the unverified user
          const emailResponse = await sendVerificationEmail(
            result.data.name || "",
            result.data.email,
            verifyCode
          );
          // If error while sending email
          if (!emailResponse.success) {
            console.log("email not send message:", emailResponse.message);
            return { success: false, errors: emailResponse.message };
          }
          console.log("email success message:", emailResponse);

          // If success in sending email
          return {
            success: true,
            message: "User updated successfully. Please verify your email",
          };
        }
      } else {
        // If the user doesn't exists create the new fresh user
        const hashPassword = await bcrypt.hash(
          result.data.confirmPassword || "",
          10
        );
        const newUser = await client.user.create({
          data: {
            name: result.data.name || "",
            email: result.data.email,
            password: hashPassword,
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

        console.log("New User Created", newUser);
        // If the new fresh user is created, then send an otp to the user's email to verify
        const emailResponse = await sendVerificationEmail(
          newUser.name,
          newUser.email,
          verifyCode
        );

        // If error while sending email to the new user
        if (!emailResponse.success) {
          console.log(
            "new user created email not send message:",
            emailResponse.message
          );
          return { success: false, errors: emailResponse.message };
        }

        // If success in sending email to the new user
        console.log(
          "new user created email send message:",
          emailResponse.message
        );
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
  } else {
    try {
      const emailResponse = await sendResendPasswordMail(validateInput.data || "");
      // If error while sending email
      if (!emailResponse.success) {
        console.log("Can't send reset password link", emailResponse.message);
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

//following server action resets the passwords of the user
export async function resetPassword(
  resetPasswordData: SignInInputs
): Promise<ApiResponseType> {
  console.log("Reset password inputs:",resetPasswordData)
  //Validate input
  const validateInput = SignInSchema.safeParse(resetPasswordData);
  if (!validateInput) {
    return { success: false, error: "Invalid Data" };
  }
  // If the inputs are valid then
  else {
    try {
      // Check if the user exists in the User table
      const existingUser = await client.user.findUnique({
        where: { email: validateInput.data?.email },
      });

      console.log("Reset Password input result:",validateInput)
      // If the user dose not exists return the error message
      if (!existingUser) {
        return { success: false, error: "User Not Found" };
      }
      // If the user exists, then hash the new password and store it in db
      else {
        const hashPassword = await bcrypt.hash(
          validateInput.data?.confirmPassword || "",
          10
        );
        const updateExistingUser = await client.user.update({
          where: {
            email: existingUser.email,
          },
          data: {
            password: hashPassword,
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
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("Verify Code user exists", user);

    // If the email dose not exists then
    if (!user) {
      console.error("verify user not found!");
      return { success: false, errors: "User not found!", status: 400 };
    }

    const currentTime = new Date();
    if (
      !user.verifyCode ||
      !user.verifyCodeExpiry ||
      user.verifyCode !== userVerifyCode ||
      currentTime > user.verifyCodeExpiry
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
    const user = await client.user.findFirst({
      where: { email: email },
    });

    // If user not found
    if (!user) {
      return { success: false, errors: "User not found" };
    }
    //If user is already Verified
    if (user.isVerified) {
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
    const emailResponse = await sendVerificationEmail(
      user.name,
      user.email,
      newOTP
    );

    // If fail to send mail
    if (!emailResponse.success) {
      console.log("resend email not send message:", emailResponse.message);
      return { success: false, errors: emailResponse.message };
    }
    // If success in send mail
    console.log("resend email send message:", emailResponse.message);
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
export async function storeDataInExcel(
  userDetails: GetStartedFromInput
): Promise<ApiResponseType> {
  //  First Validate the input
  const validateInput = GetStartedFromSchema.safeParse(userDetails);
  if (!validateInput.success) {
    return { success: false, error: "Invalid Inputs" };
  }

  //If the form request count goes beyond 5 within 5 minutes,the block the user for 5 minutes
  const IpAddress = await getIp(); //get the Ip address of the user
  console.log("Ip address is:", IpAddress);
  const { success, pending, limit, reset, remaining } =
    await getStartedFromLimit.limit(IpAddress);
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
    console.log("remaining:",remaining);
    try {
      console.log("User Details:", userDetails);
      const existingSellerByEmail = await client.seller.findUnique({
        where: { email: validateInput.data.email },
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
          const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
          const expiryDate = getExpiryDate();

          console.log("Email exists but not verified!", existingSellerByEmail);
          await client.seller.update({
            where: { email: validateInput.data.email },
            data: {
              firstName: "",
              lastName: "",
              nurseryName: validateInput.data.nurseryName,
              phoneNumber: validateInput.data.phoneNumber,
              password: "",
              verifyCode: verifyCode,
              verifyCodeExpiry: expiryDate,
            },
          });

          // Send verification email for the unverified seller
          const emailResponse = await successfulCollaboration(
            validateInput.data.nurseryName,
            validateInput.data.fullName,
            getCurrentFormattedDate(),
            userDetails.email,
            verifyCode
          );

          // If error while sending email
          if (!emailResponse.success) {
            console.log("email not send message:", emailResponse.message);
            return { success: false, message: emailResponse.message };
          }

          console.log("email success message:", emailResponse);
          // If success in sending email
          return {
            success: true,
            message:
              "Email verification mail send to the seller successsfully!",
          };
        }
      } else {
        //If the Seller Email address is unique then first store the details of the seller in the google spread sheet

        // Load credentials from environment variables or a secure config
        const credentials = {
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        };

        // Authenticate with Google
        const auth = new JWT({
          email: credentials.email,
          key: credentials.key,
          scopes: credentials.scopes,
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Spreadsheet ID from your Google Sheet URL
        const spreadsheetId = process.env.SPREADSHEET_ID;

        // Prepare the data to be inserted
        const values = [
          [
            validateInput.data.fullName,
            validateInput.data.phoneNumber,
            validateInput.data?.email,
            validateInput.data.nurseryName,
            validateInput.data.city,
          ],
        ];

        // Append data to the spreadsheet
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet1!A:D", // Adjust range based on your sheet structure
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values,
          },
        });

        //After Storing the seller's data in the spread sheet, then store the data in the db
        console.log("Current Date is:", getCurrentFormattedDate());
        const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
        const expiryDate = getExpiryDate();

        const createNewSeller = await client.seller.create({
          data: {
            firstName: "",
            lastName: "",
            nurseryName: validateInput.data.nurseryName,
            email: validateInput.data.email,
            phoneNumber: validateInput.data.phoneNumber,
            password: "",
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
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
        const emailResponse = await successfulCollaboration(
          validateInput.data.nurseryName,
          validateInput.data.fullName,
          getCurrentFormattedDate(),
          userDetails.email,
          verifyCode
        );

        // If error while sending email
        if (!emailResponse.success) {
          console.log("email not send message:", emailResponse.message);
          return { success: false, message: emailResponse.message };
        }

        console.log("email success message:", emailResponse);
        return {
          success: true,
          message: "Form submitted successfully",
          status: response.statusText,
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
