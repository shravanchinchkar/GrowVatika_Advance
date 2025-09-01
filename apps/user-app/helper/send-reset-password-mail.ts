import { v4 as uuidv4 } from "uuid";
import { resend } from "../lib/resend";
import { ApiResponseType } from "@repo/common-types/types";
import ResetPasswordMailTemplate from "@repo/email-template/reset-password-mail-template";

export async function sendResendPasswordMail(
  email: string
): Promise<ApiResponseType> {
  try {
    const { data, error } = await resend.emails.send({
      from: "GrowVatika Support <noreply@growvatika.live>",
      to: email,
      subject: "Reset Password link for your growvatika account",
      react: ResetPasswordMailTemplate({ email }),
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
        message: "Failed to send reset password email",
      };
    }
    console.log("Email sent successfully:", {
      messageId: data?.id,
      recipient: email,
      timestamp: new Date().toISOString(),
    });
    return { success: true, message: "reset password mail send successfully" };
  } catch (error) {
    console.error("Error Sending Reset Password Mail!", error);
    return { success: false, error: "Failed to send reset password email" };
  }
}
