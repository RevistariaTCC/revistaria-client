import { z } from "zod";

const SignUpSchema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    birthdate: z.date().refine((data) => data < new Date(), 'Data de nascimento deve ser valida'),
    phone: z.string(),
    email: z.string().min(1, "E-mail é obrigatório").email(),
    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
    confirm: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
    newsletter: z.boolean().optional(),
    interests: z.string().array().optional(),
  }).refine((data) => data.password === data.confirm, {
    message: "As senhas devem ser iguais!",
    path: ["confirm"], // path of error
  });

export type SignUpType = z.infer<typeof SignUpSchema>;

export default SignUpSchema;
