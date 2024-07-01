<template>
  <div class="">Columns</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
const pageTitle = ref('专栏');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>
  
<style lang="scss" scoped></style>
  