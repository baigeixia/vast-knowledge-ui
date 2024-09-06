import { coreRequest ,collectionRequest } from '@/utils/request'

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

export function getLikeNotification(page,size) {
  return collectionRequest({
    url: '/behaviour/likes/list',
    method: 'GET',
    params:{
      page: page,
      size: size,
    }
  })
}


export function getfollowNotification(page,size) {
  return collectionRequest({
    url: '/behaviour/follow/list',
    method: 'GET',
    params:{
      page: page,
      size: size,
    }
  })
}