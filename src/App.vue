<script setup>
import { onBeforeMount } from "vue";
import { socket } from '@/utils/socketclient'
onBeforeMount(()=>{
  socket.connect();
})

socket.emit("hello", "world", (response) => {
  console.log(response); // "got it"
});

socket.on("receiveMsg",(data)=>{
  console.log('sendMsgdata:',data);
})

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
