import { searchInfoApi ,searchUserInfoApi} from '@/api/admin/search'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

  const searchAppStore = defineStore(
  'search', () => {

    const getsearchInfo=async(query,type,sort,period,page,size)=>{
       const respos= await searchInfoApi(query,type,sort,period,page,size)
        return respos.data
    }

    const getsearchUserInfo=async(query,type,sort,period,page,size)=>{
        const respos= await searchUserInfoApi(query,type,sort,period,page,size)
         return respos.data
     }
    
    return{
        getsearchInfo,
        getsearchUserInfo,
        
    }
  })

export default searchAppStore