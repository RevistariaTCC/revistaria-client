import { fetchData } from "./api";

export const listCollections = (searchTerm: string) => ({
  queryKey: ["collections"],
  staleTime: Infinity,
  queryFn: () => fetchData(`/collections${searchTerm ? "?search="+searchTerm : ""}`),
});

export const showCollection = (id: string) => ({
  queryKey: ["collection-detail"],
  staleTime: Infinity,
  queryFn: () => fetchData(`/collections/${id}`),
})