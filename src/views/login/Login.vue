<template>
  <div class="">login</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
const pageTitle = ref('登录');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>

<style lang="scss" scoped>

</style>
