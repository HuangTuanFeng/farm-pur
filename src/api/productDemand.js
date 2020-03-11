import request from '@/utils/request'

var productDemand = {
  list: function(query) {
    return request({
      url: '/demands',
      method: 'get',
      params: query
    })    
  },
  update: function(data) {
    return request({
      url: '/demands',
      method: 'put',
      data: data
    })    
  }
}

export default productDemand;