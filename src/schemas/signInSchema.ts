import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "Please enter your email" }),
  password: z.string().min(8, { error: "Please enter your password" }),
});
