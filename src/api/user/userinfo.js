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