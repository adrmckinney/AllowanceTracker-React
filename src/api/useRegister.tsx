import { apiUrl } from './routes'

export function useRegister(input: object) {
  return apiUrl
    .post('/register', input)
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
