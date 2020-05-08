import axiosFactory from 'axios'

const axiosInstance = axiosFactory.create({})

axiosInstance.interceptors.request.use(config => {
  // USE CORTS PROXY SERVICE TO BYPASS CORS ISSUE
  if (config.method === 'get') {
    config.url = `https://cors-anywhere.herokuapp.com/${config.url}`
  }
  return config
})

export default axiosInstance