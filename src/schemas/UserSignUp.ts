import { z } from "zod";

const SignUpSchema = z
  .object({
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
    birthDate: z.date(),
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(6, "Password must be atleast 6 characters"),
    confirmPassword: z.string().min(6, "Password must be atleast 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

export type SignUpProps = z.infer<typeof SignUpSchema>;

export default SignUpSchema;
