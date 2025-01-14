import { request } from '@/utils/request'



export function getInfoContent(id) {
  return request({
    url: '/article/Content/getInfo',
    method: 'GET',
    params: {
      id:id,
    }
  })
}