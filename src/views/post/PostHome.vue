<template>
    <el-container class="post-home-main">
        <div class="suspended-panel">
            <div class="panel-btn" v-if="y > 180">
                <img
                    src="https://p6-passport.byteacctimg.com/img/user-avatar/507312f17bf5e7cefebbf297105f1742~100x100.awebp">
                <div class="follow-area" v-if="isfollow">
                    <div class="follow-text">关注</div>
                </div>
            </div>
            <el-tooltip content="点赞" placement="left" effect="light">
                <div class="panel-btn" :class="{ 'active': isagree }">
                    <el-badge :color="isagree ? '#1e80ff' : '#b2b2b2'" :show-zero='false' :value="bellvalue"
                        :offset="[10, 3]">
                        <i class="bi bi-suit-heart-fill"></i>
                    </el-badge>
                </div>
            </el-tooltip>
            <el-tooltip content="评论" placement="left" effect="light">
                <div class="panel-btn" :class="{ 'active': ismsg }" @click="drawer = true">
                    <el-badge :color="ismsg ? '#1e80ff' : '#b2b2b2'" :show-zero='false' :value="bellvalue"
                        :offset="[10, 3]">
                        <i class="bi bi-chat-left-text-fill"></i>
                    </el-badge>
                </div>
            </el-tooltip>
            <el-tooltip content="收藏" placement="left" effect="light">
                <div class="panel-btn">
                    <i class="bi bi-star-fill"></i>
                </div>
            </el-tooltip>
            <el-tooltip content="分享" placement="left" effect="light">
                <div class="panel-btn">
                    <i class="bi bi-share-fill"></i>
                </div>
            </el-tooltip>
            <el-tooltip content="举报" placement="left" effect="light">
                <div class="panel-btn">
                    <i class="bi bi-exclamation-diamond-fill"></i>
                </div>
            </el-tooltip>

        </div>
        <el-container class="home-center">
            <el-container class="center-main">
                <el-main class="center-main-text">
                    <h1 class="article-title">为什么idea建议使用“+”拼接字符串 | 京东云技术团队</h1>
                    <div class="author-info-box">
                        <div class="author-name">
                            <RouterLink to="/user/pins">京东云开发者</RouterLink>
                        </div>
                        <div class="meta-box">
                            <div class="time">2023-11-01</div>
                            <div class="read-time"><i class="bi bi-eye"></i><span>34,062</span></div>
                            <div class="read-time"><i class="bi bi-clock"></i><span>阅读4分钟</span></div>
                        </div>
                    </div>
                    <ExternalLinkGuard class="guard-box">
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <a style="color:red" href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a>
                        <div><a style="color:red" href="https://github.com/vueComponent/ant-design-vue">访问外部链接</a></div>
                        <div>Main</div>

                        <a href="/internal-page">访问内部22222链接</a>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                        <div>Main</div>
                    </ExternalLinkGuard>
                </el-main>
                <el-footer class="comment-end">
                    <div class="title">评论 14</div>
                    <div class="comment-editor">
                        <div class="content">
                            <div class="avatar-box">
                                <div class="avatar">
                                    <img class="avatar-img"
                                        src="https://p6-passport.byteacctimg.com/img/user-avatar/38a427aaac159fe4f4fa7a201b5876b5~50x50.awebp">
                                </div>
                            </div>
                            <div class="form-box">
                                <div class="comment-input">
                                    <PostComment />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment-list-wrapper">
                        <div class="comment-list-header">
                            <div class="item active"><span>最热</span></div>
                            <div class="item"><span>最新</span></div>
                        </div>
                    </div>
                    <div class="comment-list">
                        <!-- <PostCommentList :comments="comments" /> -->
                        <PostCommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
                    </div>
                    <div class="fetch-more-comment"><span>查看所有评论</span><i class="bi bi-arrow-down-short"></i></div>
                </el-footer>
            </el-container>
            <el-aside class="home-right">
                <div class="sidebar-block ">
                    <div class="block-body author-block">
                        <RouterLink class="user-item" to="/user">
                            <div class="item-left">
                                <img class="avatar-img"
                                    src="https://p6-passport.byteacctimg.com/img/user-avatar/507312f17bf5e7cefebbf297105f1742~100x100.awebp">
                            </div>
                            <div class="item-right">
                                <span class="username">程序员111</span>
                                <div class="position">前端开发 @现在啦</div>
                            </div>
                        </RouterLink>
                        <div class="count-container">
                            <RouterLink class="stat-item" to="/user/posts">
                                <div class="count">20</div>
                                <div>文章</div>
                            </RouterLink>
                            <RouterLink class="stat-item" to="/user/posts">
                                <div class="count">165k</div>
                                <div>阅读</div>
                            </RouterLink>
                            <RouterLink class="stat-item" to="/user/tags">
                                <div class="count">5555</div>
                                <div>粉丝</div>
                            </RouterLink>
                        </div>
                        <div class="operate-btn">
                            <el-button type="primary">关注</el-button>
                            <el-button>私信</el-button>
                        </div>
                    </div>
                </div>
                <div class="sidebar-block " :class="{ 'is-top': y > 1000 }">
                    <div class="block-title">
                        相关推荐
                    </div>
                    <div class="block-body">
                        <div class="entry-list">
                            <a class="item" href="/">
                                <div class="entry-title">
                                    公司为什么禁止在SpringBoo公司为什么禁止在SpringBoo
                                </div>
                                <div class="entry-meta-box">
                                    <div class="entry-meta">48k阅读</div>
                                    <div class="entry-meta"> · </div>
                                    <div class="entry-meta">501点赞</div>
                                </div>
                            </a>
                            <a class="item" href="/">
                                <div class="entry-title">
                                    公司为什么禁止在SpringBoo公司为什么禁止在SpringBoo
                                </div>
                                <div class="entry-meta-box">
                                    <div class="entry-meta">48k阅读</div>
                                    <div class="entry-meta"> · </div>
                                    <div class="entry-meta">501点赞</div>
                                </div>
                            </a>
                            <a class="item" href="/">
                                <div class="entry-title">
                                    公司为什么禁止在SpringBoo公司为什么禁止在SpringBoo
                                </div>
                                <div class="entry-meta-box">
                                    <div class="entry-meta">48k阅读</div>
                                    <div class="entry-meta"> · </div>
                                    <div class="entry-meta">501点赞</div>
                                </div>
                            </a>
                            <a class="item" href="/">
                                <div class="entry-title">
                                    公司为什么禁止在SpringBoo公司为什么禁止在SpringBoo
                                </div>
                                <div class="entry-meta-box">
                                    <div class="entry-meta">48k阅读</div>
                                    <div class="entry-meta"> · </div>
                                    <div class="entry-meta">501点赞</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </el-aside>
        </el-container>
        <el-drawer class="drawer-left" v-model="drawer" direction="rtl">
            <template #header="{ titleId }">
                <h4 :id="titleId" class="comment-drawer-header">
                    <span class="title">评论</span>
                </h4>
            </template>
            <div class="comment-form comment-editor">评论</div>
        </el-drawer>
    </el-container>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useScroll } from '@vueuse/core'
import PostComment from './component/PostComment.vue';
import PostCommentItem from './component/PostCommentItem.vue';

const { y } = useScroll(window)

const bellvalue = ref(1200)
const isagree = ref(true)
const ismsg = ref(false)
const isfollow = ref(false)
const drawer = ref(false)
const emoji = ref(false)
const comments = ref([
    {
        id: 1,
        author: {
            id: 1,
            avatar: 'https://via.placeholder.com/40',
            username: '用户1',
            position: '工程师',
        },
        text: '使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：',
        time: '1个月前',
        likes: 1,
        childcommentcount: 17,
        childcomments: [
            {
                id: 2,
                author: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
                text: '这是一个回复使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：',
                time: '2个月前',
                likes: 2,
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复',
                time: '3个月前',
                likes: 3,
                replytoauthor: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复',
                time: '3个月前',
                likes: 3,
                replytoauthor: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复',
                time: '3个月前',
                likes: 3,
                replytoauthor: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复',
                time: '3个月前',
                likes: 3,
                replytoauthor: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复',
                time: '3个月前',
                likes: 3,
                replytoauthor: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
            }
        ]
    },
    {
        id: 3,
        author: {
            id: 31,
            avatar: 'https://via.placeholder.com/40',
            username: '用户C',
            position: '设计师',
        },
        text: '使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，',
        time: '6个月前',
        likes: 5,
        childcomments: []
    }
]);

const handleClickOutside = (event) => {
    const emojiInput = document.querySelector('.emoji-input');
    if (emojiInput && !emojiInput.contains(event.target)) {
        emoji.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
:deep(.el-overlay) {
    background-color: rgba(0, 0, 0, 0.05);
}

.post-home-main {
    flex: 1;
    overflow-y: auto;

    .drawer-left {
        .comment-drawer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            padding: 0 22px 0 24px;
            top: 0;
            border-bottom: 1px solid #d9dbe0;
            background: #ffffff;
            width: 100%;
            transform: translateX(-20px);
            z-index: 100;

            .title {
                color: #252933;
                font-size: 18px;
                font-weight: 600;
                line-height: 30px;
            }
        }

        .comment-form {
            display: flex;
            position: relative;
            border-radius: 2px;
            flex-direction: column;
        }

        .comment-editor {
            margin-top: 1px;
        }
    }

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

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            .follow-area {
                cursor: pointer;
                padding: 0 3px 3px 3px;
                position: absolute;
                bottom: -9px;
                left: 50%;
                transition: tr;
                transform: translateX(-50%);

                .follow-text {
                    color: #ffffff;
                    border-radius: 100px;
                    background: #1e80ff;
                    justify-content: center;
                    align-items: center;
                    height: 16px;
                    text-align: center;
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 10px;
                    display: flex;
                    width: 32px;
                    white-space: nowrap;
                }
            }

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
        overflow-y: hidden;

        .center-main {
            .center-main-text {
                background-color: #fff;

                .article-title {
                    margin: 0 0 1.3rem;
                    font-size: 2rem;
                    font-weight: 600;
                    line-height: 1.31;
                    color: #252933;
                }

                .guard-box {
                    a {
                        color: #000;
                    }
                }

                .author-info-box {
                    display: flex;
                    min-width: 0;
                    flex-grow: 1;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    flex-wrap: wrap;
                    margin-bottom: 1.5rem;

                    .author-name {
                        height: 2rem;
                        display: flex;
                        align-items: center;
                        margin-right: 16px;

                        a {
                            color: #515767;
                        }
                    }

                    .author-name:hover {
                        a {
                            color: #1e80ff;
                        }
                    }

                    .meta-box {
                        flex-shrink: 0;
                        font-size: 14px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                        color: #98919f;

                        .time {
                            margin-right: 16px;
                            white-space: nowrap;
                        }

                        .views-count {
                            margin-right: 16px;
                            white-space: nowrap;
                        }

                        .read-time {
                            display: flex;
                            align-items: center;

                            i {
                                font-size: 15px;
                            }

                            span {
                                padding: 0 10px;
                            }
                        }
                    }
                }
            }

            .comment-end {
                height: auto;
                margin-top: 20px;
                padding-top: 20px;
                padding-bottom: 20px;
                border-radius: 4px;
                background: #fff;
                font-style: normal;

                .title {
                    color: #252933;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 30px;
                }

                .content {
                    display: flex;
                    align-items: flex-start;

                    .avatar-box {
                        flex: 0 0 auto;

                        .avatar {
                            margin-right: 16px;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;

                            .avatar-img {
                                border-radius: 50%;
                                width: 100%;
                                height: 100%;
                                -o-object-fit: cover;
                                object-fit: cover;
                                background-color: #f7f8fa;
                            }
                        }
                    }

                    .form-box {
                        flex: 1;

                        .comment-input {
                            box-sizing: border-box;
                        }
                    }
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
                        display: flex;
                        align-content: center;

                        .item {
                            font-size: 15px;
                            line-height: 22px;
                            font-weight: 400;
                            cursor: pointer;
                            padding: 3px 4px;

                            span {
                                padding-left: 10px;
                                border-left: 2px solid #e4e6eb;
                            }
                        }

                        .item:first-child {
                            span {
                                padding-left: 0px;
                                border: none;
                            }
                        }

                        .active {
                            color: #1e80ff;
                        }

                    }


                }

                // .comment-list {
                //     min-height: 120px;
                //     margin-top: 4px;
                // }

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

                    i {
                        font-size: 20px;
                    }
                }

                .fetch-more-comment:hover {
                    background-color: #f2f3f5;
                }

            }

        }


        .home-right {
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            justify-content: flex-start;

            .is-top {
                position: fixed;
                transform: translateY(20px);
                transition: transform 0.5s ease;
            }

            .sidebar-block {
                width: 100%;
                /* 设置宽度为父容器宽度 */
                border-radius: 4px;
                width: 260px;
                background: #ffffff;
                box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
                margin-bottom: 20px;

                transition: transform 0.5s ease;

                /* 添加阴影效果 */
                .block-title {
                    padding: 16px 0;
                    margin: 0 20px;
                    font-size: 16px;
                    color: #252933;
                    font-weight: 500;
                    border-bottom: 1px solid #e4e6eb;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                }

                .author-block {
                    border-radius: 4px;
                    background: #fff;
                    padding: 20px;
                }

                .block-body {
                    .user-item {
                        padding-bottom: 8px;
                        color: #000;
                        display: flex;


                        .item-left {
                            flex: 0 0 auto;
                            width: 4rem;
                            height: 4rem;
                            border-radius: 50%;

                            .avatar-img {
                                border-radius: 50%;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                background-color: #f7f8fa;
                            }
                        }

                        .item-right {
                            flex: 1 1 auto;
                            min-width: 0;
                            margin-left: 12px;

                            .username {
                                font-size: 16px;
                                font-weight: 500;
                                line-height: 2rem;
                                color: #252933;
                                white-space: pre-wrap;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .position {
                                font-size: 14px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                color: #8a919f;
                                font-weight: 400;
                                line-height: 22px;
                            }
                        }
                    }

                    .operate-btn {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;

                        .el-button {
                            width: 120px;
                        }
                    }

                    .count-container {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;



                        .count {
                            color: #252933;
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 24px;
                        }

                        .stat-item {
                            color: #8a919f;
                            font-size: 13px;
                            font-weight: 400;
                            line-height: 22px;
                        }

                        .stat-item:hover {
                            color: #1e80ff;

                            .count {
                                color: #1e80ff;

                            }
                        }



                    }



                    .entry-list {
                        padding-bottom: 20px;

                        .item {
                            display: block;
                            padding: 12px 20px 0;
                            padding-top: 16px;

                            .entry-title {
                                line-height: 22px;
                                font-size: 14px;
                                font-weight: 400;
                                color: #252933;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            .entry-meta-box {
                                margin-top: 4px;
                                display: flex;

                                .entry-meta {
                                    display: flex;
                                    font-size: 15px;
                                    line-height: 22px;
                                    color: #8a919f;
                                    font-weight: 400;
                                }
                            }
                        }

                        .item:hover {
                            .entry-title {
                                color: #1e80ff;
                            }
                        }
                    }
                }
            }
        }


    }


}
</style>