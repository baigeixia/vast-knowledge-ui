import { coreRequest } from '@/utils/request'

export function gethomeList({page,size,tag}) {
    return coreRequest({
      url: '/article/article/homeList',
      method: 'GET',
      params:{
        page:page,
        size:size,
        tag:tag,
      }
    })
}