<template>
  <div class="">UserCollections</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
const pageTitle = ref('收藏集');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>
  
<style lang="scss" scoped></style>
  