import request from '@/utils/request'
import qs from 'qs'

// 获取客户列表
export function userList (query) {
  return request({
    url: '/customer/list',
    method: 'get',
    params: query
  })
}

 
// 新增客户
export function addCustomer (query) {
  return request({
    url: '/customer/add',
    method: 'POST',
    data: query
  })
}

// 客户管理的信息
export function manageInfo () {
  return request({
    url: `/customer/manage`,
    method: 'get'
  })
}

// 全部客户名称列表
export function customerNameList() {
  return request({
    url: `/customer/nameList`,
    method: 'get'
  })
}

// 客户行业列表
export function customerTypesList() {
  return request({
    url: `/customer/types`,
    method: 'get'
  })
}

// 获取客户详细信息
export function customerInfo(id) {
  return request({
    url: `/customer/${id}`,
    method: 'get'
  })
}

// 新增用户|管理员
export function addList (data) {
  return request({
    url: `/system/user/add`,
    method: 'post',
    data: qs.stringify(data)
  })
}
// 编辑用户信息
export function editList (data) {
  return request({
    url: `/system/user/edit`,
    method: 'put',
    data: qs.stringify(data)
  })
}

