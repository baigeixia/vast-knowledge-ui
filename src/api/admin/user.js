import { request } from '@/utils/request'


export function getUserInfo(id) {
    return request({
      url: `/user/info/getInfo`,
      method: 'GET',
      params:{
        id:id
      }
    })
}