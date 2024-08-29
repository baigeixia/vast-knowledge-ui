import { coreRequest } from '@/utils/request'

export function getCommentNotification(page,size) {
    return coreRequest({
      url: '/comment/Comment/notification',
      method: 'GET',
      params:{
        page: page,
        size: size,
      }
    })
}