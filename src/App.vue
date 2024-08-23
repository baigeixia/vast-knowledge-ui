<script setup>
import { getToken, setToken, removeToken } from '@/utils/auth'
import { onBeforeMount } from "vue";
import {socket ,socketAdmin ,useSockets} from '@/utils/socketclient'

onBeforeMount(() => {
  if (getToken) {
    socket.connect();
    socketAdmin.connect();
    useSockets()
    

    socketAdmin.emit("hello", "worldadmin");
    socketAdmin.on("receiveMsg", (data) => {
      console.log('sendMsgdata:', data+'admin');
    })
    socket.emit("hello", "world");
    socket.on("receiveMsg", (data) => {
      console.log('sendMsgdata:', data);
    })
  }
})


</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
