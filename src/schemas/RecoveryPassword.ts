import { z } from "zod";
import { validateCpf } from "@/utils/validateCpf";

const RecoveryPasswordSchema = z
  .object({
    cpf: z
      .string()
      .refine(
        (cpf: string) => validateCpf(cpf.replaceAll(/[^0-9]+/g, "")),
        "Digite um cpf válido."
      ),
    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
    confirm: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas devem ser iguais!",
    path: ["confirm"], // path of error
  });

export type RecoveryPasswordType = z.infer<typeof RecoveryPasswordSchema>;

export default RecoveryPasswordSchema;
