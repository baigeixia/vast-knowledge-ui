import { systemRequest } from '@/utils/request'


export function getUserInfo(id) {
    return systemRequest({
      url: `/user/info/getInfo`,
      method: 'GET',
      params:{
        id:id
      }
    })
}