import { v4 as uuidv4 } from "uuid";
import { resend } from "../lib/resend";
import { ApiResponseType } from "@repo/common-types/types";
import SignInEmailTemplate from "@repo/email-template/signin-successful-mail-template";

interface SignInSuccessfulProps {
  username: string;
  email: string;
  accountType: string;
  signintime: string;
  ipAddress: string;
  location: string;
}

export async function sendSignInSuccessfulMail({
  username,
  email,
  accountType,
  signintime,
  ipAddress,
  location,
}: SignInSuccessfulProps): Promise<ApiResponseType> {
  try {
    const { data, error } = await resend.emails.send({
      from: "GrowVatika Support <noreply@growvatika.live>",
      to: email,
      subject: "GrowVatika Signin Successful",
      react: SignInEmailTemplate({
        username,
        accountType,
        signintime,
        ipAddress,
        location,
      }),
      headers: {
        "X-Entity-Ref-ID": uuidv4(),
      },
      tags: [
        {
          name: "category",
          value: "verification",
        },
      ],
    });
    if (error) {
      console.error("Resend API Error:", {
        errorMessage: error.message,
        timestamp: new Date().toISOString(),
      });
      return {
        success: false,
        message: "Failed to send signin successful email",
      };
    }
    console.log("Email sent successfully:", {
      messageId: data?.id,
      recipient: email,
      timestamp: new Date().toISOString(),
    });
    return {
      success: true,
      message: "signin successful mail send successfully",
    };
  } catch (error) {
    console.error("Error Sending Signin Successful Mail!", error);
    return { success: false, error: "Failed to signin successful email" };
  }
}
