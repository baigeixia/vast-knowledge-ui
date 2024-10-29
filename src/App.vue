<script setup>
import { getToken, setToken, removeToken } from '@/utils/auth'
import { onBeforeMount } from "vue";
import { socket, useSockets } from '@/utils/socketclient'

onBeforeMount(() => {
  if (getToken) {
    socket.connect();
  }
})

</script>

<template>
    <RouterView />
</template>

<style scoped></style>
