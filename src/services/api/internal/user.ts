import { fetchData } from "./api";
import { SignUpType } from "@/schemas/UserSignUp";

//QUANDO CRIAR UMA REQUEST DE EDIÇÃO, ADICIONAR O HEADER AUTHORIZATION E RECEBER DA TELA O USER

export const createUser = (formData: SignUpType) =>
  fetchData("/users", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
