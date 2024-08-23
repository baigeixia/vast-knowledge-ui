import { gethomeList, infoArticle } from '@/api/admin/article'
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
      getarticleList,
      getinfoArticle,
      loadMore,
    }
  })


export default articleAppStore