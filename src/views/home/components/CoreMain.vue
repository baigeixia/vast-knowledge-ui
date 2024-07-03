<template>
  <div class="main-container">
    <header class="list-header">
      <div class="list">
        <ul class="list-ul">
          <li class="list-li is-active">
            <a href="/">推荐</a>
          </li>
          <li class="list-li"><a href="/">最新</a></li>
        </ul>
      </div>
    </header>
    <div class="top-content">
      <!-- <Maincontentlist class="top-content-list" :contents="contentItems" :infinite-scroll-distance="100"  v-infinite-scroll="loadMore" :infinite-scroll-disabled="isLoading" /> -->
      <Maincontentlist :contents="maincontent.maincontentllist" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import Maincontentlist from './Maincontentlist.vue'
import {maincontentAppStore} from '@/stores/admin/maincontent'
const  maincontent=maincontentAppStore()
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
    flex: 1;
    padding: 10px;

    .infinite-list {
      overflow-y: hidden;
      height: 700px;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .infinite-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: var(--el-color-primary-light-9);
      margin: 10px;
      color: var(--el-color-primary);
    }

    .infinite-list-item+.list-item {
      margin-top: 10px;
    }

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
