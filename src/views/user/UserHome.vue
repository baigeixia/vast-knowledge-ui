<template>
    <div class="user-view">
        <div class="major-area">
            <div class="user-info-block block shadow">
                <div class="avatar">
                    <img class="avatar-img"
                        src="https://p9-passport.byteacctimg.com/img/mosaic-legacy/3796/2975850990~90x90.awebp">
                </div>
                <div class="info-box">
                    <div class="top">
                        <div class="left">
                            <h1 class="username">用户331112371026</h1>
                        </div>
                        <div class="link-box">这个是第三方切换地方</div>
                    </div>
                    <div class="user-info-icon">图标位置</div>
                    <div class="introduction">
                        <div class="left">你从事什么职业？ 标签</div>
                        <div class="right">
                            <RouterLink to="/user/settings"><el-button>设置</el-button></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-block">
                <div class="list-header">
                    <div class="header-content">
                        <div class="nav-item" :class="{active: headerBut==1}" @click="headerBut=1"><el-button link><span >动态</span></el-button></div>
                        <div class="nav-item" :class="{active: headerBut==2}"  @click="headerBut=2"><el-button link><span>文章</span></el-button></div>
                        <div class="nav-item" :class="{active: headerBut==3}" @click="headerBut=3"><el-button link><span>专栏</span></el-button></div>
                    </div>
                    <RouterView class="activity-list-box"></RouterView>
                </div>
            </div>
        </div>
        <div class="minor-area">
            <div class="sticky">
                <div class="follow-block">
                    <div class="follow-item">
                        <div class="item-title">关注了</div>
                        <div class="item-count">0</div>
                    </div>
                    <div class="follow-item">
                        <div class="item-title">关注者</div>
                        <div class="item-count">0</div>
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
                        <div class="item-count">0</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";
const headerBut=ref(1)

const isActive = (path) => {
    return route.path === path;
};
</script>

<style lang="scss" scoped>
.user-view {
    display: flex;
    // justify-content: space-between;
    width: 100%;

    // width: 100%;
    .major-area {
        flex: 1 1 auto;

        .list-block {
            .list-header {
                position: relative;
                margin: 0;
                padding: 0;
                height: 4rem;
                background-color: #fff;
                border-radius: .2rem .2rem 0 0;
                border-bottom: 1px solid #e4e6eb;
                z-index: 100;

                .header-content {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    max-width: 960px;
                    white-space: nowrap;
                    position: relative;
                    margin: 0 auto;

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
                        span{
                            transition: border-bottom .1s;
                            padding-bottom: 8px;
                            border-bottom: 2px #1e80ff solid;
                        }
                    }
                }
            }

            .activity-list-box {
                background-color: #fff;
            }
        }

        .user-info-block {
            display: flex;
            padding: 2.5rem;
        }

        .shadow {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        }

        .block {
            background-color: #fff;
            border-radius: 2px;
            margin-bottom: 1rem;

            .avatar {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 auto;
                margin-right: 2.4rem;
                width: 7.5rem;
                height: 7.5rem;
                // background-color: #f9f9f9;
                border-radius: 50%;

                .avatar-img {
                    border-radius: 50%;
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