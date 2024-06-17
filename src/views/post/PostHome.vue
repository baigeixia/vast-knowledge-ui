<template>
    <el-container class="post-home-main">
        <div class="suspended-panel">
            <div class="panel-btn" :class="{ 'active': isagree }">
                <el-badge :color="isagree ? '#1e80ff' : '#b2b2b2'" :show-zero='false' :value="bellvalue"
                    :offset="[10, 3]">
                    <i class="bi bi-suit-heart-fill"></i>
                </el-badge>
            </div>
            <div class="panel-btn" :class="{ 'active': ismsg }">
                <el-badge :color="ismsg ? '#1e80ff' : '#b2b2b2'" :show-zero='false' :value="bellvalue"
                    :offset="[10, 3]">
                    <i class="bi bi-chat-left-text-fill"></i>
                </el-badge>
            </div>
            <div class="panel-btn">
                <i class="bi bi-star-fill"></i>
            </div>
            <div class="panel-btn">
                <i class="bi bi-share-fill"></i>
            </div>
            <div class="panel-btn">
                <i class="bi bi-exclamation-diamond-fill"></i>
            </div>
        </div>
        <el-container class="home-center">
            <el-main class="center-main">Main </el-main>
            <el-footer class="center-end">标签：</el-footer>
            <div class="comment-box">
                <div class="title">评论 14</div>
                <div class="comment-editor">
                    <div class="content">
                        <div class="avatar-box">头像</div>
                        <div class="form-box">文字输入框</div>
                    </div>
                </div>
                <div class="comment-list-wrapper">
                    <div class="comment-list-header">
                        <div class="item active">最热</div>
                        <div class="divider"></div>
                        <div class="item">最新</div>
                    </div>
                </div>
                <div class="comment-list">评论表单</div>
                <div class="fetch-more-comment"><span>查看全部评论</span></div>
            </div>
        </el-container>
        <el-aside class="home-right">Aside</el-aside>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
const bellvalue = ref(1200)
const isagree = ref(true)
const ismsg = ref(false)

</script>

<style lang="scss" scoped>
.post-home-main {
    flex: 1;
    background-color: #f2f3f5;

    .suspended-panel {
        position: fixed;
        margin-left: -5rem;
        top: 140px;
        z-index: 2;

        .panel-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-bottom: 20px;
            width: 48px;
            height: 48px;
            background-color: #fff;
            background-position: 50%;
            background-repeat: no-repeat;
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 rgba(50, 50, 50, .04);
            cursor: pointer;
            text-align: center;
            font-size: 20px;

            i {
                color: #b2b2b2;
            }

        }

        .panel-btn:not(.active):hover {
            i {
                color: #515767;
            }
        }

        .active {
            i {
                color: #1e80ff;
            }

        }

    }

    .home-center {
        .center-main{
            background: #fff;

        }
        .center-end{
            background: #fff;
        }
        
        .comment-box {
            box-sizing: border-box;
            border-radius: 4px;
            background: #fff;
            margin-top: 20px;
            padding-top: 20px;
            padding-bottom: 20px;
            font-style: normal;
            padding-left: 2.67rem;
            padding-right: 2.67rem;

            .title {
                color: #252933;
                font-size: 18px;
                font-weight: 600;
                line-height: 30px;
            }

            .comment-editor {
                margin-top: 32px;

                .content {
                    display: flex;
                    align-items: flex-start;

                    .avatar-box {
                        flex: 0 0 auto;
                    }

                    .form-box {
                        flex: 1;
                    }
                }
            }

            .comment-list-wrapper {
                margin-top: 32px;

                .comment-list-header {
                    box-sizing: border-box;

                    .divider {
                        display: inline-block;
                        width: 1px;
                        height: 13px;
                        background: #e4e6eb;
                        position: relative;
                        top: 2px;
                        margin: 0 3px;
                    }

                    .item {
                        font-size: 15px;
                        font-weight: 500;
                        line-height: 22px;
                        display: inline-block;
                        color: #515767;
                        font-weight: 400;
                        cursor: pointer;
                        border-radius: 2px;
                        padding: 3px 4px;
                    }

                    .active {
                        color: #1e80ff;
                    }

                }

                .comment-list {
                    min-height: 120px;
                    margin-top: 4px;
                }
            }

            .fetch-more-comment {
                margin-top: 12px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #515767;
                font-size: 15px;
                height: 52px;
                cursor: pointer;
                background: #f7f8fa;
                font-weight: 500;
                transition: all .2s;
            }
        }
    }
    .home-right{
        background-color: #f2f3f5;
    }
}
</style>