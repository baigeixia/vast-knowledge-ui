<template>
  <div class="main-container">
    <div class="left-main">
      <MainLeft></MainLeft>
    </div>
    <div class="conter-main">center</div>
    <div class="right-main">
      <MainRight></MainRight>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import MainLeft from './MainLeft.vue'
import MainRight from './MainRight.vue'
</script>

<style lang="scss" scoped>
.main-container{
  display: flex;
  justify-content: space-between;

}
</style>
