import zod from "zod";

export const SellerDataSchema = zod.object({
  nurseryName: zod
    .string()
    .min(2, { message: "Nursery name must be atleast of 2 characters" }),
  nurseryBio: zod
    .string()
    .min(20, { message: "Bio Must contain atleast 20 characters" }),
  phoneNumber: zod
    .string() // Change to string to handle digit length properly
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must contain only digits" }),
  address: zod
    .string()
    .min(5, { message: "Address must contain atleast of 5 characters " }),
  email: zod.string().email(),
  businesshours: zod
    .string()
    .regex(
      /^((Mon|Tue|Wed|Thu|Fri|Sat|Sun)(-{1}(Mon|Tue|Wed|Thu|Fri|Sat|Sun))?:\s*(1[0-2]|[1-9])(AM|PM)-(1[0-2]|[1-9])(AM|PM))(,\s*((Mon|Tue|Wed|Thu|Fri|Sat|Sun)(-{1}(Mon|Tue|Wed|Thu|Fri|Sat|Sun))?:\s*(1[0-2]|[1-9])(AM|PM)-(1[0-2]|[1-9])(AM|PM)))*$/,
      "Invalid business hours format"
    ),
  location: zod.string().refine((val) => {
    if (val === "") return true;
    if (val.length > 0) {
      try {
        new URL(val);
        return true;
      } catch {
        return true; // Accept any non-empty string, even if not a valid URL
      }
    }
    return false;
  }),
  specialities: zod
    .array(zod.string())
    .min(1, "Select at least one speciality"),
});

export type SellerData = Omit<zod.infer<typeof SellerDataSchema>, "email">;

export type TExploreBySellerData = SellerData & {
  products: string[];
  productCount: number;
};
