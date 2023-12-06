import { validateCpf } from "@/utils/validateCpf";
import { z } from "zod";

const SignInSchema = z
  .object({
    cpf: z.string().refine((cpf: string) => validateCpf(cpf.replaceAll(/[^0-9]+/g, '')), "Digite um cpf válido."),
    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
  });

export type SignInType = z.infer<typeof SignInSchema>;

export default SignInSchema;
