<template>
  <div class="main-container">
    <header class="list-header">
      <div class="list">
        <ul class="list-ul">
          <li class="list-li" :class="{' is-active' :  articleStore.navigationtype === 0 }" @click="navigationtypeSwit(0)">
            <!-- <a href="/"></a> -->
            <RouterLink to="/" > 推荐</RouterLink>
          </li>
          <li class="list-li" :class="{' is-active' :  articleStore.navigationtype === 1 }"  @click="navigationtypeSwit(1)">
            <!-- <a href="/">最新</a> -->
            <RouterLink to="/"> 最新</RouterLink>
          </li>
        </ul>
      </div>
    </header>
    <div  v-if="articleStore.articleList" class="top-content">
      <Maincontentlist :contents="articleStore.articleList.records"  :infinite-scroll-immediate="false"  v-infinite-scroll="articleStore.loadMore" :infinite-scroll-disabled="articleStore.loadingdisabled" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed ,onMounted} from "vue"
import Maincontentlist from './Maincontentlist.vue'

import { channelAppStore } from "@/stores/admin/channel";
const  maincontent=channelAppStore()

import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()


onMounted(()=>{
  articleStore.isLoadingEnd=false
  articleStore.page=1 
  articleStore.articleList={}
  articleStore.getarticleList()
  articleStore.noMore=false

  document.documentElement.style.overflowY = 'scroll';
})

const navigationtypeSwit = (type) => {
  articleStore.isLoadingEnd=false
  articleStore.page=1
  articleStore.navigationtype = type
  articleStore.articleList={}
  articleStore.getarticleList()
  articleStore.noMore=false

}

</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex: 15;
  background-color: #fff;
  margin-right: 20px;
  border-radius: 4px;
  min-height: 800px;


  .top-content {
    padding: 10px;
  }

  .list-header {
    padding: 1rem 1.66rem;
    border-bottom: 1px solid #f2f3f5;

    .list {
      display: flex;
      align-items: center;

      .list-ul {
        display: flex;
        justify-content: space-between;

        .list-li {
          font-size: 15px;
          padding: 0 1.36rem;
          line-height: 2rem;
          cursor: pointer;

          a {
            color: #909090;
          }
        }

        .list-li:hover {
          a {
            color: #1e80ff;
          }
        }

        .is-active {
          a {
            color: #252933;
            padding-bottom: 10px;
            border-bottom: 2px solid #1e80ff;
          }
        }


        .list-li:first-child {
          margin-left: -1.66rem;
        }
      }
    }
  }
}
</style>
