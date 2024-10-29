import { coreRequest ,systemRequest} from '@/utils/request'


export const  searchInfoApi =(query,type,sort,period,page,size)=>{
    return coreRequest({
        url: '/search/search/searchInfo',
        method: 'GET',
        params:{
            query:query,
            type:type,
            sort:sort,
            period:period,
            page:page,
            size:size,
        }
    })
}

export const  searchUserInfoApi =(query,type,sort,period,page,size)=>{
    return systemRequest({
        url: '/user/info/search',
        method: 'GET',
        params:{
            query:query,
            type:type,
            sort:sort,
            period:period,
            page:page,
            size:size,
        }
    })
}