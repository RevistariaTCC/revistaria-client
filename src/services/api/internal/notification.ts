import { fetchData } from "./api";

export const getUserNotifications = (headers = {}) => ({
  queryKey: ["getUserNotifications"],
  queryFn: () =>
    fetchData('/notifications', {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }),
})