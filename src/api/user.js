import request from '@/utils/request'

// 登陆
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获得短信验证码
export function phoneCode (data) {
  return request({
    url: '/phoneCode',
    method: 'post',
    data
  })
}

// 忘记密码
export function forgetPassword (data) {
  return request({
    url: '/forgetPassword',
    method: 'post',
    data
  })
}


// 退出登陆
export function logout () {
  return request({
    url: `/logout`,
    method: 'post'
  })
}
// 修改密码 
export function changePassword (data) {
  return request({
    url: '/password',
    method: 'POST',
    data: data
  })
}

// 获得销售员id和姓名
export function getMe () {
  return request({
    url: `/me`,
    method: 'GET'
  })
}