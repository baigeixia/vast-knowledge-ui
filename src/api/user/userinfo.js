import { systemRequest } from '@/utils/request'


export const  usergetInfo =(userid)=>{
    return systemRequest({
        url: `/user/info/getInfo`,
        method: 'GET',
        params:{
            id:userid
        }
      
    })
}



export const  InfoRelationApi =(userid)=>{
    return systemRequest({
        url: `/user/info/InfoRelation`,
        method: 'GET',
        params:{
            id:userid
        }
    })
}
export const  upuserConfigApi =(state,type)=>{
    return systemRequest({
        url: `/user/info/userConfig/${type}`,
        method: 'GET',
        params:{
            state:state
        }
    })
}


export const  upuserInfoApi =(from)=>{
    return systemRequest({
        url: `/user/info/upInfo`,
        method: 'POST',
        data:{
           ...from
        }
    })
}


export const  userfollowersListApi =(userId,page,size)=>{
    return systemRequest({
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
    return systemRequest({
        url: `/user/follow/list`,
        method: 'GET',
        params:{
            userId:userId,
            page:page,
            size:size,
        }
    })
}