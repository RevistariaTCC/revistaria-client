const BASE_URL = process.env.NEXT_PUBLIC_APPLICATION_URL;
//TODO: bind do token de autenticação aqui!

export const fetchData = (endpoint: string) => {
  return fetch(`${BASE_URL}${endpoint}`).then((res) => res.json());
};
