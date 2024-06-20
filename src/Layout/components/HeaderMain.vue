<template>
  <div class="main-header-box">
    <a class="logo" href="/">logo</a>
    <div class="header-title">
      <div class="title-ul">
        <RouterLink to="/">
          <div class="title-li active">
            <i>首页</i>
          </div>
        </RouterLink>
        <RouterLink to="/">
          <div class="title-li active">
            <i>推荐</i>
          </div>
        </RouterLink>
        <RouterLink to="/">
          <div class="title-li active">
            <i>热榜</i>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="header-right">
      <div class="right-ul">
        <!-- <el-input v-model="input" type="text" style="width: 260px" placeholder="搜索" suffix-icon="Search"  clearable /> -->
        <div class="right-li">
          <el-input v-model="headerinput" style="width: 400px" placeholder="搜索" class="header-input">
            <template #append>
              <el-button class="header-search" @click="headersearch" icon="Search" />
            </template>
          </el-input>
        </div>
        <div class="right-li">
          <el-button style="border-radius:15px;" type="primary">发布</el-button>
        </div>
        <el-dropdown style=" cursor: pointer;">
          <div class="right-li">
            <el-badge :show-zero='false' :value="Bellvalue" :offset="[5, 3]">
              <div class="right-li-datails">
                <el-icon>
                  <Bell />
                </el-icon>
                <div>消息</div>
              </div>
            </el-badge>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <RouterLink to="/notifications"><el-dropdown-item><el-icon><ChatLineSquare /></el-icon>评论</el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/digg"><el-dropdown-item><el-icon><CollectionTag /></el-icon>赞和收藏</el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/follow"><el-dropdown-item><el-icon><Notification /></el-icon>新增粉丝</el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/im"><el-dropdown-item><el-icon><ChatDotRound /></el-icon>私信</el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/system"><el-dropdown-item><el-icon><Bell /></el-icon>系统通知</el-dropdown-item></RouterLink>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown style=" cursor: pointer;">
          <div class="right-li">
            <el-badge :is-dot="Cpuvalue" :offset="[-10, 5]">
              <div class="right-li-datails">
                <el-icon>
                  <Cpu />
                </el-icon>
                <div>创作中心</div>
              </div>
            </el-badge>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="item_TO_WE(1)"><i class="bi bi-graph-up-arrow"></i>图文数据</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(2)"><i class="bi bi-columns-gap"></i>发布文章</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(3)"><i class="bi bi-layout-text-window-reverse"></i>内容列表</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(4)"><i class="bi bi-palette"></i>素材管理</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(5)"><i class="bi bi-person-hearts"></i>粉丝管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown style=" cursor: pointer;">
          <div class="right-li">
            <div class="right-li-datails">
              <el-icon>
                <User />
              </el-icon>
              <div>头像</div>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <RouterLink to="/user"><el-dropdown-item><el-icon><User /></el-icon>个人主页</el-dropdown-item></RouterLink>
              <RouterLink to="/user/settings"><el-dropdown-item><el-icon><Setting /></el-icon>我的设置</el-dropdown-item></RouterLink>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { byLoading } from '@/utils/Loading'
const headerinput = ref('')
const Bellvalue = ref(12)
const Roundvalue = ref(99)
const Cpuvalue = ref(true)

const headersearch = () => {
  console.log(headerinput.value);
}

const item_TO_WE=(type)=>{
  if(type===1){
    window.location.href = 'http://localhost:5174/';
  }else if (type===2){
    window.location.href = 'http://localhost:5174/publish';
  }else if (type===3){
    window.location.href = 'http://localhost:5174/news';
  }else if (type===4){
    window.location.href = 'http://localhost:5174/material';
  }else if (type===5){
    window.location.href = 'http://localhost:5174/fans';
  }
  
}
</script>

<style lang="scss" scoped>
.main-header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  // width: 100%;

  .logo {
    margin-right: 1rem;
    margin-left: 24px;
    color: #000;
  }

  .header-title {
    display: flex;
    text-align: center;

    .title-ul {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-li {
        padding: 0 1rem;
        color: #9fa2ab;
        font-size: 16px;
      }

      .title-li:not(.active a):hover {
        color: #252933;
      }

      .title-li:hover {
        i {
          padding-bottom: 5px;
          border-bottom: 2px #1e80ff solid;
        }
      }

      .active a {
        color: #1e80ff;
      }

    }


  }



  .header-right {

    .right-ul {
      display: flex;
      align-items: center;
      justify-content: start;

      .el-scrollbar{
        z-index: 1000;
      }

      .right-li {
        padding: 0 10px 0 10px;

        .right-li-datails {
          text-align: center;
        }

        .header-input {
          --el-input-border-radius: 20px;

          .header-search {
            padding: 0;
            font-size: 18px;
          }
        }
      }

      .right-li:hover {
        color: #1e80ff;
      }
    }
  }
}
</style>
