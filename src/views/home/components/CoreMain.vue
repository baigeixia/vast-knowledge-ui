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
      <Maincontentlist :contents="contentItems"/>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import Maincontentlist from './Maincontentlist.vue'
const count = ref(0)

const page = ref(0)
const pagesize = ref(10)
const isLoading = ref(false)
const noMore = computed(() => contentItems.value.length >= 20)
const contentItems = ref([
  {
    id: 22,
    thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
    title: `预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8
                        分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到
                        8
                        分钟错过航班索赔 2400 元，此事责任在谁？`,
    abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
    author: {
      id: 1,
      avatar: 'https://via.placeholder.com/40',
      username: '小红帽的大灰狼',
      position: '工程师',
    },
    browse: '106k',
    like: '653',
    tags: [
      {
        id: 1,
        url: '/',
        name: '后端',
      },
      {
        id: 2,
        url: '/',
        name: '掘金·金石计划',
      },
      {
        id: 3,
        url: '/',
        name: '前端',
      },
    ],
  },
])
const upcontentItems = ref([
  {
    id: 22,
    thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
    title: `预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8
                        分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到
                        8
                        分钟错过航班索赔 2400 元，此事责任在谁？`,
    abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
    author: {
      id: 1,
      avatar: 'https://via.placeholder.com/40',
      username: '小红帽的大灰狼',
      position: '工程师',
    },
    browse: '106k',
    like: '653',
    tags: [
      {
        id: 1,
        url: '/',
        name: '后端',
      },
      {
        id: 2,
        url: '/',
        name: '掘金·金石计划',
      },
      {
        id: 3,
        url: '/',
        name: '前端',
      },
    ],
  },
])
const loadMore = async () => {
  // page.value += 2
  // console.log(page.value);

  if (isLoading.value) return;

  isLoading.value = true;

  console.log(page.value);
  console.log(pagesize.value);
  try {
    contentItems.value = [...contentItems.value, ...upcontentItems.value]
    page.value += 1;
  } catch (error) {
    console.error('Error loading more data:', error);
  } finally {
    isLoading.value = false;
  }
}

const fetchMoreData = () => {
  // Simulate fetching more data (replace with actual API call)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulated successful data fetch
      resolve();
    }, 1000); // Simulated delay
  });
};

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
