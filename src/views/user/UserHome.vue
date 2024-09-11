<template>
    <div class="user-view">
        <div class="major-area">
            <div class="user-info-block block shadow">
                <div class="avatar">
                    <img class="avatar-img" :src="userinfoHome.image">
                </div>
                <div class="info-box">
                    <div class="top">
                        <div class="left">
                            <h1 class="username">{{ userinfoHome.name }}</h1>
                        </div>
                        <div class="link-box">{{ userinfoHome.company }}</div>
                    </div>
                    <div class="user-info-icon">{{ userinfoHome.position}}</div>
                    <div class="introduction">
                        <div class="left">{{ userinfoHome.occupation }}</div>
                        <div class="right">
                            <RouterLink to="/user/settings"><el-button><el-icon>
                                        <Setting />
                                    </el-icon></el-button></RouterLink>
                        </div>
                    </div>
                    <div class="info-sex">
                        <i v-if="userinfoHome.sex===0" class="bi bi-gender-male"></i>
                        <i v-else-if="userinfoHome.sex===1" class="bi bi-gender-female"></i>
                        <i v-else class="bi bi-gender-ambiguous"></i>
                    </div>
                </div>
            </div>
            <div class="list-block">
                <div class="list-header">
                    <div class="header-content">
                        <RouterLink :to="`/user/${userid}`" >
                            <div class="nav-item" :class="{ 'active':  route.path.split('/').length==3 }">
                                <el-button link><span>动态</span></el-button>
                            </div>
                        </RouterLink>
                        <RouterLink :to="`/user/${userid}/posts`">
                            <div class="nav-item" :class="{ 'active': isActive('/posts') }">
                                <el-button link><span>文章</span></el-button>
                            </div>
                        </RouterLink>
                        <RouterLink :to="`/user/${userid}/columns`" >
                            <div class="nav-item" :class="{ 'active': isActive('/columns') }">
                                <el-button link><span>专栏</span></el-button>
                            </div>
                        </RouterLink>
                        <RouterLink :to="`/user/${userid}/collections`" >
                            <div class="nav-item" :class="{ 'active': isActive('/collections') }">
                                <el-button link><span>收藏集</span></el-button>
                            </div>
                        </RouterLink>
                        <RouterLink :to="`/user/${userid}/tags`">
                            <div class="nav-item" :class="{ 'active': isActive('/tags') }">
                                <el-button link><span>关注</span></el-button>
                            </div>
                        </RouterLink>
                        <!-- <div class="nav-item" :class="{ active: headerBut == 6 }" @click="headerBut = 6">
                            <el-button link><span>作品</span></el-button>
                        </div> -->
                    </div>

                </div>
            </div>
            <el-skeleton animated :loading="loading">
                <template #template>
                    <div class="itme">
                        <div class="itme-right">
                            <el-skeleton-item style="width: 40%;" variant="h1" />
                            <br>
                            <el-skeleton-item style="width: 70%;" variant="h1" />
                            <el-skeleton-item style="width: 100%;" variant="h1" />
                        </div>
                    </div>
                    <div class="itme">
                        <div class="itme-right">
                            <el-skeleton-item style="width: 40%;" variant="h1" />
                            <br>
                            <el-skeleton-item style="width: 70%;" variant="h1" />
                            <el-skeleton-item style="width: 100%;" variant="h1" />
                        </div>
                    </div>
                </template>
                <RouterView class="activity-list-box"></RouterView>
            </el-skeleton>
        </div>

        <div class="minor-area">
            <div class="sticky">
                <div class="follow-block">
                    <div class="follow-item">
                        <div class="item-title">关注</div>
                        <div class="item-count">{{ userinfoHome.follows }}</div>
                    </div>
                    <div class="follow-item">
                        <div class="item-title">粉丝</div>
                        <div class="item-count">{{ userinfoHome.fans }}</div>
                    </div>
                </div>
                <div class="more-block block">
                    <div class="more-item">
                        <div class="item-title">收藏集</div>
                        <div class="item-count">0</div>
                    </div>
                    <div class="more-item">
                        <div class="item-title">关注列表</div>
                        <div class="item-count">0</div>
                    </div>
                    <div class="more-item">
                        <div class="item-title">加入于</div>
                        <div class="item-count">{{ userinfoHome.createdTime }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';

import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const route = useRoute();

const props = defineProps({
    userid: {
        type: String,
        required: true,
        default: ''
    }
})


onMounted(async () => {
    const userid =route.params.userid
    const id =props.userid
    console.log("userid",userid);
    console.log("id",id);
    await userinfoAppStores.getusergetInfo(userid)
    userinfoHome.value = userinfoAppStores.userinfo
})

const userinfoHome = ref({})
const loading = ref(false)

const isActive = (path) => {
    return route.path.includes(path) ;
};
</script>

<style lang="scss" scoped>
.user-view {
    display: flex;
    // justify-content: space-between;
    width: 100%;

    // width: 100%;
    .major-area {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        background-color: #fff;


        .activity-list-box {
            flex: 1;
            margin: 20px 20px;
        }

        .list-block {
            .list-header {
                position: relative;
                margin: 0;
                padding: 0;
                height: 4rem;
                background-color: #fff;
                border-radius: .2rem .2rem 0 0;
                border-bottom: 1px solid #e4e6eb;

                .header-content {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    max-width: 960px;
                    white-space: nowrap;
                    position: relative;
                    margin: 0 auto;
                    border-bottom: 1px solid #e4e6eb;

                    .nav-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0 15px;

                        .el-button {
                            font-size: 16px;
                        }


                    }

                    .nav-item:not(.active):hover {
                        .el-button {
                            color: #252933;
                            padding-bottom: 13px;
                        }
                    }

                    .active {
                        span {
                            transition: border-bottom .1s;
                            padding-bottom: 8px;
                            border-bottom: 2px #1e80ff solid;
                        }
                    }
                }
            }


        }

        .itme {
            display: flex;
            align-items: center;
            margin: 20px 20px;

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

        .user-info-block {
            display: flex;
            padding: 2rem;
        }

        .shadow {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        }

        .block {
            background-color: #fff;
            border-radius: 2px;
            margin-bottom: 1rem;

            .avatar {
                margin-right: 2.4rem;

                .avatar-img {
                    border-radius: 8px;
                }
            }

            .info-box {
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;

                    .left {
                        display: flex;

                        .username {
                            display: flex;
                            align-items: center;
                            margin: 0;
                            padding: 0;
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 1.2;
                            color: #000;
                        }
                    }
                }

                .user-info-icon {
                    display: flex;
                    align-items: center;
                    line-height: 1.2;
                    margin-bottom: 8px;
                }

                .introduction {
                    display: flex;
                    justify-content: space-between;

                    .right {
                        display: flex;
                        align-items: flex-end;

                        .el-icon {
                            font-size: 20px;
                        }
                    }
                }

            }
        }
    }

    .minor-area {
        flex: 0 0 auto;
        margin-left: 1rem;
        width: 20rem;

        .sticky {
            position: fixed;
            width: 20rem;
            transition: all .2s;

            .follow-block {
                display: flex;
                position: relative;
                margin-bottom: 1rem;

                .follow-item {
                    background-color: #fff;

                    flex: 1 1 auto;
                    padding: 1.333rem 0;
                    text-align: center;
                    color: #31445b;

                    .item-title {
                        font-weight: 500;
                    }

                    .item-count {
                        margin-top: .5rem;
                        font-weight: 600;
                    }
                }
            }

            .more-block {
                background-color: transparent;

                .more-item {
                    display: flex;
                    justify-content: space-between;
                    display: flex;
                    padding: 1.25rem .417rem;
                    //   font-size: 1.25rem;
                    color: #000;
                    border-top: 1px solid rgba(230, 230, 231, .5);
                }
            }

            .block {
                border-radius: 2px;
                margin-bottom: 1rem;
            }
        }
    }
}
</style>