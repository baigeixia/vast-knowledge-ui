<template>
  <div class="">404</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
const pageTitle = ref('404');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>

<style lang="scss" scoped>

</style>
