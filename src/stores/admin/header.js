import { getlist } from '@/api/admin/channel'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

 const headerAppStore = defineStore(
  'header', () => {
    const headertype = ref(1)

   
    return {
        headertype,
    }
  })

  export default headerAppStore