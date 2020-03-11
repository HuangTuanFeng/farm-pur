import request from '@/utils/request'

// 查询品类列表
export function listCategory(query) {
  return request({
    url: '/category/list',
    method: 'get',
    params: query
  })
}

// 查询品类树列表
export function treeListCategory(query) {
  return request({
    url: '/category/treeselects',
    method: 'get',
    params: query
  })
}

// 查询供应商的品类名
export function getCategoriesByFarmId(farmId) {
  return request({
    url: '/category/farmId/' + farmId,
    method: 'get'
  })
}