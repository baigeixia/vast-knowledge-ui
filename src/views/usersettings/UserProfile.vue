<template>
  <div class="prifile-main-box">
    <el-container class="container-header-box">
      <el-header class="header-box"><RouterLink to="/user"><div class="text">返回个人主页</div></RouterLink></el-header>
      <el-container class="container-main-box">
        <el-aside width="200px">Profile</el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
.prifile-main-box {
  width: 100%;

  .container-header-box {

    .header-box {
      display: flex;
  align-items: center;
      background-color: #fff;
      margin-bottom: 24px;
      padding-right: 15px;  
      --el-header-height:50px;

      .text{
        color: #000;
      }

    }

    .container-main-box {
      display: flex;
      justify-content: space-between;
    }
  }

}
</style>