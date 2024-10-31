import { gethomeList, infoArticle,postsapi,deleteOneApi } from '@/api/admin/article'
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import behaviourAppStore from '../collection/behaviour'
const articleAppStore = defineStore(
  'article', () => {
    const behaviourAppStoreS = behaviourAppStore()

    const articleList = ref({})
    const page = ref(1)
    const pagesize = ref(10)
    const navigationtype = ref(0)
    const tagType = ref(0)
    const isLoadingEnd = ref(false)
    const articleDto = ref({})
    const noMore = ref(false)
    const loadingdisabled = computed(() => isLoadingEnd.value || noMore.value)

    // const postoperation = reactive(new Map())


    const getinfoArticle = async (id) => {
      const resp = await infoArticle(id)
      articleDto.value = {
        ...resp.data,
        labels: resp.data?.labels ? resp.data.labels.includes(',') ? resp.data.labels.split(',').map(num => Number(num.trim())) : [Number(resp.data.labels)] : []
      }
    }

    const getarticleList = async () => {
      if (isLoadingEnd.value) return;
      isLoadingEnd.value = true;
      try {
        console.log(tagType.value);
        console.log('navigationtype',navigationtype.value);
        const resp = await gethomeList(page.value, pagesize.value, tagType.value,navigationtype.value)

        if (Array.isArray(resp.data?.records) && resp.data?.records.length === 0) {
          noMore.value = true
        }

        if (!articleList.value) {
          articleList.value = { records: [] };
        }

        const newRecords = Array.isArray(resp.data?.records) ? resp.data.records : [];

 
        const existingRecords = Array.isArray(articleList.value.records) ? articleList.value.records : [];


        articleList.value = {
          ...articleList.value,
          records: [
            ...existingRecords,
            ...newRecords
          ]
        };


        isLoadingEnd.value = false;

        const ids = resp.data?.records ? resp.data?.records.map(article => article.id) : []
        await behaviourAppStoreS.newHomeListDataGetLike(ids)

      } catch (error) {
        // console.error('Error loading more data:', error);
      } finally {
        isLoadingEnd.value = false;
      }

    }


    const loadMore = () => {
      if (!noMore.value) {
        page.value += 1;
        getarticleList()
      }
    }

    const getuserArticleList=async(userId,page,size,type)=>{
      const resp= await postsapi(userId,page,size,type)
      return resp.data
    }

    
    const deleteOne=async(userId,page,size,type)=>{
      const resp= await deleteOneApi(userId,page,size,type)
      return resp.data
    }

  
    return {
      articleList,
      articleDto,
      page,
      tagType,
      noMore,
      loadingdisabled,
      navigationtype,
      isLoadingEnd,
      getarticleList,
      getinfoArticle,
      loadMore,
      getuserArticleList,
      deleteOne,
    }
  })


export default articleAppStore