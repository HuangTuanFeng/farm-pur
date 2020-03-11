import request from '@/utils/request'

var purchaseTask = {
    list: function (query) {
        return request({
            url: '/tasks',
            method: 'get',
            params: query
        })
    },
    get: function (id) {
        return request({
            url: '/tasks/' + id,
            method: 'get'
        })
    },
    update: function (data) {
        return request({
            url: '/tasks',
            method: 'put',
            data: data
        })
    },

    updateLines: function (data) {
        return request({
            url: '/tasks/lines',
            method: 'put',
            data: data
        })
    },
    startPush: function(data) {
        return request({
            url: '/tasks/lines/push/start',
            method: 'put',
            data: data
        })        
    },
    stopPush: function(data) {
        return request({
            url: '/tasks/lines/push/stop',
            method: 'put',
            data: data
        })        
    },
}

export default purchaseTask