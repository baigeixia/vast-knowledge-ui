<template>
<div class="">
    <div class="ErrorPage-container">
      <div class="ErrorPage-text">
        <h1 class="ErrorPage-title">401</h1>
        <p class="ErrorPage-subtitle">错误的权限</p>
        <el-button plain class="subtitle">
          <RouterLink to="/" style="color: black;">
            回到首页
          </RouterLink>
        </el-button>
        <div class="ErrorPage-otherButtonContainer">
          <div>或者</div>
          <div class=" ErrorPage-goBackButton" @click="goBack">
              返回上一页
          </div>
        </div>


      </div>
      <div class="ErrorPage-errorImageContainer">
        <!-- <img class="ErrorPage-errorImage" src="//zhstatic.zhihu.com/assets/error/liukanshan_wire.svg" alt="page error"> -->
      </div>
    </div>
  </div>
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
