import { usergetInfo,getLocalInfo} from '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const userinfoAppStore = defineStore(
  'userinfo', () => {

    const userinfo=ref({})
    const userLocalinfo=ref({})
    
    const getusergetInfo= async (userid)=>{
      const resp=  await usergetInfo(userid)
      userinfo.value=resp.data
    }
    const getusergetLocalInfo= async ()=>{
      const resp=  await getLocalInfo()
      userLocalinfo.value=resp.data
    }

    return{
        getusergetInfo,
        getusergetLocalInfo,
        userinfo,
        userLocalinfo,
    }
  })


export default userinfoAppStore