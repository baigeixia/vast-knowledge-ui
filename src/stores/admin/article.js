import { gethomeList } from '@/api/admin/article'
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
    const iscontentLoading = ref(true)


    const getarticleList= async ()=>{
        const resp=await gethomeList({})
        articleList.value=resp.data
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
      getarticleList,
      loadMore,
      
    }
  })


  export default articleAppStore