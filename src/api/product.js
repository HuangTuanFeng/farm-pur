import request from '@/utils/request'

var product = {
    list: function (query) {
        return request({
            url: '/products',
            method: 'get',
            params: query
        })
    },
    post: function (data) {
        return request({
            url: '/products',
            method: 'post',
            data: data
        })
    }
}

export default product;