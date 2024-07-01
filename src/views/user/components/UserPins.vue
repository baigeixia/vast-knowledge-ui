<template>
    <div class="">UserPins</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
const pageTitle = ref('动态');
onMounted(() => {
  document.title = pageTitle.value;
});
  </script>
  
  <style lang="scss" scoped>
  </style>
  