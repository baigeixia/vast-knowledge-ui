import { request } from '@/utils/request'

export const  createChatApi =(chatSessionId)=>{
    return request({
        url: '/ai/chat/create',
        method: 'post',
        data:{
            chatSessionId:chatSessionId
        }
    })
}