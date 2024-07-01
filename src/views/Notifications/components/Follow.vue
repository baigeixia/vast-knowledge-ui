<template>
  <div class="">follow</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
const pageTitle = ref('新增粉丝');
onMounted(() => {
  document.title = pageTitle.value;
});
const emit = defineEmits(['data-loaded']);

// 使用组合式API中的 onMounted 钩子
onMounted(() => {
  setTimeout(() => {
    // 数据加载完成后触发事件通知父组件
    console.log('data-loaded');
    emit('data-loaded');
  }, 2000);
});
</script>

<style lang="scss" scoped>

</style>
