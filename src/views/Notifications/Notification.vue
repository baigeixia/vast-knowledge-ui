<template>
    <div class="main-notification">
        <div class="main-header">
            <RouterLink class="header-link" to="/notifications">
                <el-button :class="{ 'tabs': true, 'active': isActive('/notifications') }" size="large"
                    link>评论</el-button>
            </RouterLink>
            <RouterLink class="header-link" to="/notifications/digg">
                <el-button :class="{ 'tabs': true, 'active': isActive('/notifications/digg') }" size="large" link>赞和收藏
                </el-button>
            </RouterLink>
            <RouterLink class="header-link" to="/notifications/follow">
                <el-button :class="{ 'tabs': true, 'active': isActive('/notifications/follow') }" size="large"
                    link>新增粉丝</el-button>
            </RouterLink>
            <RouterLink class="header-link" to="/notifications/im">
                <el-button :class="{ 'tabs': true, 'active': isActive('/notifications/im') }" size="large"
                    link>私信</el-button>
            </RouterLink>
            <RouterLink class="header-link" to="/notifications/system">
                <el-button :class="{ 'tabs': true, 'active': isActive('/notifications/system') }" size="large"
                    link>系统通知</el-button>
            </RouterLink>
        </div>
        <div class="chat-view">
            <el-skeleton animated :loading="loading">
                <template #template>
                    <div class="itme">
                        <div class="itme-left">
                            <el-skeleton-item variant="circle" style="width:100%; height: 100%;" />
                        </div>
                        <div class="itme-right">
                            <el-skeleton-item style="width: 40%;" variant="h1" />
                            <br>
                            <el-skeleton-item style="width: 70%;" variant="h1" />
                            <el-skeleton-item style="width: 100%;" variant="h1" />
                        </div>
                    </div>
                    <div class="itme">
                        <div class="itme-left">
                            <el-skeleton-item variant="circle" style="width:100%; height: 100%;" />
                        </div>
                        <div class="itme-right">
                            <el-skeleton-item style="width: 40%;" variant="h1" />
                            <br>
                            <el-skeleton-item style="width: 70%;" variant="h1" />
                            <el-skeleton-item style="width: 100%;" variant="h1" />
                        </div>
                    </div>
                    <div class="itme">
                        <div class="itme-left">
                            <el-skeleton-item variant="circle" style="width:100%; height: 100%;" />
                        </div>
                        <div class="itme-right">
                            <el-skeleton-item style="width: 40%;" variant="h1" />
                            <br>
                            <el-skeleton-item style="width: 70%;" variant="h1" />
                            <el-skeleton-item style="width: 100%;" variant="h1" />
                        </div>
                    </div>
                </template>
                <RouterView  @data-loaded="handleDataLoaded" />
            </el-skeleton>
        </div>
    </div>
</template>

<script setup>
import { ref, watch ,onMounted} from "vue"

import { useRoute } from 'vue-router';

const titleType = ref('1')
const loading = ref(false)

const totitleType = (tab, event) => {
    titleType.value = tab.paneName
}

const route = useRoute();

const isActive = (path) => {
    return route.path === path;
};
const handleDataLoaded = () => {
    console.log(111);
    loading.value = false;
};

watch(route, (to, from) => {
    console.log('watch');
    // loading.value=true
})


</script>

<style lang="scss" scoped>
.main-notification {
    // position:relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;

    .main-header {
    // position: fixed;
    // width: 100%;
        height: 50px;
        padding: 0 30px;
        border-bottom: 1px solid #f2f3f5;
        display: flex;
        align-items: center;
        z-index: 200;

        .header-link {
            margin-right: 40px;
        }

        .tabs {
            height: 3rem;
            /* 设置按钮高度为40px */
            line-height: 3rem;
            /* 设置按钮内文字的行高为按钮高度，使文字垂直居中 */
        }

        .active {
            color: #419eff;
        }

    }

    .tabs:hover {
        color: #419eff;
    }


    .chat-view {
        flex: 1;
        display: flex;
        margin: 0 auto;
        width: 95%;
        margin-top: 10px;

        .itme {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .itme-left {
                height: 50px;
                width: 50px;
                margin-right: 10px;
                margin-bottom: 10px;
            }

            .itme-right {
                width: 100%;
            }
        }

        // background-color: #f2f3f5;

    }

}
</style>
