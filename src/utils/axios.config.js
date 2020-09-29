import axios from 'axios'

// since token was given statically we just assign it to a const variable
const token = '$2a$10$fqxtoUAn1YG5tTlUuXhyk.8vYyqsKea1ATy0AbEHjYDYxx2Sz37Pa'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = token

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosInstance
