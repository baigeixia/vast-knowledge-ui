import { usergetInfo, upuserConfigApi, upuserInfoApi, userfollowersListApi, userFollowingListApi,InfoRelationApi } from '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserid, setUserid, removeUserid, setUserInfo, getUserInfo,removeUserInfo } from '@/utils/auth'
import debounce from '@/utils/debouncing';


const userinfoAppStore = defineStore(
  'userinfo', () => {

    const userid = ref(getUserid())
    const userinfo = ref({})
    const userLocalinfo = ref(getUserInfo())

    const getusergetInfo = async (userid) => {
      if(userid == getUserid()){
        let info = getUserInfo()
        if(info){
          userinfo.value = info
          return info;
        }
      }
      const resp = await usergetInfo(userid)
      userinfo.value = resp.data
      return resp.data;
    }

    const getInfoRelation = async (userid) => {
      const resp = await InfoRelationApi(userid)
      return resp.data;
    }

    const getusergetLocalInfo = async () => {
      let info = getUserInfo()
      
      if(!info){
        const resp = await usergetInfo()
        if(resp.data){
          userLocalinfo.value = resp.data
          setUserid(resp.data.id)
          userid.value = resp.data?.id
          setUserInfo(resp.data)
        }
        return resp.data;
      }else{
        userLocalinfo.value = info
        return info
      }
    
    }

    const upuserConfig = async (state, type) => {
      removeUserInfo()
      await upuserConfigApi(state, type)
    }

    const upuserInfo = async (from) => {
      console.log('from', from);
      removeUserInfo()
      await upuserInfoApi(from)
    }

    const getuserfollowersList = async (userId, page, size) => {
      const resp = await userfollowersListApi(userId, page, size)
      return resp.data
    }

    const getuserFollowingList = async (userId, page, size) => {
      const resp = await userFollowingListApi(userId, page, size)
      return resp.data
    }

    return {
      getusergetInfo,
      getusergetLocalInfo,
      upuserConfig,
      upuserInfo,
      userinfo,
      userid,
      userLocalinfo,
      getuserfollowersList,
      getuserFollowingList,
      getInfoRelation,
    }
  })


export default userinfoAppStore