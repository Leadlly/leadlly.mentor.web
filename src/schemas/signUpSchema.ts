import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(4, { message: "Please enter your full name" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters!" }),
    role: z.enum(["teacher", "mentor"], {
      message: "Please select a role",
    }),
    instituteCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "teacher" && !data.instituteCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Institute code is required for teachers",
        path: ["instituteCode"],
      });
    }
  });
