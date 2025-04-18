import { request } from '@/utils/request'


export const  getInfolistApi =(offset,limit)=>{
    return request({
        url: `/chatInfo/list`,
        method: 'GET',
        params:{
            offset:offset,
            limit:limit,
        }
    })
}

export const  getconversationApi =(id,offset,limit)=>{
    return request({
        url: `/chatInfo/conversation/${id}`,
        method: 'GET',
        params:{
            offset:offset,
            limit:limit,
        }
    })
}
