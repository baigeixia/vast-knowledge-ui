import request from '@/utils/request'


export function getarticles({ id, time }) {
    return request({
        url: 'http://geek.itheima.net/v1_0/articles',
        method: 'GET',
        params: {
            channel_id: id,
            timestamp: time,
        },
    })
}