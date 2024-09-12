import { usergetInfo,upuserConfigApi,upuserInfoApi} from '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserid, setUserid, removeUserid } from '@/utils/auth'


const userinfoAppStore = defineStore(
  'userinfo', () => {

    const userid=ref(getUserid())
    const userinfo=ref({})
    const userLocalinfo=ref({})

    const getusergetInfo= async (userid)=>{
      const resp=  await usergetInfo(userid)
      userinfo.value=resp.data
      return resp.data;
    }
    const getusergetLocalInfo= async ()=>{
      const resp=  await usergetInfo()
      userLocalinfo.value=resp.data
      setUserid(resp.data.id)
      userid.value=resp.data.id
      console.log('resp.data.id',resp.data.id);
      return resp.data;
    }


    const upuserConfig= async (state,type)=>{
       await upuserConfigApi(state,type)
    }

    const upuserInfo= async (from)=>{
      console.log('from',from);
      await upuserInfoApi(from)
   }
   
    return{
        getusergetInfo,
        getusergetLocalInfo,
        upuserConfig,
        upuserInfo,
        userinfo,
        userid,
        userLocalinfo,
    }
  })


export default userinfoAppStore