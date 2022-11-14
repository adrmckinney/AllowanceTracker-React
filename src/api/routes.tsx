import axios from 'axios'

export const apiUrl = axios.create({
  baseURL: '/api',
  // baseURL: process.env.REACT_APP_LOCAL_API_URL,
  // http://localhost:8000
})
