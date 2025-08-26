import * as z from "zod";

export const UserSchema = z.object({
  email: z.email("Invalid Email Address, Please try again"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .max(15, "Password is too long, Please try again"),
});
