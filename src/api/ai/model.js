import { request } from '@/utils/request'

export const  getModelListApi =()=>{
    return request({
        url: '/modelList/list',
        method: 'GET',
    })
}