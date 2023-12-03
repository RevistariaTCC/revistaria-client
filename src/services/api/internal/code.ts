import { fetchData } from "./api";

type ValidateCodeType = {
  phone: string;
  code: string;
};

export const validateCode = (data: ValidateCodeType) =>
  fetchData("/activation-code/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const generateCode = (phone: string) =>
  fetchData("/activation-code/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
