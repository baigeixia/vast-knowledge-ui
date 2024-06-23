<template>
  <!-- <div class="container">
    <div class="main-left"><MainLeft/></div>
    <div class="core-main"><CoreMain/>CoreMain</div>
    <div class="main-right"><MainRight/>MainRight</div>
</div> -->
    <MainLeft></MainLeft>
    <CoreMain></CoreMain>
    <MainRight></MainRight>
</template>

<script setup name="Home">
import CoreMain from './components/CoreMain.vue'
import MainLeft from './components/MainLeft.vue'
import MainRight from './components/MainRight.vue'
</script>

<style lang="scss" scoped>


:deep(.el-input__wrapper) {
  border-radius: 20px;
}
</style>