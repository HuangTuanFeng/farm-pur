import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getCookie, setCookie } from '@/utils/auth'
import { baseUrl } from '@/config'
const LOCALURL= 'localhost'
// console.log(baseUrl, 'baseUrl')
// create an axios instance
const service = axios.create({
  baseURL: window.location.hostname == LOCALURL ? '/api' : baseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent


    if (getCookie('zs_token')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['token'] = getCookie('zs_token')
      config.headers['Authorization'] = 'Bearer ' + getCookie('zs_token')

    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    /*if (!!response.headers.token) {
      setCookie('zs_token', response.headers.token)
    }*/
    try {
      const res = response.data
      console.log(res)
      if (res.code !== 200) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })

        // 10011,"未登陆！" 2001"token已过期"
        if (res.code === 10011 || res.code === 2001) {
          // to re-login
          MessageBox.confirm(res.msg, 'Confirm logout', {
            confirmButtonText: '重新登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetCookie').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return res
      }
    } catch (err) {
      throw err
    }
  },
  error => {
    try {
      console.log('err' + error) // for debug
      Message({
        message: error.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    } catch (err) {
      throw err
    }

  }
)

export default service
