import request from '@/utils/request'

var farmSupplyPlan = {
    list: function (query) {
        return request({
            url: '/plans',
            method: 'get',
            params: query
        })
    },
    put: function (data) {
        return request({
            url: '/plans',
            method: 'put',
            data: data
        })
    },
    post: function (data) {
        return request({
            url: '/plans',
            method: 'post',
            data: data
        })
    },
}

export default farmSupplyPlan