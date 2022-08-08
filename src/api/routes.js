import axios from 'axios'

export const apiUrl = axios.create({
  baseURL: 'http://localhost:8000/api',
  // baseURL: process.env.REACT_APP_LOCAL_API_URL,
})
