<template>
  <div class="">
    <div class="ErrorPage-container">
      <div class="ErrorPage-text">
        <h1 class="ErrorPage-title">404</h1>
        <p class="ErrorPage-subtitle">你似乎来到了没有知识存在的荒原</p>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const pageTitle = ref('404');
onMounted(() => {
  document.title = pageTitle.value;
});
const goBack = () => {
  router.go(-1)
  // 使用 Vue Router 返回上一页
}
</script>

<style lang="scss" scoped>
.ErrorPage-container {
  display: flex;
  justify-content: center;
  margin-top: 180px;

  .ErrorPage-text {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 384px;

    .ErrorPage-title {
      font-size: 40px;
      font-synthesis: style;
      font-weight: 600;
    }

    .ErrorPage-subtitle {
      font-size: 18px;
      margin-top: 10px;
    }

    .ErrorPage-otherButtonContainer {
      align-items: center;
      color: #0084ff;
      display: flex;
      font-size: 14px;
      margin-top: 20px;
      font-synthesis: style;
      font-weight: 600;

      .ErrorPage-goBackButton {
        align-items: center;
        display: flex;
        margin-left: 0.5em;
        font-synthesis: style;
        font-weight: 600;
        cursor: pointer;
      }

      .ErrorPage-goBackButton:hover {
        color: #015fb6;
      }
    }

    .subtitle {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
