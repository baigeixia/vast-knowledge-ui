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



export const  upTitleApi =(id,title)=>{
    return request({
        url: `/ai/chat/upTitle/${id}`,
        method: 'GET',
        params:{
            title:title,
        }
    })
}


export const  deChatApi =(id)=>{
    return request({
        url: `/ai/chat/deChat/${id}`,
        method: 'DELETE',
    })
}
