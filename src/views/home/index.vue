<template>
  <div class="bo-wen">
    <el-container>
      <el-header class="main-header">
        <HeaderMain></HeaderMain>
      </el-header>
      <el-main class="app-main">
        <div class="main-box">
          <MainLeft></MainLeft>
          <CoreMain></CoreMain>
          <el-aside>
            <MainRight></MainRight>
          </el-aside>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup name="Home">
import CoreMain from './components/CoreMain.vue'
import MainLeft from './components/MainLeft.vue'
import MainRight from './components/MainRight.vue'
import HeaderMain from './components/HeaderMain.vue'
</script>

<style lang="scss" scoped>
.bo-wen {
  background-color: #f2f3f5;

  .main-header {
    background-color: #ffffff;
  }

  .app-main {
    margin: 0 auto;
    min-width: 1200px;
    // min-height: 2000px;

    .main-box {
      display: flex;

      // justify-content: space-between;
    }
  }
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
}
</style>