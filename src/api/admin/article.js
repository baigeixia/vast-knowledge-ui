import { coreRequest } from '@/utils/request'

export function gethomeList(page,size,tag,type) {
    return coreRequest({
      url: '/article/article/homeList',
      method: 'GET',
      params:{
        page:page,
        size:size,
        tag:tag,
        type:type,
      }
    })
}


export function infoArticle(id) {
  return coreRequest({
    url: '/article/article/info',
    method: 'GET',
    params:{
      id:id
    }
  })
}

export function postsapi(userId,page,size,type) {
  return coreRequest({
    url: '/article/article/posts',
    method: 'GET',
    params:{
      userId:userId,
      page:size,
      page:page,
      type:type,
    }
  })
}