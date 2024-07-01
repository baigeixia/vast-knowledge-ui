<template>
  <div class="">401</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
const pageTitle = ref('401');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>

<style lang="scss" scoped>

</style>
