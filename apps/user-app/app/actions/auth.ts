"use server";

// Following is the backend SignUp route
import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { getExpiryDate } from "@repo/shared/utilfunctions";
import { generateVerifyCode } from "@repo/shared/utilfunctions";
import { getCurrentFormattedDate } from "@repo/shared/utilfunctions";
import { sendVerificationEmail } from "../helper/sendVerificationEmail";
import { successfulCollaboration } from "../helper/successful-Collaboration-Mail";
import {
  UserDetails,
  ApiResponseType,
  SignupResponse,
  beSignupInputs,
  feSignupInputs,
} from "@repo/common-types/types";

interface VerifyCodeProps {
  email?: string;
  userVerifyCode: string;
}

// Following server action is used for signup
export async function signup(
  signupCredentials: feSignupInputs
): Promise<SignupResponse> {
  console.log("User Credentials:", signupCredentials);

  const result = beSignupInputs.safeParse(signupCredentials); //validate the user's input
  // If the user's input is correct execute the below code
  if (!result.success) {
    //if user's input is not valid, return the
    console.log("errors:", result.error.flatten().fieldErrors);
    const errors = result.error.format().email?._errors;
    console.log("email errors:", errors);
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      status: 400,
    };
  }

  try {
    //check if the user already exists
    const existingUserByEmail = await client.user.findUnique({
      where: {
        email: signupCredentials.email,
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
        const hashPassword = await bcrypt.hash(signupCredentials.password, 10);
        await client.user.update({
          where: { email: signupCredentials.email },
          data: {
            password: hashPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
          },
        });

        // Send verification email for the unverified user
        const emailResponse = await sendVerificationEmail(
          signupCredentials.name || "",
          signupCredentials.email,
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
          message: "User updated successfully. Please verify your email",
        };
      }
    } else {
      // If the user doesn't exists create the new fresh user
      const hashPassword = await bcrypt.hash(signupCredentials.password, 10);
      const newUser = await client.user.create({
        data: {
          name: signupCredentials.name || "",
          email: signupCredentials.email,
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
          message: "Please try again! Can't create the account",
        };
      }

      console.log("New User Created", newUser);

      // If the new fresh user is created, then send an otp to the user's email to verify
      const emailResponse = await sendVerificationEmail(
        newUser.name,
        newUser.email,
        verifyCode
      );
      // If error while sending email
      if (!emailResponse.success) {
        console.log(
          "new user created email not send message:",
          emailResponse.message
        );
        return { success: false, message: emailResponse.message };
      }
      // If success in sending email
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
    return { success: false, message: "Error while signup! Please try again" };
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
  userDetails: UserDetails
): Promise<ApiResponseType> {
  try {
    console.log("User Details:", userDetails);

    const existingSellerByEmail = await client.seller.findUnique({
      where: { email: userDetails.email },
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
          where: { email: userDetails.email },
          data: {
            firstName: "",
            lastName: "",
            nurseryName: userDetails.nurseryName,
            phoneNumber: userDetails.phoneNumber,
            password: "",
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
          },
        });

        // Send verification email for the unverified seller
        const emailResponse = await successfulCollaboration(
          userDetails.nurseryName,
          userDetails.fullName,
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
          message: "Email verification mail send to the seller successsfully!",
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
          userDetails.fullName,
          userDetails.phoneNumber,
          userDetails.email,
          userDetails.nurseryName,
          userDetails.city,
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
          nurseryName: userDetails.nurseryName,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
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
        userDetails.nurseryName,
        userDetails.fullName,
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
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: "error",
    };
  }
}
