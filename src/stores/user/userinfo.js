import { usergetInfo, upuserConfigApi, upuserInfoApi, userfollowersListApi, userFollowingListApi,InfoRelationApi } from '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserid, setUserid, removeUserid } from '@/utils/auth'
import debounce from '@/utils/debouncing';


const userinfoAppStore = defineStore(
  'userinfo', () => {

    const userid = ref(getUserid())
    const userinfo = ref({})
    const userLocalinfo = ref({})

    const getusergetInfo = async (userid) => {
      const resp = await usergetInfo(userid)
      userinfo.value = resp.data
      return resp.data;
    }

    const getInfoRelation = async (userid) => {
      const resp = await InfoRelationApi(userid)
      return resp.data;
    }

    const getusergetLocalInfo = async () => {
      const resp = await usergetInfo()
      userLocalinfo.value = resp.data
      setUserid(resp.data.id)
      userid.value = resp.data.id
      // console.log('resp.data.id',resp.data.id);
      return resp.data;
    }


    const upuserConfig = async (state, type) => {
      await upuserConfigApi(state, type)
    }

    const upuserInfo = async (from) => {
      console.log('from', from);
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