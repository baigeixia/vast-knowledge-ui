<template>
    <div class="footmark-main">
        <div class="foot-mark-list">
            <div class="search-input">
                <div class="title">
                    浏览记录
                </div>
                <div class="operation">
                    <div class="search-ipt">
                        <el-input v-model="searchinput" style="width: 320px" placeholder="搜索标题关键词" @keyup.enter="searchipt">
                            <template #append>
                                <el-button class="search" icon="Search" @click="searchipt" />
                            </template>
                        </el-input>
                    </div>
                    <div class="clear-btn" @click="clearfootmark">
                        <i class="bi bi-trash"></i>
                        <span>清理记录</span>
                    </div>
                </div>
            </div>
            <div class="show-search-count" v-if="searchcount">
                匹配到
                <span style="color: rgb(29, 128, 254);">
                    &nbsp;{{ searchcount }}&nbsp;
                </span>
                条记录
            </div>
            <div class="descrip-list">
                <div class="item-list" v-for="itme in footmarkData" :key="itme.dateTime" :infinite-scroll-immediate="false"
                    v-infinite-scroll="loadMore" :infinite-scroll-disabled="endLoading" :infinite-scroll-distance="20">
                    <div class="time-show">
                        <i class="bi bi-clock"></i>
                        <span>{{ $formatDate(itme.dateTime) }}</span>
                    </div>
                    <div class="art-list">
                        <Maincontentlist :contents="itme.footMark" />
                    </div>
                </div>
            </div>
            <div class="item loading-dots" v-if="Loading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="end-of-data" v-if="endLoading && footmarkData.length > 1"> 已经到最底部了 </div>
            <div class="end-of-data" v-if="Boolean(endLoading) && footmarkData.length == 0">没有浏览记录</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import MaincontentItme from '../home/components/MaincontentItme.vue';
import Maincontentlist from '../home/components/Maincontentlist.vue';
import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()
import behaviourAppStore from "@/stores/collection/behaviour"
const behaviourAppStoreS = behaviourAppStore();
const searchinput = ref('')
const page = ref(1)
const size = ref(5)
const loadingdisabled = ref(true)
const footmarkData = ref([])
const Loading = ref(false)
const endLoading = ref(false)
const searchcount = ref(2)

const loadMore = () => {
    debugger
    console.log("loadMore");
    page.value++
    getuserFootMark()
}

onMounted(() => {
    document.title = '我的浏览记录';
    getuserFootMark()
})

const getuserFootMark = async () => {
    if (Loading.value) return
    Loading.value = true
    try {
        const data = await behaviourAppStoreS.getuserFootMarkList(page.value, 5)
        const ids = data.flatMap(i => i.footMark.map(o => o.id));
        await behaviourAppStoreS.newHomeListDataGetLike(ids)
        if (data) {
            footmarkData.value = [...footmarkData.value, ...data]
        } else {
            endLoading.value = true
        }
    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        Loading.value = false;
    }
}

onBeforeUnmount(() => {
    page.value = 1
    endLoading.value = false
})

const searchipt = () => {
    console.log('searchipt', searchinput.value);
}


const clearfootmark = () => {
    console.log('clearfootmark');
}
</script>

<style lang="scss" scoped>
.footmark-main {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;

    .foot-mark-list {
        width: 900px;
        min-height: 700px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

        .search-input {
            padding: 18px 24px 0;
            display: flex;
            height: 32px;
            justify-content: space-between;
            align-items: center;
            font-style: normal;

            .title {
                height: 32px;
                line-height: 32px;
                text-align: center;
                color: #252933;
                font-size: 20px;
                font-weight: 600;
            }

            .operation {
                display: flex;
                flex-direction: row;

                .search-ipt {
                    .search {
                        padding: 0;
                        font-size: 20px;
                    }
                }

                .clear-btn {
                    display: flex;
                    background-color: transparent;
                    align-items: center;
                    color: #8a919f;
                    font-size: 14px;
                    margin-left: 24px;
                    cursor: pointer;

                    span {
                        margin-left: 2px;
                    }
                }
            }


        }

        .end-of-data {
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 50px;
            color: #8a919f;
            font-size: 16px;

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

        .show-search-count {
            margin-left: 24px;
            margin-top: 18px;
            height: 24px;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #252933;
        }

        .descrip-list {
            overflow-y: scroll;
            scrollbar-width: none;
            margin-top: 22px;
            // margin-bottom: 20px;

            .item-list {
                padding: 0 24px;
                // margin: 0 0 24px .5px;

                .time-show {
                    display: flex;
                    align-items: center;
                    height: 24px;
                    margin: 5px 5px;
                    font-size: 15px;

                    i {
                        color: #298ce9;
                    }

                    span {
                        margin-left: 5px;

                    }
                }

                .art-list {
                    border-top: 1px solid #e4e6eb;
                    padding: 12px 0;
                    display: flex;
                    justify-content: space-between;
                }



            }
        }

    }
}
</style>
