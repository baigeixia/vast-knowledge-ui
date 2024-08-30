<script setup>
import { getToken, setToken, removeToken } from '@/utils/auth'
import { onBeforeMount } from "vue";
import {socket,useSockets} from '@/utils/socketclient'

onBeforeMount(() => {
  if (getToken) {
    socket.connect();
    // useSockets()
  }
})

/**
 *  const like ={
      articleId:24,
      commentId:11,
      commentReId:4
    } 
    const CommentMsg ={
      articleId:24,
      commentId:11,
    }
    socket.emit("likeMsg", like);
    socket.emit("CommentMsg", CommentMsg);

    // socket.emit("commentMsg", "world");
    socket.on("likeMsg2", (data) => {
      console.log('sendMsgdata:', data);
    })
 */

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
