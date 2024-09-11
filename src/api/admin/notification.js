import { coreRequest ,collectionRequest ,systemRequest} from '@/utils/request'

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


export function getImList(type,page,size) {
  return systemRequest({
    url: '/user/letter/list',
    method: 'GET',
    params:{
      type: type,
      page: page,
      size: size,
    }
  })
}

export function getmsgListdata(userId,page,size) {
  return systemRequest({
    url: '/user/letter/msgList',
    method: 'GET',
    params:{
      userId: userId,
      page: page,
      size: size,
    }
  })
}


export function setclearUnreadMsg(userId) {
  return systemRequest({
    url: '/user/letter/clearUnreadMsg',
    method: 'GET',
    params:{
      userId: userId,
    }
  })
}

export function setdelMsg(msgId) {
  return systemRequest({
    url: '/user/letter/delMsg',
    method: 'DELETE',
    params:{
      msgId: msgId,
    }
  })
}