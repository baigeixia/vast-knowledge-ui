<template>
    <div class="">Posts</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
const pageTitle = ref('文章');
onMounted(() => {
  document.title = pageTitle.value;
});
  </script>
  
  <style lang="scss" scoped>
  </style>
  