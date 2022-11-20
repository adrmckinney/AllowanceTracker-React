import { apiUrl } from '../routes'

export function getUsersList(api_token: string) {
  return apiUrl
    .get('/users', {
      headers: {
        Authorization: `Bearer ${api_token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
