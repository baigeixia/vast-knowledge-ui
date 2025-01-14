import { request } from '@/utils/request'


export const  getLikesBehavior =()=>{
    return request({
        url: '/behaviour/LikesBehavior/list',
        method: 'GET',
        params:{
            page:page,
            size:size,
            tag:type,
        }
    })
}

export const  getarticleLikeApi =(ids)=>{
    return request({
        url: '/behaviour/likes/articleLike',
        method: 'POST',
        data:ids
    })
}


export const  getcommentLikeApi =(id,ids)=>{
    const idsArray = Array.from(ids);
    return request({
        url: `/behaviour/likes/commentLike/${id}`,
        method: 'POST',
        data:idsArray
    })
}


export const  getdynamicsApi =(userid,page,size)=>{
    return request({
        url: `/behaviour/behavior/list`,
        method: 'GET',
        params:{
            page:page,
            size:size,
            userId:userid,
        }
    })
}
export const  userCollectListapi =(userid,page,size)=>{
    return request({
        url: `/behaviour/collect/list`,
        method: 'GET',
        params:{
            page:page,
            size:size,
            userId:userid,
        }
    })
}


export const  getArticleInfoApi =(id)=>{
    return request({
        url: `/behaviour/read/article`,
        method: 'GET',
        params:{
            id:id,
          
        }
    })
}

export const  getuserFootMarkListapi =(page,size)=>{
    return request({
        url: `/behaviour/read/userFootMark`,
        method: 'GET',
        params:{
            page:page,
            size:size,
        }
    })
}


export const  getreadsearchApi =(query,page,size)=>{
    return request({
        url: `/behaviour/read/search`,
        method: 'GET',
        params:{
            query:query,
            page:page,
            size:size,
        }
    })
}


export const  clearAllApi =()=>{
    return request({
        url: `/behaviour/read/clearAll`,
        method: 'GET',
    })
}

export const  saveUnlikeApi =(id)=>{
    return request({
        url: `/behaviour/unlike/saveUnlike`,
        method: 'GET',
        params:{
            id:id
        }
    })
}