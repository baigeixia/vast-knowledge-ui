import request from '@/utils/request'

export function getlist({name,status,pageSize,pageNum}) {
    return request({
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