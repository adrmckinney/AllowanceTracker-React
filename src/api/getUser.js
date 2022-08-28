import { apiUrl } from './routes'

export function getUser(id) {
  return apiUrl
    .get(`/me/1`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
