import { getCommentNotification } from '@/api/admin/notification'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket } from '@/utils/socketclient'

 const notificationAppStore = defineStore(
  'notification', () => {

    const hederMsgCount=ref(0)
    const iscomment=ref(false)
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

    socket.on("LIKE_NOTIFICATION", (data) => {
      console.log('LIKE_NOTIFICATION:',data);
      hederMsgCount.value++
      isdigg.value=true
      console.log(hederMsgCount);
    })
    
    return {
        getCommentNotificationInfo,
        commentNotificationList,
        hederMsgCount,
        iscomment,
        isdigg,
        isfollow,
        issystem,
        isim,
    }
  })


  export default notificationAppStore