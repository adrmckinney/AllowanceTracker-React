import { apiUrl } from './routes'

export function logoutUser(api_token: string) {
  return apiUrl
    .post('/logout', {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
