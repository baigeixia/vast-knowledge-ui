import { request } from '@/utils/request'

export const  createChatApi =(chatSessionId)=>{
    return request({
        url: '/chat/create',
        method: 'post',
        data:{
            chatSessionId:''
        }
    })
}