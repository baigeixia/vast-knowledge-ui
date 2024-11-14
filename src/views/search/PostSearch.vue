<template>
    <el-container class="search-container">
        <el-header class="search-header" :class="{ 'search-top': ishide }">
            <div class="header-title">
                <div class="title" :class="{ active: type == 0 }" @click="switchPage(0)">综合</div>
                <div class="title" :class="{ active: type == 1 }" @click="switchPage(1)">文章</div>
                <!-- <div class="title" :class="{ active: type == 2 }" @click="switchPage(2)">课程</div> -->
                <!-- <div class="title" :class="{ active: type == 3 }" @click="switchPage(3)">标签</div> -->
                <div class="title" :class="{ active: type == 4 }" @click="switchPage(4)">用户</div>
            </div>
        </el-header>
        <div class="search-main">
            <div class="list-header" v-if="type != 4">
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
                        <el-select v-model="period" style="width: 100px" @change="searchtimechange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-content" v-if="type != 4">
                <div class="itme-List" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"
                    :infinite-scroll-disabled="endLoading">
                    <Maincontentlist :contents="homeList" />
                    <div class="item loading-dots" v-if="Loading">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <div class="end-of-data" v-if="endLoading && homeList.length > 0"> 已经到最底部了 </div>
                    <div class="end-of-data" v-if="Boolean(endLoading) && homeList.length == 0">没有找到内容</div>
                </div>
            </div>
            <div class="search-content" v-else>
                <div class="itme-List" v-infinite-scroll="userinfoloadMore" :infinite-scroll-immediate="false"
                    :infinite-scroll-disabled="UserendLoading">
                    <UserdialogTable :dialoguserlist="userinfoListData" style="overflow-y: hidden;" />
                    <div class="item loading-dots" v-if="UserLoading">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <div class="end-of-data" v-if="UserendLoading && userinfoListData.length > 0"> 已经到最底部了 </div>
                    <div class="end-of-data" v-if="Boolean(UserendLoading) && userinfoListData.length == 0">没有找到内容</div>
                </div>
            </div>
        </div>
    </el-container>
</template>

<script setup>
import { ref, onMounted, watchEffect, reactive, watch, toRaw } from "vue"
import { ishide } from '@/components/Publicvariables'
import { useRouter } from 'vue-router';
import Maincontentlist from '@/views/home/components/Maincontentlist.vue'
import { channelAppStore } from "@/stores/admin/channel";
const maincontent = channelAppStore()
import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()

import searchAppStore from "@/stores/admin/search";
const searchS = searchAppStore()

import UserdialogTable from '@/components/UserdialogTable.vue'


const router = useRouter();
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

const page = ref(1)
const homeList = ref([])
const props = defineProps({
    query: {
        type: String,
        required: true,
    },
    type: {
        type: [Number, String],
        required: false,
        default: () => 0
    },
    sort: {
        type: Number,
        required: false,
        default: () => 0
    },
    period: {
        type: String,
        required: false,
        default: () => "1"
    },
});

const period = ref(props.period)
const type = ref(props.type)
const searchSorting = ref(props.sort)


const queryParams = ref({
    query: props.query,
    type: props.type,
});

onMounted(() => {
    ApiAggregation()
})
const Loading = ref(false)
const endLoading = ref(false)
const searchInfo = async () => {
    if (Loading.value) return
    Loading.value = true
    try {
        const { query, type, sort, period } = toRaw(queryParams.value)
        const data = await searchS.getsearchInfo(query, type, sort, period, page.value)
        if (data && data.length != 0) {
            homeList.value = [...homeList.value, ...data]
        } else {
            endLoading.value = true
        }
    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        Loading.value = false;
    }
}

const loadMore = () => {
    console.log('loadMore');
    page.value++
    ApiAggregation()
}

const userinfoPage = ref(1)
const loadingdisabled = ref(false)
const userinfoListData = ref([])

const userinfoloadMore = () => {
    console.log('userinfoloadMore');
    userinfoPage.value++
    ApiAggregation()
}

const UserLoading = ref(false)
const UserendLoading = ref(false)
const getsearchUserInfo = async () => {
    if (UserLoading.value) return
    UserLoading.value = true
    try {
        const { query, type, sort, period, } = toRaw(queryParams.value)
        const data = await searchS.getsearchUserInfo(query, type, sort, period, userinfoPage.value)
        if (data && data.length != 0) {
            userinfoListData.value = [...userinfoListData.value, ...data]
        } else {
            UserendLoading.value = true
        }
    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        UserLoading.value = false;
    }
}


watch(
    () => props.query,
    (newVal) => {
        reset()
        queryParams.value = {
            ...queryParams.value,
            query: newVal,
        };
        ApiAggregation()
    }
);

const searchtimechange = () => {
    queryParams.value = {
        ...queryParams.value,
        period: period.value,
    };
    router.push({ query: { ...queryParams.value } });
    ApiAggregation()
}

const switchPage = (t) => {
    reset()
    type.value = t
    queryParams.value = {
        ...queryParams.value,
        type: type.value,
    }
    router.push({ query: { ...queryParams.value } });
    ApiAggregation()
}


const searchSortingShow = (sort) => {
    reset()
    searchSorting.value = sort
    queryParams.value = {
        ...queryParams.value,
        sort: sort,
    }
    router.push({ query: { ...queryParams.value } });
    ApiAggregation()

}
const ApiAggregation = () => {
    let propstype = props.type
    queryParams.value.type
    // if (type.value == 4 || propstype == 4) {
    if (queryParams.value.type == 4) {
        getsearchUserInfo()
    } else {
        searchInfo()
    }
}

const reset = () => {
    page.value = 1
    userinfoPage.value = 1
    endLoading.value = false
    UserendLoading.value = false

    userinfoListData.value = []
    homeList.value = []
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
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
            min-height: 600px;


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

            .item {
                flex: 1;
                line-height: 1.6;
                color: #8a919f;

                .item-count {
                    font-weight: 750;
                    color: #252933;
                    font-size: 16px;
                }
            }

            .loading-dots {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 80px;

                .dot {
                    width: 10px;
                    height: 10px;
                    background-color: #1e80ff;
                    border-radius: 50%;
                    margin: 0 5px;
                    animation: dot-bounce 1s infinite ease-in-out alternate;
                }

                @keyframes dot-bounce {
                    0% {
                        transform: translateY(0);
                    }

                    100% {
                        transform: translateY(-10px);
                    }
                }

                .dot:nth-child(2) {
                    animation-delay: 0.1s;
                }

                .dot:nth-child(3) {
                    animation-delay: 0.2s;
                }
            }
        }

        .end-of-data {
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 20px;
            color: #8a919f;
            font-size: 16px;

        }
    }
}
</style>
