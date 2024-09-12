import { systemRequest } from '@/utils/request'


export function getUserInfo(id) {
    return systemRequest({
      url: `/user/User/getInfo`,
      method: 'GET',
      params:{
        id:id
      }
    })
}