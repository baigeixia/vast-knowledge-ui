import { systemRequest } from '@/utils/request'


export const  usergetInfo =(userid)=>{
    return systemRequest({
        url: `/user/User/getInfo`,
        method: 'GET',
        params:{
            id:userid
        }
      
    })
}

export const  getLocalInfo =()=>{
    return systemRequest({
        url: `/user/User/getLocalInfo`,
        method: 'GET',
    })
}

