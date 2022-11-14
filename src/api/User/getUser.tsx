import { UserType } from '../../types/UserType'
import { apiUrl } from '../routes'

export function getUser(token: string, id: number | string) {
  return apiUrl
    .get(`/user/${+id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
