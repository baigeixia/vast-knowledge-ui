import { coreRequest ,systemRequest} from '@/utils/request'

export const  getusersearchinfoApi =()=>{
    return coreRequest({
        url: `/search/search/userSearch`,
        method: 'GET',
    })
}



export const  addusersearchinfoApi =(query)=>{
    return coreRequest({
        url: `/search/search/addUserSearch`,
        method: 'GET',
        params:{
            query:query
        }
    })
}

export const  getusersearchtrendingapi =()=>{
    return coreRequest({
        url: `/search/hot/trending`,
        method: 'GET',
    })
}


export const  rmHistoryapi =(id)=>{
    return coreRequest({
        url: `/search/search/rmHistory`,
        method: 'DELETE',
        params:{
            id:id
        }
    })
}

export const  rmHistoryAllapi =()=>{
    return coreRequest({
        url: `/search/search/rmHistoryAll`,
        method: 'DELETE',
    })
}

export const  associatelistapi =(text)=>{
    return coreRequest({
        url: `/search/associate/list`,
        method: 'GET',
        params:{
            text:text
        }
    })
}