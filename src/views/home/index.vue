<template>
  <MainLeft></MainLeft>
  <CoreMain></CoreMain>
  <MainRight></MainRight>
</template>

<script setup name="Home">
import CoreMain from './components/CoreMain.vue'
import MainLeft from './components/MainLeft.vue'
import MainRight from './components/MainRight.vue'
import { ref, onMounted,defineAsyncComponent } from 'vue';
import ExternalLinkGuard from '@/Layout/components/ExternalLinkGuard.vue';

// const CoreMain = defineAsyncComponent(() => import("./components/CoreMain.vue"))
// const MainLeft = defineAsyncComponent(() => import("./components/MainLeft.vue"))
// const MainRight = defineAsyncComponent(() => import("./components/MainRight.vue"))


const pageTitle = ref('首页');
onMounted(() => {
  document.title = pageTitle.value;
});
</script>

<style lang="scss" scoped>
.guard-box {
  :deep(a) {
    color: #1e80ff;
    margin: 0 5px;
  }
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
}
</style>