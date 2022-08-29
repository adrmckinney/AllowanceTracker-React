import { apiUrl } from './routes'

export function getUser(token, id) {
  return apiUrl
    .get(`/me/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
