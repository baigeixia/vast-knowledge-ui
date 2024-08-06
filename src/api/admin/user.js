import { systemRequest } from '@/utils/request'


export function getUserInfo(id) {
    return systemRequest({
      url: `/user/User/getInfo/${id}`,
      method: 'GET',
    })
}