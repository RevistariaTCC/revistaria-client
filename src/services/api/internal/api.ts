const BASE_URL = process.env.NEXT_PUBLIC_APPLICATION_URL;
//TODO: bind do token de autenticação aqui!

export const fetchData = (endpoint: string, init = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, init)
    .then((response) => {
      if (!response.ok) throw response;
      return response.json();
    })
    .catch((error) =>
      Promise.reject({ type: "error", message: error.message })
    );
};
