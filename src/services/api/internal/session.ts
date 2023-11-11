import { SignInType } from "@/schemas/UserSignIn";
import { fetchData } from "./api";

export const createSession = (formData: SignInType) =>
  fetchData("/sessions", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
