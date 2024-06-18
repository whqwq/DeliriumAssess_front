import axios from 'axios'
import Cookie from '../cookie.js'
import miniToastr from 'mini-toastr'
miniToastr.init()

const instance = axios.create({
  baseURL: 'http://localhost:8088/',
  timeout: 20000000,
  headers: {
    'Content-Type': 'application/json'
  }
})
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  (config) => {
    // const username = Cookie.getCookie('username')
    const phone = Cookie.getCookie('phone')
    const token = Cookie.getCookie('token')
    //config.data = qs.stringify(config.data)
    if (phone && token) {
      // console.log(token)
      config.headers.token = token
      config.headers.phone = phone
      // config.headers.username = username
    }
    // console.log('http-config', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (res) => {
    // console.log('http-response', res)
    if (!res || !res.data) return
    if (res.data.status !== 0) miniToastr.error(res.data.message || 'Error!')
    else if (res.data.message) miniToastr.success(res.data.message)
    return res.data || {}
  },
  (error) => {
    miniToastr.error('请求失败')
    console.log(error)
    return {}
  }
)

export default instance

export const post = (url, data = {}) => {
  return instance({
    url,
    method: 'POST',
    data
  })
}

export const get = (url, params) => {
  return instance({
    url,
    method: 'get',
    params
  })
}
