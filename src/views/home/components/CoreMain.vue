<template>
  <div class="main-container">
    <header class="list-header">
      <div class="list">
        <ul class="list-ul">
          <li class="list-li" :class="{' is-active' :  maincontent.navigationtype===0 }" @click="navigationtypeSwit(0)">
            <!-- <a href="/"></a> -->
            <RouterLink to="/" > 推荐</RouterLink>
          </li>
          <li class="list-li" :class="{' is-active' :  maincontent.navigationtype===1 }"  @click="navigationtypeSwit(1)">
            <!-- <a href="/">最新</a> -->
            <RouterLink to="/"> 最新</RouterLink>
          </li>
        </ul>
      </div>
    </header>
    <div class="top-content">
      <!-- <Maincontentlist class="top-content-list" :contents="contentItems" :infinite-scroll-distance="100"  v-infinite-scroll="loadMore" :infinite-scroll-disabled="isLoading" /> -->
      <Maincontentlist :contents="maincontent.maincontentllist"  v-infinite-scroll="maincontent.loadMore" :infinite-scroll-disabled="maincontent.isLoading" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import Maincontentlist from './Maincontentlist.vue'
import {maincontentAppStore} from '@/stores/admin/maincontent'
const  maincontent=maincontentAppStore()

const navigationtypeSwit = (type) => {
  console.log(type);
  maincontent.navigationtype = type
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
