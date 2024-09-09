import { systemRequest } from '@/utils/request'


export const  userReport =(reportUserId,reportUserName,articleId,reportReason,reportContent)=>{
    return systemRequest({
        url: '/user/apUserReport/save',
        method: 'POST',
        data:{
            reportUserId:reportUserId,
            reportUserName:reportUserName,
            articleId:articleId,
            reportReason:reportReason,
            reportContent:reportContent,
        }
    })
}

export const  userFeedback =(content,images)=>{
    return systemRequest({
        url: '/user/feedback/save',
        method: 'POST',
        data:{
            content:content,
            images:images,
        }
    })
}