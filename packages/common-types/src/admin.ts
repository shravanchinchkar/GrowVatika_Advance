import { z } from "zod";

export const adminSignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must have atleast 2 characters" })
    .max(50, { message: "Name must have atmost 50 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});

export const adminSigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast of 6 characters" }),
});

export type TAdminSignupSchema = z.infer<typeof adminSignupSchema>;
export type TAdminSigninSchema = z.infer<typeof adminSigninSchema>;

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
