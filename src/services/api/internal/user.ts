import { fetchData } from "./api";
import { SignUpType, UpdateType } from "@/schemas/UserSignUp";

interface iRequest {
  data: object;
  headers: object;
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

export const updateUser = ({ data, headers = {} }: iRequest) =>
  fetchData("/users", {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });

export const getUserById = (id = "", headers = {}) => {
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

export const updateInterests = ({ data, headers = {} }: iRequest) =>
  fetchData("/users/link-interests", {
    method: "PUT", // or 'PUT'
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const boundCollection = ({
  id,
  headers = {},
}: {
  id: string;
  headers: object;
}) =>
  fetchData(`/users/link-collection/${id}`, {
    method: "PUT", // or 'PUT'
    headers: {
      ...headers,
    },
  });

export const unboundCollection = ({
  id,
  headers = {},
}: {
  id: string;
  headers: object;
}) =>
  fetchData(`/users/unlink-collection/${id}`, {
    method: "PUT", // or 'PUT'
    headers: {
      ...headers,
    },
  });

export const getReservations = ({ headers = {} }) => {
  return {
    queryKey: ["getUserReservations"],
    queryFn: () =>
      fetchData("/users/reservations", {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }),
  };
};

export const getHome = ({ headers = {} }) => {
  return {
    queryKey: ["getUserHome"],
    queryFn: () =>
      fetchData("/users/home", {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }),
  };
};

export const requestNewPassword = (cpf: "", headers = {}) =>
  fetchData("/users/request-new-password", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cpf: cpf }),
  });

export const resetPassword = (data: object, headers = {}) =>
  fetchData("/users/reset-password", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const changePassword = ({ data, headers = {} }: iRequest) =>
  fetchData("/users/change-password", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
