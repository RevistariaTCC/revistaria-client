import { fetchData } from "./api";

export const listCollections = () => ({
  queryKey: ["collections"],
  staleTime: Infinity,
  queryFn: () => fetchData('/collections'),
});

export const showCollection = (id: string) => ({
  queryKey: ["collection-detail"],
  refetchOnWindowFocus: false,
  queryFn: () => fetchData(`/collections/${id}`),
})

export const searchCollections = (searchTerm = "") => ({
  queryKey: ["searchCollections"],
  staleTime: Infinity,
  queryFn: () => fetchData(`/collections${searchTerm ? "?search="+searchTerm : ""}`),
});