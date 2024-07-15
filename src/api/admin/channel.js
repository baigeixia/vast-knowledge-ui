import { collectionRequest } from '@/utils/request'

export function getlist({name,status,pageSize,pageNum}) {
    return collectionRequest({
      url: '/adChannel/page',
      method: 'GET',
      // params:{
      //   pageNum:pageNum,
      //   pageSize:pageSize,
      // },
      // data: {
      //   name,
      //   status,
      //   pageNum,
      //   pageSize,
      // }
    })
}