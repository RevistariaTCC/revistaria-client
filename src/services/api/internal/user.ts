import { fetchData } from "./api";
import { SignUpType } from "@/schemas/UserSignUp";

interface iRequest{
  data: object,
  headers: object
}

//QUANDO CRIAR UMA REQUEST DE EDIÇÃO, ADICIONAR O HEADER AUTHORIZATION E RECEBER DA TELA O USER

export const createUser = (formData: SignUpType) =>
  fetchData("/users", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

export const getUserById = (id: string, headers = {}) => {
  return {
    queryKey: ["getUserById"],
    queryFn: () =>
      fetchData(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }),
  };
};


export const updateInterests = ({data, headers = {}}: iRequest) => 
  fetchData("/users/link-interests", {
    method: "PUT", // or 'PUT'
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
