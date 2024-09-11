import { getCommentNotification, getLikeNotification ,getfollowNotification,getImList,getmsgListdata,setclearUnreadMsg,setdelMsg} from '@/api/admin/notification'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { socket,socketEmit } from '@/utils/socketclient'
import debounce from '@/utils/debouncing';

const notificationAppStore = defineStore(
  'notification', () => {

    // const hederMsgCount = ref(false)
    const iscomment = ref(false)
    const isdigg = ref(false)
    const isfollow = ref(false)
    const issystem = ref(false)
    const isim = ref(false)

    const commentNotificationList = ref([])
    const likeNotificationList = ref([])
    const upMsgdata = ref({})

    const ishederMsg = computed(() => {
      return iscomment.value || isdigg.value || isfollow.value || issystem.value || isim.value;
    })


    const getCommentNotificationInfo = async (page, size) => {
      const resp = await getCommentNotification(page, size)
      commentNotificationList.value = resp.data
      return resp.data
    }

    const getLikeNotificationInfo = async (page, size) => {
      const resp = await getLikeNotification(page, size)
      likeNotificationList.value = resp.data
      return resp.data
    }

    const getfollowNotificationInfo = async (page, size) => {
      const resp = await getfollowNotification(page, size)
      // followNotificationList.value = resp.data
      return resp.data
    }

    const getImListInfo = async (type,page, size) => {
      const resp = await getImList(type,page, size)
      // followNotificationList.value = resp.data
      return resp.data
    }
    

    const upsetclearUnreadMsg = async (userId) => {
      await setclearUnreadMsg(userId)
      // followNotificationList.value = resp.data
    }

    
    const getmsgList = async (userId,page,size)=>{
      console.log(userId,page,size);
      const resp = await getmsgListdata(userId,page, size)
      return resp.data
    }

    

    const delsetdelMsg = async (msgId)=>{
      console.log('msgId',msgId);
      await setdelMsg(msgId)
    }




    socket.on("LIKE_NOTIFICATION", (data) => {
      console.log('LIKE_NOTIFICATION:', data);
      isdigg.value = true
      console.log(hederMsgCount);
    })

    //评论
    socket.on("COMMENT_NOTIFICATION", (data) => {
      console.log('COMMENT_NOTIFICATION:', data);
      iscomment.value = true
    })

    //粉丝
    socket.on("FAN_NOTIFICATION", (data) => {
      console.log('FAN_NOTIFICATION:', data);
      isfollow.value = true
    })
    //私信
    socket.on("CHAT_MSG_NOTIFICATION", (data) => {
      console.log('CHAT_MSG_NOTIFICATION:', data);
      isim.value = true
      upMsgdata.value = data
    })

    socket.on("SYSTEM_MSG_NOTIFICATION", (data) => {
      console.log('SYSTEM_MSG_NOTIFICATION:', data);
      issystem.value = true
    })

    const chatMsg = debounce((senderId,senderName,content)=>{
      console.log(senderId,senderName,content);
      socketEmit('chatMsg', {senderId:senderId,senderName:senderName,content:content})
    }, 500)



    const likeArticle = debounce((articleId, authorId, articleName, type, commentId) => {
      socketEmit("likeMsg", {
        articleId: articleId,
        repayAuthorId: authorId,
        authorName: articleName,
        commentId: commentId,
        type: type,
      })
    }, 500)

    const fanMsg = debounce((authorId, authorName) => {
      console.log('authorId', authorId);
      socketEmit("fanMsg", {
        followId: authorId,
        followName: authorName,
      })
    }, 500)

    return {
      getCommentNotificationInfo,
      getfollowNotificationInfo,
      getLikeNotificationInfo,
      getImListInfo,
      getmsgList,
      likeArticle,
      fanMsg,
      chatMsg,
      upsetclearUnreadMsg,
      delsetdelMsg,
      commentNotificationList,
      ishederMsg,
      upMsgdata,
      iscomment,
      isdigg,
      isfollow,
      issystem,
      isim,
    }
  })


export default notificationAppStore