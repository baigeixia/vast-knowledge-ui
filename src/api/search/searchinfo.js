import { request } from '@/utils/request'

export const  getusersearchinfoApi =()=>{
    return request({
        url: `/search/search/userSearch`,
        method: 'GET',
    })
}



export const  addusersearchinfoApi =(query)=>{
    return request({
        url: `/search/search/addUserSearch`,
        method: 'GET',
        params:{
            query:query
        }
    })
}

export const  getusersearchtrendingapi =()=>{
    return request({
        url: `/search/hot/trending`,
        method: 'GET',
    })
}


export const  rmHistoryapi =(id)=>{
    return request({
        url: `/search/search/rmHistory`,
        method: 'DELETE',
        params:{
            id:id
        }
    })
}

export const  rmHistoryAllapi =()=>{
    return request({
        url: `/search/search/rmHistoryAll`,
        method: 'DELETE',
    })
}

export const  associatelistapi =(text)=>{
    return request({
        url: `/search/associate/list`,
        method: 'GET',
        params:{
            text:text
        }
    })
}