import { z } from "zod";

export const adminSignupSchema = z.object({
  assignedBy: z
    .string()
    .min(2, { message: "Name must have atleast 2 characters" }),
  name: z
    .string()
    .min(2, { message: "Name must have atleast 2 characters" })
    .max(50, { message: "Name must have atmost 50 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});

export const adminSigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});

export const adminResetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
  confirmNewPassword: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});

export type TAdminSignupSchema = z.infer<typeof adminSignupSchema>;
export type TAdminSigninSchema = z.infer<typeof adminSigninSchema>;
export type TAdminResetPasswordSchema = z.infer<
  typeof adminResetPasswordSchema
>;

export type TAdminDashboardNurseriesData = {
  id: string;
  email: string;
  address: string;
  fullName: string;
  adminName: string;
  phoneNumber: string;
  nurseryName: string;
  isSuspended: boolean;
  isAdminVerified: boolean;
  isRemoved: boolean;
  profilePictureURL: string | null;
};
