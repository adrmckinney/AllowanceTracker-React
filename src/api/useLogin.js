import { apiUrl } from './routes'

export function useLogin(input) {
  return apiUrl
    .post('/login', input)
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
