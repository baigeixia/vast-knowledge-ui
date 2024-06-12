<template>
    <el-container class="bo-wen">
        <el-header class="main-header">
            <HeaderMain></HeaderMain>
        </el-header>
        <el-main class="container-main">
            <RouterView></RouterView>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref } from "vue"
import { RouterView } from "vue-router"
import HeaderMain from './components/HeaderMain.vue'
</script>

<style lang="scss" scoped>
.bo-wen {
    overflow: hidden;
    // height: 100%;
    min-height: 925px;
    background-color: #f2f3f5;
    min-width: 1100px;

    .main-header {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        padding: 0 250px;
    }

.container-main {
  margin: 0 auto;
  width: 1200px;
  display: flex;
  padding: 20px 0;
  border-radius: 5px;

}
}
</style>
