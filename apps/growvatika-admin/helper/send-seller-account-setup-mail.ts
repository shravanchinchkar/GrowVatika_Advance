import { v4 as uuidv4 } from "uuid";
import { resend } from "../lib/resend";
import { ApiResponseType } from "@repo/common-types/types";
import SellerAccountSetupMail from "@repo/email-template/seller-account-setup-mail-template";

export async function sellerAccountSetupEmail(
  nurseryName: string,
  email: string
): Promise<ApiResponseType> {
  try {
    const { data, error } = await resend.emails.send({
      from: "GrowVatika Support <support@growvatika.live>",
      to: email,
      subject: "Your GrowVatika Seller Account Setup",
      react: SellerAccountSetupMail({ nurseryName, email }),
      text: `Hello ${nurseryName}, Thankyou for collaborating with GrowVatika.The GrowVatika team has verified you details successfully. To complete your seller account setup, please follow the below mentioned steps:
      Step 1: Copy and past the below link in tablet,laptop or desktop only.
      Step 2: Setup your password and click on Create Account button.Wait until the email verification page opens.
      Step 3: Verify your email by entering the OTP sent to your register email Id.Wait until the signin page opens.
      Step 4: Signin using the email and password.Wait until the seller dashboard opens.
      Step 5: Fill all the required details in the seller dashboard to start publishing your products.
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
    return { success: true, message: "Account setup mail Send Successfully" };
  } catch (error) {
    console.error("Error Sending account setup Email!", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
