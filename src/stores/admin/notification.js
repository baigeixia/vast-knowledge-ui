import { getCommentNotification } from '@/api/admin/notification'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

 const notificationAppStore = defineStore(
  'notification', () => {

    const iscomment=ref(true)
    const isdigg=ref(false)
    const isfollow=ref(false)
    const issystem=ref(false)
    const isim=ref(false)

    const commentNotificationList=ref([])

    const getCommentNotificationInfo= async(page,size)=>{
       const resp= await getCommentNotification(page,size)
       commentNotificationList.value=resp.data
       return resp.data
    }
    return {
        getCommentNotificationInfo,
        commentNotificationList,
        iscomment,
        isdigg,
        isfollow,
        issystem,
        isim,
    }
  })


  export default notificationAppStore