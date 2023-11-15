import { fetchData } from "./api";

export const listCollections = (searchTerm = "") => ({
  queryKey: ["collections"],
  staleTime: Infinity,
  queryFn: () => fetchData(`/collections${searchTerm ? "?search="+searchTerm : ""}`),
});
