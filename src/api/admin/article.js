import { request } from '@/utils/request'

export function gethomeList(page,size,tag,type) {
    return request({
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
  return request({
    url: '/article/article/info',
    method: 'GET',
    params:{
      id:id
    }
  })
}

export function postsapi(userId,page,size,type) {
  return request({
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

export function deleteOneApi(id) {
  return request({
    url: '/article/article/deleteOne',
    method: 'DELETE',
    params:{
      id:id,
    }
  })
}