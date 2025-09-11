import { sendResetPassword } from "@/helper/send-reset-password-mail";
import { sendVerificationEmail } from "@/helper/send-verification-mail";
import { getCurrentFormattedDateTimeString } from "@repo/shared/utilfunctions";
import { sendSignInSuccessfulMail } from "@/helper/send-signin-successful-mail";
import { successfulCollaboration } from "@/helper/send-successful-collaboration-mail";

export async function emailVerification(
  name: string,
  email: string,
  verifyCode: string
) {
  const emailResponse = await sendVerificationEmail(name, email, verifyCode);
  return emailResponse;
}

export async function resetPasswordEmail(email: string, id: string) {
  const emailResponse = await sendResetPassword(email, id);
  return emailResponse;
}

export async function successfulCollaborationService(
  nurseryName: string,
  fullName: string,
  email: string
) {
  const emailResponse = await successfulCollaboration(
    nurseryName,
    fullName,
    getCurrentFormattedDateTimeString(),
    email
  );
  return emailResponse;
}

export async function signinSuccessfulEmail(
  username: string,
  email: string,
  accountType: string,
  ipAddress: string,
  signintime: string,
  location: string
) {
  const emailResponse = await sendSignInSuccessfulMail({
    username,
    email,
    accountType,
    ipAddress,
    signintime,
    location,
  });
  return emailResponse;
}
