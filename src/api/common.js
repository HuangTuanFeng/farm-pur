import request from '@/utils/request'

// 上传图片 
export function imgUpload (data) {
  return request({
    url: `/upload`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

//货物
// 货物简单信息列表
export function baseList (data) {
  return request({
    url: '/product/baseList',
    method: 'GET',
    params:data
  })
}


// 货物列表
export function goodsList (data) {
  return request({
    url: '/product/list',
    method: 'GET',
    data
  })
}


//品类
// 货物品类列
export function categoryList () {
  return request({
    url: '/category/list',
    method: 'GET',
  })
}

// 货物品类下拉树列表
export function categorytreeselects () {
  return request({
    url: '/category/treeselects',
    method: 'GET',
  })
}