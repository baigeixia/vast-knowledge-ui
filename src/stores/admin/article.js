import { gethomeList,infoArticle } from '@/api/admin/article'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
 const articleAppStore = defineStore(
  'article', () => {

    const articleList=ref({})

    const page = ref(0)
    const pagesize = ref(10)
    const tabtype = ref(1)
    const navigationtype = ref(0)
    const isLoading = ref(false)
    const iscontentLoading = ref(false)



    const articleDto = ref({
    })


    const getinfoArticle = async (id) => {
      const resp = await infoArticle(id)
          articleDto.value = {
        ... resp.data,
        labels: resp.data.labels.includes(',') ? resp.data.labels.split(',').map(num => Number(num.trim())) : [Number(resp.data.labels)]
      }
    }


    const getarticleList= async ()=>{
        const resp=await gethomeList({})
        articleList.value={
          ...resp.data,
          
        }
    }

    const loadMore = async () => {
        if (isLoading.value) return;
  
        isLoading.value = true;
  
        try {
          maincontentllist.value = [...maincontentllist.value, ...upcontentItems.value]
          page.value += 1;
        } catch (error) {
          console.error('Error loading more data:', error);
        } finally {
          isLoading.value = false;
        }
      }


    return {
      articleList,
      articleDto,
      iscontentLoading,
      isLoading,
      getarticleList,
      getinfoArticle,
      loadMore,
    }
  })


  export default articleAppStore