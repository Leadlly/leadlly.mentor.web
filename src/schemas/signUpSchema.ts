import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(4, { error: "Please enter your full name" }),
  email: z.email({ error: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters!" }),
});
