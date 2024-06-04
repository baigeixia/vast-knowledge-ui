import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getarticles } from '@/api/test'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const articleslist = ref([])

  const doubleCount = computed(() => count.value * 2)
  function increment() {
    console.log('++');
    count.value++
    console.log('count', count.value);
  }

  const  increment2 = async (form) =>{
    const { id, time } = form
    const result = await getarticles({ id, time })
    articleslist.value = result.data.results
  }


  return { 
    count, 
    doubleCount, 
    articleslist, 
    increment, 
    increment2 
  }
})

