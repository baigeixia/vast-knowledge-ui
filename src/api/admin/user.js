import { systemRequest } from '@/utils/request'


export function getUserInfo(id) {
    return systemRequest({
      url: `/user/UserInfo/getInfo/${id}`,
      method: 'GET',
    })
}