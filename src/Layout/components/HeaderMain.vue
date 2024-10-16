<template>
  <div class="main-header-box">
    <a class="logo" href="/">logo</a>
    <div class="header-title">
      <div class="title-ul">
        <RouterLink to="/">
          <div class="title-li active" :class="{ 'isactive': route.path === '/' }">
            <i>首页</i>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="header-right">
      <div class="right-ul">
        <!-- <el-input v-model="input" type="text" style="width: 260px" placeholder="搜索" suffix-icon="Search"  clearable /> -->
        <div class="right-li">
          <el-input v-model="headerinput" style="width: 400px" placeholder="搜索" class="header-input"
            @keyup.enter="headersearch" :focus="inputfocus" @blur="inputblur">
            <template #append>
              <el-button class="header-search" @click="headersearch" icon="Search" />
            </template>
          </el-input>
          <transition name="fade-slide">
            <div class="search-suggestions" v-if="isfocus">
              <div class="trending-searches">
                <h3>搜索发现</h3>
              </div>
              <div class="itme-list" v-for="(term, index) in trendingTerms" :key="index">
                  <span class="itme-text">{{ term.text }}</span>
                  <span v-if="term.isHot" class="hot-icon">🔥</span>
                </div>
              <div class="search-history">
                <div class="history-header">
                  <h3>搜索历史</h3>
                  <button @click="clearHistory"> <i class="bi bi-trash"></i>清空</button>
                </div>
              </div>
              <div v-for="(term, index) in searchHistory" :key="index">
                  {{ term }}
                </div>
            </div>
          </transition>
        </div>
        <div class="right-li">
          <el-button style="border-radius:15px;" type="primary" @click="navigateToPublish">发布</el-button>
        </div>
        <el-dropdown style=" cursor: pointer;" trigger="click">
          <div class="right-li">
            <el-badge :show-zero='false' :is-dot="notificationS.ishederMsg" :offset="[5, 3]">
              <div class="right-li-datails">
                <el-icon>
                  <Bell />
                </el-icon>
                <div>消息</div>
              </div>
            </el-badge>
          </div>
          <template #dropdown>
            <el-dropdown-menu style="z-index: 1000;">
              <RouterLink to="/notifications">
                <el-dropdown-item>
                  <el-icon>
                    <ChatLineSquare />
                  </el-icon>
                  <el-badge :is-dot="notificationS.iscomment" :show-zero="false" :offset="[10, 5]">
                    评论与回复
                  </el-badge>
                </el-dropdown-item>
              </RouterLink>
              <RouterLink to="/notifications/digg"><el-dropdown-item><el-icon>
                    <CollectionTag />
                  </el-icon><el-badge :is-dot="notificationS.isdigg" :show-zero="false" :offset="[10, 5]">
                    赞和收藏
                  </el-badge></el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/follow"><el-dropdown-item><el-icon>
                    <Notification />
                  </el-icon> <el-badge :is-dot="notificationS.isfollow" :show-zero="false" :offset="[10, 5]">
                    新增粉丝
                  </el-badge></el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/im"><el-dropdown-item><el-icon>
                    <ChatDotRound />
                  </el-icon><el-badge :is-dot="notificationS.isim" :show-zero="false" :offset="[10, 5]">
                    私信
                  </el-badge></el-dropdown-item></RouterLink>
              <RouterLink to="/notifications/system"><el-dropdown-item><el-icon>
                    <Bell />
                  </el-icon><el-badge :is-dot="notificationS.issystem" :show-zero="false" :offset="[10, 5]">
                    系统通知
                  </el-badge></el-dropdown-item></RouterLink>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown style=" cursor: pointer;" trigger="click">
          <div class="right-li">
            <!-- <el-badge :is-dot="Cpuvalue" :offset="[-10, 5]"> -->
            <div class="right-li-datails">
              <el-icon>
                <Cpu />
              </el-icon>
              <div>创作中心</div>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu style="z-index: 1000;">
              <el-dropdown-item @click="item_TO_WE(1)"><i class="bi bi-graph-up-arrow"></i>图文数据</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(2)"><i class="bi bi-columns-gap"></i>发布文章</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(3)"><i
                  class="bi bi-layout-text-window-reverse"></i>内容列表</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(4)"><i class="bi bi-palette"></i>素材管理</el-dropdown-item>
              <el-dropdown-item @click="item_TO_WE(5)"><i class="bi bi-person-hearts"></i>粉丝管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown style=" cursor: pointer;" trigger="click" v-if="userinfoAppStores.userid && getToken()">
          <div class="right-li">
            <div class="right-li-datails">
              <!-- <el-icon>
                <User />
              </el-icon>
              <div>头像</div> -->
              <Avatar class="avatar-img" :Image="userinfoAppStores.userLocalinfo.image" alt=" "></Avatar>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu style="z-index: 1000;">
              <RouterLink :to="`/user/${userinfoAppStores.userid}`">
                <el-dropdown-item>
                  <el-icon>
                    <User />
                  </el-icon>
                  个人主页
                </el-dropdown-item>
              </RouterLink>
              <RouterLink to="/user/settings"><el-dropdown-item><el-icon>
                    <Setting />
                  </el-icon>我的设置</el-dropdown-item>
              </RouterLink>
              <RouterLink to="/footmark"><el-dropdown-item> <i class="bi bi-clock"></i>我的足迹</el-dropdown-item>
              </RouterLink>
              <!-- <RouterLink to="/user/settings"><el-dropdown-item><el-icon>
                    <Setting />
                  </el-icon>退出登录</el-dropdown-item>
              </RouterLink> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="login-button-wrap" v-else>
          <div class="login-button">
            <span @click="userStore.isnotlogin = true">登录/注册</span>
          </div>
          <!-- <div class="login-button">
            <span>注册</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue"
import { byLoading } from '@/utils/Loading'
import { useRouter, useRoute } from 'vue-router';
import { channelAppStore } from "@/stores/admin/channel";
const header = channelAppStore()
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()
import { getUserid, getToken, getUserInfo } from '@/utils/auth'

import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

import useUserStore from '@/stores/admin/user'
const userStore = useUserStore()

const route = useRoute();
const router = useRouter();

const headerinput = ref('')
const isfocus = ref(false);

const inputfocus = () => {
  console.log('focus');
  isfocus.value = true
}
const inputblur = () => {
  console.log('inputblur');
  isfocus.value = false
}

onMounted(async () => {
  // const id = getUserid()
  // if (!id) {
  //   await userinfoAppStores.getusergetLocalInfo()
  // }
  await userinfoAppStores.getusergetLocalInfo()
})

const upheadertype = (type) => {
  header.headertype = type
}

const navigateToPublish = () => {
  // 使用 Vue Router 进行跳转
  // this.$router.push('/publish');

  // 或者使用 window.location.href 进行跳转
  // window.location.href = 'http://localhost:8081/publish';
  window.open('http://localhost:8081/publish', '_blank');
}
const headersearch = () => {
  let queryimput = headerinput.value
  console.log(headerinput.value);
  // const query = encodeURIComponent('先活着再生活');
  if (queryimput) {
    const queryParams = {
      query: queryimput,
      fromSeo: 0,
      fromHistory: 0,
      fromSuggest: 0,
      type: 0
    };
    // 使用 router.push 导航到带查询参数的路由
    router.push({ name: 'search', query: queryParams });
  }

};

const item_TO_WE = (type) => {
  if (type === 1) {
    // window.location.href = 'http://localhost:8081/';
    window.open('http://localhost:8081/', '_blank');
  } else if (type === 2) {
    // window.location.href = 'http://localhost:8081/publish';
    window.open('http://localhost:8081/publish', '_blank');
  } else if (type === 3) {
    // window.location.href = 'http://localhost:8081/news';
    window.open('http://localhost:8081/news', '_blank');
  } else if (type === 4) {
    // window.location.href = 'http://localhost:8081/material';
    window.open('http://localhost:8081/material', '_blank');
  } else if (type === 5) {
    // window.location.href = 'http://localhost:8081/fans';
    window.open('http://localhost:8081/fans', '_blank');
  }

}
const searchQuery = ref('')
const searchHistory = ref([])

const trendingTerms = ref([
  { text: '王楚钦孙颖莎', isHot: true },
  { text: '东部战区演习', isHot: true },
  { text: '18 强赛国足', isHot: false },
  { text: '照潮推涌', isHot: false },
  { text: '朝鲜炸毁南北', isHot: true }
])

const handleSearch = () => {
  if (this.searchQuery) {
    this.searchHistory.push(this.searchQuery);
    this.searchQuery = ''; // Clear input after search
  }
}
const clearHistory = () => {
  searchHistory = [];
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
    min-width: 50px;
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
        min-width: 32px;
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

      .isactive {
        color: #1e80ff;

        i {
          padding-bottom: 5px;
          border-bottom: 2px #1e80ff solid;
        }

      }

    }


  }



  .header-right {

    .right-ul {
      display: flex;
      align-items: center;
      justify-content: start;

      .el-scrollbar {
        z-index: 1000;
      }

      .header-dropdown-menu {
        z-index: 1000;
      }

      .right-li {
        padding: 0 10px 0 10px;
        position: relative;

        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: rgb(255, 255, 255);
          z-index: 100;
          border-radius: 8px;
          margin-top: 5px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
          // box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        }

        .trending-searches,
        .search-history {
          border-bottom: 1px solid #aeb5c2 ;

          h3 {
            color: #939eb0;
            font-size: 16px;
            margin: 15px 0 10px 10px;
          }

        }
        .itme-list {
            margin: 5px 5px;
            .itme-text{
              cursor: pointer;
            }
            .itme-text:hover{
              color: #1e80ff;
            }
          }

        .search-history {
          .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            button {
              background-color: transparent;
              border: none;
              color: #939eb0;
              cursor: pointer;
            }
            button:hover{
              color: #6a84af;
            }
          }
        }

        .fade-slide-enter-active,
        .fade-slide-leave-active {
          transition: all 0.3s ease;
        }

        .fade-slide-enter-from {
          opacity: 0;
          transform: translateY(-10px);
          /* Slide in from top */
        }

        .fade-slide-leave-to {
          opacity: 0;
          transform: translateY(-10px);
          /* Slide out to top */
        }

        .right-li-datails {
          text-align: center;

          .avatar-img {
            object-fit: cover;
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }

        }


        .header-input {
          --el-input-border-radius: 20px;

          .header-search {
            padding: 0;
            font-size: 20px;
          }
        }
      }

      .login-button-wrap {
        border: 1px solid rgba(191, 192, 194, 0.3);
        border-radius: 4px;
        color: #797a7c;
        padding: 5px;
        font-size: 14px;
        font-weight: 400;
        overflow: hidden;
        display: flex;
        align-items: center;

        .login-button {
          cursor: pointer;
          margin: 5px;
        }

        span:hover {
          color: #1e80ff;
        }
      }

      // .right-li:hover {
      //   color: #1e80ff;
      // }
    }
  }
}
</style>
