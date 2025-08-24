import zod from "zod";

export const GetStartedFormSchema = zod.object({
  fullName: zod
    .string()
    .min(2, { message: "Name must be atleast of 2 characters" }),
  phoneNumber: zod
    .string() // Change to string to handle digit length properly
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),
  email: zod.string().email(),
  nurseryName: zod
    .string()
    .min(2, { message: "Nursery name must be atleast of 2 characters" }),
  city: zod
    .string()
    .min(2, { message: "City name must be of atleast 2 characters" }),
  termsandconditions: zod.boolean().refine((val) => val === true, {
    path: ["termsandconditions"],
  }),
});

export type TGetStartedFormSchema = zod.infer<typeof GetStartedFormSchema>;
 