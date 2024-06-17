import axios from 'axios'
import cookie from '../cookie.js'
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
    // const username = cookie.getCookie('username')
    const phone = cookie.getCookie('phone')
    const token = cookie.getCookie('token')
    // 若 localStorage 中含有这些字段，则添加入请求头
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
    return res.data.data || {}
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
