import { usergetInfo, upuserConfigApi, upuserInfoApi, userfollowersListApi, userFollowingListApi,InfoRelationApi } from '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserid, setUserid, removeUserid, setUserInfo, getUserInfo,removeUserInfo } from '@/utils/auth'
import debounce from '@/utils/debouncing';


const userinfoAppStore = defineStore(
  'userinfo', () => {

    const userid = ref(getUserid())
    const userLocalinfo = ref({})
    const userinfoHome = ref({})

    const getusergetInfo = async (id) => {
      let resp=null;
      let localid=getUserid()
      if(id === localid){
        console.log(userLocalinfo.value);
        if(userLocalinfo.value  && Object.keys(userLocalinfo.value).length > 0) return userLocalinfo.value
        resp = await usergetInfo()
      }else{
        if(userinfoHome.value===id ) return userinfoHome.value
        resp = await usergetInfo(id)
        userinfoHome.value= resp.data
      }
      return resp.data;
    }

    const getInfoRelation = async (userid) => {
      const resp = await InfoRelationApi(userid)
      return resp.data;
    }

    const getusergetLocalInfo = async () => {
      const resp = await usergetInfo()
      if(resp.data){
        userLocalinfo.value = resp.data
        setUserid(resp.data.id)
        userid.value = resp.data?.id
      }
      return resp.data;
    }

    const upuserConfig = async (state, type) => {
      // removeUserInfo()
      await upuserConfigApi(state, type)
    }

    const upuserInfo = async (from) => {
      console.log('from', from);
      // removeUserInfo()
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
      // userinfo,
    return {
      getusergetInfo,
      getusergetLocalInfo,
      upuserConfig,
      upuserInfo,
      userid,
      userLocalinfo,
      userinfoHome,
      getuserfollowersList,
      getuserFollowingList,
      getInfoRelation,
    }
  })


export default userinfoAppStore