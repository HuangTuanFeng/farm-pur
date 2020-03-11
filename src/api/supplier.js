import request from '@/utils/request'

var supplier = {
    list: function (query) {
        return request({
            url: '/farms',
            method: 'get',
            params: query
          })
    }
}

export default supplier