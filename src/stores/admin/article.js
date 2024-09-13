import { gethomeList, infoArticle } from '@/api/admin/article'
import { getarticleLikeApi } from '@/api/collection/behaviour'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const articleAppStore = defineStore(
  'article', () => {

    const articleList = ref({})
    const page = ref(1)
    const pagesize = ref(10)
    const navigationtype = ref(0)
    const tagType = ref(0)
    const isLoadingEnd = ref(false)
    const articleDto = ref({})
    const noMore = ref(false)
    const loadingdisabled = computed(() => isLoadingEnd.value || noMore.value)

    const postoperation = ref(new Map())


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
        const resp = await gethomeList(page.value, pagesize.value, tagType.value)

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

        const ids = resp.data?.records ? resp.data?.records.map(article => article.id) : [];
        if(ids && ids.length >0 ){
          const response = getarticleLikeApi(ids)
          const dataObject = (await response).data; 
          const dataMap = new Map(Object.entries(dataObject).map(([key, value]) => [Number(key), value]));
          const mergedMap = new Map([...postoperation.value, ...dataMap]);
          postoperation.value = mergedMap;
        }
        
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


    return {
      articleList,
      articleDto,
      page,
      tagType,
      noMore,
      loadingdisabled,
      navigationtype,
      isLoadingEnd,
      postoperation,
      getarticleList,
      getinfoArticle,
      loadMore,
    }
  })


export default articleAppStore