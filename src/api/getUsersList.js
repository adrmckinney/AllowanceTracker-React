import { apiUrl } from './routes'

export function getUsersList(token) {
  console.log('token', token)
  return apiUrl
    .get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Accept: 'application/json',
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
