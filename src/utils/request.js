import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { judgeSide } from '@/utils/index'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const side = judgeSide()
    // do something before request is sent
    // let each request carry token
    config.headers['token'] = ''

    if (config.method === 'post') {
      const params = qs.parse(config.data)
      Object.keys(params).forEach(val => {
        if (typeof params[val] !== 'object') {
          params[val] = params[val].trim()
        }
      })
      config.data = qs.stringify(params)
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.msg || '出错啦',
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(new Error(res.msg || '出错啦'))
    } else {
      return res
    }
  },
  error => {
    if (error.message.includes('timeout')) {
      Message({
        message: '网络异常',
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(error)
    }
    if (error.response.status == 403) {
      // to re-login
      MessageBox.alert('您的登录信息已过期，点击确定重新登录', {
        confirmButtonText: '确定',
        confirmButtonClass: 'el-button--danger ',
        callback: action => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        }
      })
    } else {
      Message({
        message: error.response.data.msg || '出错啦',
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
