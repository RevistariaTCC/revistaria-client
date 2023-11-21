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

export const readNotification = ({id, headers = {}}: {id: string, headers: object}) => (
  fetchData(`/notifications/${id}/read`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify({})
  })
)

export const readAllNotifications = (headers = {}) => (
  fetchData(`/notifications/readAll`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify({})
  })
)