import { apiUrl } from './routes'

export function useRegister(input) {
  return apiUrl
    .post('/register', input)
    .then(res => res.data)
    .catch(error => {
      return { errorMessage: error.response.data.message }
    })
}
