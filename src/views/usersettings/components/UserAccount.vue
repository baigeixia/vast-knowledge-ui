<template>
  <div class="account-view">
    <h1 class="account-head">账号设置</h1>
    <div class="item">
      <span class="title">手机</span>
      <div class="input-box">
        <div class="account">{{phone}}</div>
        <div class="action-box">编辑</div>
      </div>
    </div>
    <div class="item">
      <span class="title">微信</span>
      <div class="input-box">
        <div class="account">未绑定</div>
        <div class="action-box">编辑</div>
      </div>
    </div>
    <div class="item">
      <span class="title">新浪微博</span>
      <div class="input-box">
        <div class="account">未绑定</div>
        <div class="action-box">编辑</div>
      </div>
    </div>
    <div class="item">
      <span class="title">Github</span>
      <div class="input-box">
        <div class="account">未绑定</div>
        <div class="action-box">编辑</div>
      </div>
    </div>
    <div class="item">
      <span class="title">密码</span>
      <div class="input-box">
        <div class="account"></div>
        <div class="action-box">重置</div>
      </div>
    </div>
    <div class="item">
      <span class="title">账号注销</span>
      <div class="input-box">
        <div class="account"></div>
        <div class="action-box">注销</div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref,onMounted } from 'vue';
const pageTitle = ref('账号设置');

import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const phone=ref('')

onMounted(async() => {
  document.title = pageTitle.value;
  await userinfoAppStores.getusergetLocalInfo()
  phone.value=userinfoAppStores.userLocalinfo.phone

});
</script>
  
<style lang="scss" scoped>
.account-view {
  box-sizing: border-box;
  min-height: 626px;

  .account-head {
    font-size: 2em;
    color: #252933;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding: 16px 20px;
    border-bottom: 1px solid #e4e6eb;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 1.1rem 2rem;
    border-bottom: 1px solid #e4e6eb;

    .title {
      font-size: 1.2rem;
      color: #515767;
      width: 10rem;
    }

    .input-box {
      display: flex;
      align-items: center;
      width: 100%;

      .account {
        flex: 1 0 auto;
        font-size: 1rem;
        color: #8a919f;
      }
      .action-box {
        cursor: pointer;
          margin-left: 1rem;
          padding: 0;
          // font-size: 1.2rem;
          color: #1e80ff;
          background-color: transparent;
          white-space: nowrap;
        }

    }
  }
}
</style>
  