import { z } from "zod";

const SignUpSchema = z
  .object({
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
    birthdate: z.date().refine((data) => data < new Date(), 'Birthdate must be in the passed'),
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(6, "Password must be atleast 6 characters"),
    confirm: z.string().min(6, "Password must be atleast 6 characters"),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export type SignUpType = z.infer<typeof SignUpSchema>;

export default SignUpSchema;
