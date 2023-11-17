import { fetchData } from "./api";

export const reserveVolume = ({id, headers = {}}: {id: string, headers: object}) => (
  fetchData(`/volumes/reservation/${id}`, {
    method: 'POST',
    headers: {
      ...headers
    }
  })
)