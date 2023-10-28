import { fetchData } from "./api";

export const listCategories = {
  queryKey: ["categories"],
  staleTime: Infinity,
  queryFn: () => fetchData("/categories"),
};
