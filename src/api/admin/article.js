import { coreRequest } from '@/utils/request'

export function gethomeList(page,size,type) {
    return coreRequest({
      url: '/article/article/homeList',
      method: 'GET',
      params:{
        page:page,
        size:size,
        tag:type,
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