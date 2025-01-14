import { request } from '@/utils/request'

export function getlist() {
    return request({
      url: 'analyze/channel/page',
      method: 'GET',
    })
}