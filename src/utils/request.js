import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
  baseURL: 'http://localhost:9527/packages',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

service.interceptors.response.use(
  response => response,
  error => {
    alert(error.message)
    return Promise.reject(error)
  }
)

export default service
