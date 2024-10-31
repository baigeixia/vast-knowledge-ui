import { collectionRequest } from '@/utils/request'


export const  getLikesBehavior =()=>{
    return collectionRequest({
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
    return collectionRequest({
        url: '/behaviour/likes/articleLike',
        method: 'POST',
        data:ids
    })
}


export const  getcommentLikeApi =(id,ids)=>{
    const idsArray = Array.from(ids);
    return collectionRequest({
        url: `/behaviour/likes/commentLike/${id}`,
        method: 'POST',
        data:idsArray
    })
}


export const  getdynamicsApi =(userid,page,size)=>{
    return collectionRequest({
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
    return collectionRequest({
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
    return collectionRequest({
        url: `/behaviour/read/article`,
        method: 'GET',
        params:{
            id:id,
          
        }
    })
}

export const  getuserFootMarkListapi =(page,size)=>{
    return collectionRequest({
        url: `/behaviour/read/userFootMark`,
        method: 'GET',
        params:{
            page:page,
            size:size,
        }
    })
}


export const  getreadsearchApi =(query,page,size)=>{
    return collectionRequest({
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
    return collectionRequest({
        url: `/behaviour/read/clearAll`,
        method: 'GET',
    })
}