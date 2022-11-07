import { apiUrl } from './routes'

export function getUserChoresList(token, id) {
  return apiUrl
    .get(`/user/chores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
