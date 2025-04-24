import { request } from '@/utils/request'


export const  getInfolistApi =(offset,limit)=>{
    return request({
        url: `/ai/chatInfo/list`,
        method: 'GET',
        params:{
            offset:offset,
            limit:limit,
        }
    })
}

export const  getconversationApi =(id,offset,limit)=>{
    return request({
        url: `/ai/chatInfo/conversation/${id}`,
        method: 'GET',
        params:{
            offset:offset,
            limit:limit,
        }
    })
}
