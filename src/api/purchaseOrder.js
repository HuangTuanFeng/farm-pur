import request from '@/utils/request'

var purchaseOrder = {
    create: function (data) {
        return request({
            url: '/orders',
            method: 'post',
            data: data
        })
    },

    list: function (query) {
        return request({
            url: '/orders',
            method: 'get',
            params: query
        })
    },
    get: function (id) {
        return request({
            url: '/orders/' + id,
            method: 'get'
        })
    },
    update: function (data) {
        return request({
            url: '/orders',
            method: 'put',
            data: data
        })
    }
}

export default purchaseOrder