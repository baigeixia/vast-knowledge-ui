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