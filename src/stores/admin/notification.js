import { getCommentNotification } from '@/api/admin/notification'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

 const notificationAppStore = defineStore(
  'notification', () => {

    const commentNotificationList=ref([])

    const getCommentNotificationInfo= async(page,size)=>{
       const resp= await getCommentNotification(page,size)
       commentNotificationList.value=resp.data

       return resp.data
    }
    return {
        getCommentNotificationInfo,
        commentNotificationList,
    }
  })


  export default notificationAppStore