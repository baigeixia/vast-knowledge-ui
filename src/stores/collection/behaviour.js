import { gethomeList, infoArticle } from '@/api/admin/article'
import { ref, computed ,reactive} from 'vue'
import { getarticleLikeApi ,getdynamicsApi,userCollectListapi,getArticleInfoApi,getuserFootMarkListapi ,getreadsearchApi,clearAllApi,saveUnlikeApi} from '@/api/collection/behaviour'
import { defineStore } from 'pinia'

const behaviourAppStore = defineStore(
  'behaviour', () => {

    const postoperation = reactive(new Map())
    const dynamics = reactive({})
    const posts = reactive({})  
    const collections = reactive({})  
    const following = reactive({})  
    const followers = reactive({})  
    
const getdynamics=async (userid,page,size)=>{
  const response = await getdynamicsApi(userid,page,size)
  // dynamics=response.data
  const data=response.data
  const ids = data.map(item => item.target.id);
  await newHomeListDataGetLike(ids)
  return data
}

   const newHomeListDataGetLike= async (ids)=> {
      if (ids && ids.length > 0) {
        const response = await getarticleLikeApi(ids)
        if(response.data){
          const dataObject = response.data
          const dataMap = new Map(Object.entries(dataObject).map(([key, value]) => [key, value]))
          const mergedMap = new Map([...postoperation, ...dataMap])
  
          postoperation.clear()
          mergedMap.forEach((value, key) => postoperation.set(key, value))
        }
      }
    }

    const getuserCollectList=async(userId,page,size)=>{
      const resp= await userCollectListapi(userId,page,size)
      return resp.data
    }


    
    const getArticleInfo=async(id)=>{
      const resp= await getArticleInfoApi(id)
      return resp.data
    }

    const getuserFootMarkList=async(page,size)=>{
      const resp= await getuserFootMarkListapi(page,size)
      return resp.data
    }


    const getreadsearch=async(query,page,size)=>{
      const resp= await getreadsearchApi(query,page,size)
      return resp.data
    }
    

    const clearAll=async()=>{
      const resp= await clearAllApi()
      return resp
    }


    const saveUnlike=(id)=>{
      saveUnlikeApi(id)
    }



    return{
      newHomeListDataGetLike,
      getdynamics,
      getuserCollectList,
      getuserFootMarkList,
      getArticleInfo,
      postoperation,
      dynamics,
      getreadsearch,
      clearAll,
      saveUnlike,
    }
  })


export default behaviourAppStore