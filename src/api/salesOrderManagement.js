import request from '@/utils/request'

// 获取销售订单列表
export function salesOrderList (query) {
  return request({
    url: '/salesOrder/list',
    method: 'get',
    params: query
  })
}

// 提交销售订单的验收证明
export function addAcceptance (query) {
  return request({
    url: '/salesOrder/acceptance/add',
    method: 'post',
    params: query
  })
}

// 新增销售订单
export function addSalesOrder (query) {
  return request({
    url: '/salesOrder/add',
    method: 'post',
    params: query
  })
}

// 提交销售订单的物流信息
export function addLogistics (query) {
  return request({
    url: '/salesOrder/logistics/add',
    method: 'post',
    params: query
  })
}

// 销售订单管理的信息
export function manageInfo () {
  return request({
    url: `/salesOrder/manage`,
    method: 'get'
  })
}

// 销售订单详细信息
export function salesOrderDetail (id) {
  return request({
    url: `/salesOrder/${id}`,
    method: 'get'
  })
}

