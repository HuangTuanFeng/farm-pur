import request from '@/utils/request'

// 查询供应商列表
export function listFarm(query) {
  return request({
    url: '/farms',
    method: 'get',
    params: query
  })
}

// 查询供应商详细
export function getFarm(roleId) {
  return request({
    url: '/farms/' + roleId,
    method: 'get'
  })
}

// 新增供应商
export function addFarm (data) {
  return request({
    url: '/farms',
    method: 'post',
    data: data
  })
}

// 编辑供应商
export function updateFarm (data) {
  return request({
    url: '/farms',
    method: 'put',
    data: data
  })
}