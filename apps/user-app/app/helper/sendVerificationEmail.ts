import { resend } from "../lib/resend";
import { v4 as uuidv4 } from "uuid"; 
import { ApiResponseType } from "@repo/common-types/types";
import VerificationEmail from "../../emails/email-verification-template-2";

export async function sendVerificationEmail(
  name: string,
  email: string,
  verifyCode: string
): Promise<ApiResponseType> {
  try {
    const { data, error } = await resend.emails.send({
      from: "GrowVatika Support <support@growvatika.live>",
      to: email,
      subject: "Your GrowVatika Verification Code",
      react: VerificationEmail({ name, verifyCode }),
      text: `Hello ${name},Thank you for registering with GrowVatika. To complete your account setup, please verify your email address using this verification code: ${verifyCode}
      This code is valid for 2 minutes.
      Best Regards,
      GrowVatika Team
      https://growvatika.live`,
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
        // errorCode: error.statusCode,
        timestamp: new Date().toISOString(),
      });
      return {
        success: false,
        message: `Failed to send email: ${error.message}`,
      };
    }
    console.log("Email sent successfully:", {
      messageId: data?.id,
      recipient: email,
      timestamp: new Date().toISOString(),
    });
    return { success: true, message: "Verification mail Send Successfully" };
  } catch (emailError) {
    console.error("Error Sending Verification Email!", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
