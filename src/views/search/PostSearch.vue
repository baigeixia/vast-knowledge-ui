<template>
    <el-container class="search-container">
        <el-header class="search-header" :class="{ 'search-top': ishide }">
            <div class="header-title">
                <div class="title" :class="{ active: type == 0 }" @click="switchPage(0)">综合</div>
                <div class="title" :class="{ active: type == 1 }" @click="switchPage(1)">文章</div>
                <div class="title" :class="{ active: type == 2 }" @click="switchPage(2)">课程</div>
                <div class="title" :class="{ active: type == 3 }" @click="switchPage(3)">标签</div>
                <div class="title" :class="{ active: type == 4 }" @click="switchPage(4)">用户</div>
            </div>
        </el-header>
        <el-main class="search-main">
            <div class="list-header">
                <div class="list-nav">
                    <div class="nav-list-left">
                        <div class="nav-item" :class="{ 'nav-item-active': searchSorting == '0' }"
                            @click="searchSorting = 0">
                            综合排序</div>
                        <div class="nav-item" :class="{ 'nav-item-active': searchSorting == '1' }"
                            @click="searchSorting = 1">
                            最新优先</div>
                        <div class="nav-item" :class="{ 'nav-item-active': searchSorting == '2' }"
                            @click="searchSorting = 2">
                            最热优先</div>
                    </div>
                    <div class="nav-list-right">
                        <el-select v-model="searchtime" style="width: 100px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <Maincontentlist :contents="contentItems" class="search-content" v-infinite-scroll="loadMore" :infinite-scroll-disabled="isLoading" />
        </el-main>
    </el-container>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue"
import { useScroll } from '@vueuse/core'
import { ishide } from '@/components/Publicvariables'
import { useRouter } from 'vue-router';
import Maincontentlist from '@/views/home/components/Maincontentlist.vue'

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
        id:1,
        url: '/',
        name: '后端',
      },
      {
        id:2,
        url: '/',
        name: '掘金·金石计划',
      },
      {
        id:3,
        url: '/',
        name: '前端',
      },
    ],
  }
])

const router = useRouter();
const searchtime = ref('1')
const searchSorting = ref(0)
const { y } = useScroll(window)
const options = [
    {
        value: '1',
        label: '不限时间',
    },
    {
        value: '2',
        label: '最近一天',
    },
    {
        value: '3',
        label: '最近一周',
    },
    {
        value: '4',
        label: '最近三月',
    },
]


const props = defineProps({
    query: String,
    fromSeo: String,
    fromHistory: String,
    fromSuggest: String,
    type: String
});


const page = ref(0)
const pagesize = ref(10)
const isLoading = ref(true)

const loadMore = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    console.log(page.value);
    console.log(pagesize.value);
    try {
        // Simulate an asynchronous operation (e.g., API call)
        await fetchMoreData();
        page.value += 2; // Update page number
    } catch (error) {
        console.error('Error loading more data:', error);
    } finally {
        isLoading.value = false; // Reset loading state
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

const queryParams = ref(
    {
        query: '先活着再生活',
        fromSeo: 0,
        fromHistory: 0,
        fromSuggest: 0,
        type: 0,
        sort: 0,
        period: 1,
    }
);


const switchPage = (type) => {
    const upqueryParams = {
        ...queryParams.value,
        type: type,
    }
    // 使用 router.push 导航到带查询参数的路由
    router.push({ query: upqueryParams });
}

</script>

<style lang="scss" scoped>
.search-container {
    max-width: 800px;
    margin: 0 auto;

    // .infinite-list {
    //     height: 300px;
    //     padding: 0;
    //     margin: 0;
    //     list-style: none;
    // }

    // .infinite-list .infinite-list-item {
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     height: 50px;
    //     background: var(--el-color-primary-light-9);
    //     margin: 10px;
    //     color: var(--el-color-primary);
    // }

    // .infinite-list .infinite-list-item+.list-item {
    //     margin-top: 10px;
    // }

    .search-header {
        height: 50px;
        background-color: #fff;
        position: fixed;
        top: 3.5rem;
        left: 0;
        width: 100%;
        transition: all .3s;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
        z-index: 800;

        .header-title {
            height: 100%;
            width: 800px;
            margin: 0 auto;
            display: flex;
            align-items: center;

            .title {
                color: #515767;
                display: flex;
                height: 100%;
                align-items: center;
                font-size: 16px;
                margin: 0 22px;
                cursor: pointer;
            }

            .title:hover {
                color: #1e80ff;
            }

            .active {
                color: #1e80ff;
            }
        }
    }

    .search-top {
        transform: translate3d(0, -4rem, 0);
    }


    .search-main {
        background-color: #fff;
        margin-top: 50px;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

        .list-header {
            padding: 0 0 1rem 0;
            border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);

            .list-nav {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .nav-list-left {
                    display: flex;

                    .nav-item {
                        padding: 0 1.2rem;
                        cursor: pointer;
                    }

                    .nav-item:hover {
                        color: #1e80ff;
                    }

                    .nav-item-active {
                        color: #1e80ff;
                    }
                }

            }

        }

        .search-content {
            :deep(.content-skeleton-item) {
                padding-bottom: 12px;
            }

            :deep(.title-row) {
                -webkit-line-clamp: 1;
            }

            :deep(.row-text .abstract) {
                -webkit-line-clamp: 2;
            }

            :deep(.row-text) {
                .abstract {
                    -webkit-line-clamp: 2;
                }

                .thumb {
                    height: 60px;
                }
            }
        }
    }
}
</style>
