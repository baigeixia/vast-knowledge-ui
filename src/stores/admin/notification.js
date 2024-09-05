import { getCommentNotification } from '@/api/admin/notification'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket ,socketEmit} from '@/utils/socketclient'
import debounce from '@/utils/debouncing';

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

    const likeArticle = debounce((articleId, authorId,articleName,type,commentId) => {
      socketEmit("likeMsg", {
              articleId: articleId,
              repayAuthorId: authorId,
              authorName: articleName,
              commentId: commentId,
              type: type,
          })
  },500)

  const fanMsg = debounce(( authorId,authorName) => {
    console.log('authorId',authorId);
    socketEmit("fanMsg", {
      followId: authorId,
      followName: authorName,
        })
},500)
    
    return {
        getCommentNotificationInfo,
        commentNotificationList,
        likeArticle,
        fanMsg,
        hederMsgCount,
        iscomment,
        isdigg,
        isfollow,
        issystem,
        isim,
    }
  })


  export default notificationAppStore