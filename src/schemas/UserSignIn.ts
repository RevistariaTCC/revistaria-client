import { z } from "zod";

const SignInSchema = z
  .object({
    email: z.string().min(1, "E-mail é obrigatório").email(),
    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
  });

export type SignInType = z.infer<typeof SignInSchema>;

export default SignInSchema;
