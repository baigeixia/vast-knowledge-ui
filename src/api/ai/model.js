import { request } from '@/utils/request'

export const  getModelListApi =()=>{
    return request({
        url: '/ai/modelList/list',
        method: 'GET',
    })
}