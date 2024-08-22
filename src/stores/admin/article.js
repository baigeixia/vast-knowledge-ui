import { gethomeList,infoArticle } from '@/api/admin/article'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
 const articleAppStore = defineStore(
  'article', () => {

    const articleList=ref({})
    const page = ref(1)
    const pagesize = ref(10)
    const navigationtype = ref(0)
    const tagType = ref(0)
    const isLoading = ref(false)
    const isLoadingEnd = ref(false)
    const iscontentLoading = ref(false)
    const articleDto = ref({ })

    const getinfoArticle = async (id) => {
      const resp = await infoArticle(id)
          articleDto.value = {
        ... resp.data,
        labels:  resp.data?.labels ? resp.data.labels.includes(',') ? resp.data.labels.split(',').map(num => Number(num.trim())) : [Number(resp.data.labels)] : []
      }
    }

    const getarticleList= async ()=>{
      if (isLoadingEnd.value) return;
      isLoadingEnd.value = true;
        try {
        const resp=await gethomeList(page.value,pagesize.value,tagType.value)

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
    
        } catch (error) {
          // console.error('Error loading more data:', error);
        } finally {
          isLoadingEnd.value = false;
        }
        
    }

    const loadMore = async () => {
      page.value += 1;
      getarticleList()
    }


    return {
      articleList,
      articleDto,
      page,
      tagType,
      navigationtype,
      iscontentLoading,
      isLoading,
      isLoadingEnd,
      getarticleList,
      getinfoArticle,
      loadMore,
    }
  })


  export default articleAppStore