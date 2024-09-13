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