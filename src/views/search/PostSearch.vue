<template>
    <el-container class="search-container">
        <el-header class="search-header" :class="{ 'search-top': ishide }">
            <div class="header-title">
                <div class="title" :class="{ active: type == 0 }" @click="switchPage(0)">综合</div>
                <div class="title" :class="{ active: type == 1 }" @click="switchPage(1)">文章</div>
                <!-- <div class="title" :class="{ active: type == 2 }" @click="switchPage(2)">课程</div> -->
                <div class="title" :class="{ active: type == 3 }" @click="switchPage(3)">标签</div>
                <div class="title" :class="{ active: type == 4 }" @click="switchPage(4)">用户</div>
            </div>
        </el-header>
        <div class="search-main">
            <div class="list-header">
                <div class="list-nav">
                    <div class="nav-list-left">
                        <div class="nav-item" :class="{ 'nav-item-active': searchSorting == '0' }"
                            @click="searchSortingShow(0)">
                            综合排序</div>
                        <div class="nav-item" :class="{ 'nav-item-active': searchSorting == '1' }"
                            @click="searchSortingShow(1)">
                            最新优先</div>
                        <div class="nav-item" :class="{ 'nav-item-active': searchSorting == '2' }"
                            @click="searchSortingShow(2)">
                            最热优先</div>
                    </div>
                    <div class="nav-list-right">
                        <el-select v-model="searchtime" style="width: 100px" @change="searchtimechange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-content">
                <Maincontentlist :contents="articleStore.articleList.records" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false" :infinite-scroll-disabled="isLoading" />
            </div>
        </div>
    </el-container>
</template>

<script setup>
import { ref, onMounted, watchEffect,reactive } from "vue"
import { ishide } from '@/components/Publicvariables'
import { useRouter } from 'vue-router';
import Maincontentlist from '@/views/home/components/Maincontentlist.vue'
import { channelAppStore } from "@/stores/admin/channel";
const maincontent = channelAppStore()
import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()

const router = useRouter();
const searchtime = ref('1')
const searchSorting = ref(0)
const isLoading = ref(false)
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

const loadMore=()=>{
    console.log('loadMore');
}

const props = defineProps({
    query: String,
    fromSeo: String,
    fromHistory: String,
    fromSuggest: String,
    type: String
});

const queryParams = reactive(
    {
        query: '',
        fromSeo: 0,
        fromHistory: 0,
        fromSuggest: 0,
        type: 0,
        sort: 0,
        period: 1,
    }
);

onMounted(()=>{
    queryParams.query=props.query
    queryParams.fromSeo=props.fromSeo
    queryParams.fromHistory=props.fromHistory
    queryParams.fromSuggest=props.fromSuggest
    queryParams.type=props.type
})

const searchtimechange=()=>{
    console.log('排序',searchtime.value);
}

const switchPage = (type) => {
    const upqueryParams = {
        ...queryParams,
        type: type,
    }
    // 使用 router.push 导航到带查询参数的路由
    router.push({ query: upqueryParams });
    console.log('头部标签',type);
}


const searchSortingShow = (type) => {
    searchSorting.value=type
    console.log('详情标签 ',type);
    // queryParams.sort=type
  
}
</script>

<style lang="scss" scoped>
.search-container {
    max-width: 800px;
    margin: 0 auto;

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
     
            .list-nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.66rem;
  border-bottom: 1px solid #f2f3f5;

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
            padding: 10px;
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
