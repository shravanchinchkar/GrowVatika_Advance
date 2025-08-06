import { resend } from "../lib/resend";
import { v4 as uuidv4 } from "uuid";
import { ApiResponseType } from "@repo/common-types/types";
import NurseryCollaborationEmail from "../emails/successful-collaboration-mail-template";

export async function successfulCollaboration(
  nurseryName: string,
  ownerName: string,
  registrationDate: string,
  email: string,
  verifyCode: string,
  verificationURL: string
): Promise<ApiResponseType> {
  try {
    const { data, error } = await resend.emails.send({
      from: "GrowVatika Support <support@growvatika.live>",
      to: email,
      subject: "Collaboration Successful With GrowVatika ",
      react: NurseryCollaborationEmail({
        nurseryName,
        ownerName,
        registrationDate,
        email,
        verifyCode,
        verificationURL,
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