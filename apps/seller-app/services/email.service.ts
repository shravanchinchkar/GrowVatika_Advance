import { sendVerificationEmail } from "../helper/send-verification-mail";

export async function sellerEmailVerification(
  fullName: string,
  email: string,
  verifyCode: string
) {
  const emailResponse = await sendVerificationEmail(
    fullName,
    email,
    verifyCode
  );
  return emailResponse;
}
