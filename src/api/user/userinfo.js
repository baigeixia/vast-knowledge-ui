import { request } from '@/utils/request'


export const  usergetInfo =(userid)=>{
    return request({
        url: `/user/info/getInfo`,
        method: 'GET',
        params:{
            id:userid
        }
      
    })
}

export const  InfoRelationApi =(userid)=>{
    return request({
        url: `/user/info/InfoRelation`,
        method: 'GET',
        params:{
            id:userid
        }
    })
}
export const  upuserConfigApi =(state,type)=>{
    return request({
        url: `/user/info/userConfig/${type}`,
        method: 'GET',
        params:{
            state:state
        }
    })
}


export const  upuserInfoApi =(from)=>{
    return request({
        url: `/user/info/upInfo`,
        method: 'POST',
        data:{
           ...from
        }
    })
}


export const  userfollowersListApi =(userId,page,size)=>{
    return request({
        url: `/user/fan/list`,
        method: 'GET',
        params:{
            userId:userId,
            page:page,
            size:size,
        }
    })
}

export const  userFollowingListApi =(userId,page,size)=>{
    return request({
        url: `/user/follow/list`,
        method: 'GET',
        params:{
            userId:userId,
            page:page,
            size:size,
        }
    })
}