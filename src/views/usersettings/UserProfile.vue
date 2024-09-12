<template>
  <div class="prifile-main-box">
    <el-container class="container-header-box">
      <el-header class="header-box">
        <RouterLink :to="`/user/${userinfoAppStores.userLocalinfo.id}`">
          <div class="text"><el-icon>
              <ArrowLeft />
            </el-icon>返回个人主页</div>
        </RouterLink>
      </el-header>
      <el-container class="container-main-box">
        <el-aside class="aside-box">
          <RouterLink to="personal">
            <div class="nav-item" :class="{'active': isActive('/user/settings/personal')}"><el-icon>
                <Postcard />
              </el-icon>个人资料</div>
          </RouterLink>
          <RouterLink to="account">
            <div class="nav-item" :class="{'active': isActive('/user/settings/account')}"><el-icon>
                <User />
              </el-icon>账号设置</div>
          </RouterLink>
          <!-- <RouterLink to="common">
            <div class="nav-item" :class="{'active': isActive('/user/settings/common')}"><el-icon>
                <Setting />
              </el-icon>通用设置</div>
          </RouterLink> -->
          <RouterLink to="message">
            <div class="nav-item" :class="{'active': isActive('/user/settings/message')}"><el-icon>
                <ChatDotRound />
              </el-icon>消息设置</div>
          </RouterLink>
          <RouterLink to="block">
            <div class="nav-item" :class="{'active': isActive('/user/settings/block')}"><el-icon>
                <MuteNotification />
              </el-icon>屏蔽管理</div>
          </RouterLink>
        </el-aside>
        <el-main class="main-box">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const isActive = (path) => {
    return route.path === path;
};

</script>

<style lang="scss" scoped>
.prifile-main-box {
  width: 100%;
  background-color: #fff;
  .container-header-box {
    height: 100%;

    .header-box {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      padding-right: 15px;
      --el-header-height: 50px;
      border-bottom: 3px solid #f2f3f5;

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #1e80ff;
      }

    }

    .container-main-box {
      .aside-box {
        padding: 8px;
        border-right: 1px solid #dcdfe6;
        width: auto;

        .nav-item {
          display: flex;
          align-items: center;
          font-weight: 400;
          height: 48px;
          width: 180px;
          margin: 5px;
          font-size: 16px;
          border-radius: 4px;
          color: #515767;

          .el-icon {
            margin-right: 12px;
            margin-left: 24px;
          }
        }

        .nav-item:hover{
          background-color: #eaf2ff;
          color: #1c7efc;

        }

        .active{
          background-color: #eaf2ff;
          color: #1c7efc;
        }

      }

    }
  }

}</style>