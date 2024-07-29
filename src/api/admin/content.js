import { coreRequest } from '@/utils/request'



export function getInfoContent(id) {
  return coreRequest({
    url: '/article/Content/getInfo',
    method: 'GET',
    params: {
      id:id,
    }
  })
}