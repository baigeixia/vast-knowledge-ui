<template>
  <div class="">UserTags</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
const pageTitle = ref('关注');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>
  
<style lang="scss" scoped></style>
  