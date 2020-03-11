import request from '@/utils/request'

// 新品开发列表
export function productDemandList () {
  return request({
    url: '/productDemand/list',
    method: 'get',
  })
}

// 更新新品的状态
export function updateProductDemand (id,status) {
  return request({
    url: `/productDemand/update/${id}/status/${status}`,
    method: 'PUT',
  })
}

// 添加新品
export function addProductDemand (data) {
  return request({
    url: `/productDemand/add`,
    method: 'post',
    data
  })
}
