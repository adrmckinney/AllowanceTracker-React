import { apiUrl } from '../routes'

export function getUsersList(token: string) {
  return apiUrl
    .get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
