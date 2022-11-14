import { apiUrl } from './routes'

export function logoutUser(token: string) {
  return apiUrl
    .post('/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
