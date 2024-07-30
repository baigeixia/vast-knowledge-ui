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
                <div class="panel-btn" @click="collect()">
                    <i class="bi bi-star-fill"></i>
                </div>
            </el-tooltip>
            <el-tooltip content="分享" placement="left" effect="light">
                <div class="panel-btn" @click="share()">
                    <i class="bi bi-share-fill"></i>
                </div>
            </el-tooltip>
            <el-tooltip content="举报" placement="left" effect="light">
                <div class="panel-btn" @click="report()">
                    <i class="bi bi-exclamation-diamond-fill"></i>
                </div>
            </el-tooltip>
        </div>
        <el-container class="home-center">
            <el-container class="center-main">
                <el-main class="center-main-text">
                    <h1 class="article-title">{{ articleS.articleDto.title }}</h1>
                    <div class="author-info-box">
                        <div class="author-name">
                            <RouterLink to="/user/pins">{{ articleS.articleDto.authorName }}</RouterLink>
                        </div>
                        <div class="meta-box">
                            <div class="time">{{ articleS.articleDto.createdTime }}</div>
                            <div class="read-time" v-if="articleS.articleDto.views > 1"><i class="bi bi-eye"></i><span>{{ articleS.articleDto.views }}</span></div>
                            <div class="read-time" v-if="articleS.articleDto.comment > 1"><i class="bi bi-clock"></i><span>{{ articleS.articleDto.comment }}条评论</span></div>
                        </div>
                    </div>
                    <!-- <p class="context-box" v-html="$sanitizeHtml(content)"></p> -->
                    <p class="context-box" v-html="textLabelsUp(contentS.content.content)"></p>
                    <!-- <p class="context-box" v-html="contentS.content.content"></p> -->
                </el-main>
                <el-footer class="comment-end">
                    <div class="title">评论 {{ articleS.articleDto.comment }}</div>
                    <div class="comment-editor">
                        <div class="content">
                            <div class="avatar-box">
                                <div class="avatar">
                                    <img class="avatar-img"
                                        src="https://pica.zhimg.com/v2-3385f8c86358be2b085231a4035e7709_l.jpg">
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
                        <PostCommentItemAsync v-for="comment in comments" :key="comment.id" :comment="comment" />
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
                                <div class="position">前端开发</div>
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
        <el-drawer class="drawer-right" size="33.5%" v-model="drawer" direction="rtl" :lock-scroll="false"
            @opened="onDrawerOpen">
            <template #header="{ titleId }">
                <h4 :id="titleId" class="comment-drawer-header">
                    <span class="title">评论</span>
                </h4>
            </template>
            <div class="comment-list-box">
                <div class="comment-form comment-editor">
                    <div class="comment-input">
                        <PostComment :articleid="postId" />
                    </div>
                    <div class="comment-list-wrapper">
                        <div class="comment-list-header">
                            <div class="item active"><span>最热</span></div>
                            <div class="item"><span>最新</span></div>
                        </div>
                    </div>
                    <div class="comment-list" v-infinite-scroll="load">
                        <PostCommentItem :vice="true" v-for="comment in comments" :key="comment.id" :comment="comment" :articleid="postId" />
                    </div>
                    <div class="fetch-more-comment"><span>查看所有评论</span><i class="bi bi-arrow-down-short"></i></div>
                </div>
            </div>
        </el-drawer>
    </el-container>

    <el-image-viewer v-if="showImageViewer" :preview-teleported="false" :url-list="[imgPreviewUrl]"
        @close="showImageViewerclose" hide-on-click-modal="true">
    </el-image-viewer>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, nextTick, toRaw, watchEffect, isProxy, isReactive, isReadonly } from 'vue';
import { useScroll } from '@vueuse/core'
import PostComment from './component/PostComment.vue';
import PostCommentItem from './component/PostCommentItem.vue';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github.css';
import { escapeHtml } from '@/utils/escapeHtml'
import { defineAsyncComponent } from 'vue';
import contentStore from "@/stores/admin/content";
import articleAppStore from "@/stores/admin/article";
const contentS = contentStore()
const articleS = articleAppStore()

const PostCommentItemAsync = defineAsyncComponent(() => import('./component/PostCommentItem.vue'));
const props = defineProps({
    postId: {
        type: String,
        default: ''
    },
    notificationId: {
        type: String,
        default: ''
    }
})

const page = ref(0)
const load = () => {
    page.value++
    console.log(page.value);
    comments.value = [...comments.value, ...upcomments.value]
}

onMounted(async () => {
    let id = props.notificationId
    let postId = props.postId
    await contentS.getContent(postId)
    await articleS.getinfoArticle(postId)
    if (id) {
        drawer.value = true
    }

    codeLanguage()
    upTitle()
})

const upTitle=() => {
    document.title = articleS.articleDto.title;
}


const onDrawerOpen = () => {
    let id = props.notificationId
    if (id) {
        nextTick(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        entry.target.classList.remove('transition-background');
                        entry.target.style.backgroundColor = '#f2f3f5'; // 当元素不在视口时恢复背景色为灰色
                        setTimeout(() => {
                            entry.target.classList.add('transition-background');
                            entry.target.style.backgroundColor = 'white'; // 当元素进入视口时设置背景色为白色
                        }, 500);

                        observer.disconnect();
                    });
                }, { threshold: 0.5 }); // 当元素至少50%可见时触发

                observer.observe(element);
            }
        })
    }
};

const codeLanguage=()=>{
    hljs.highlightAll()

    const codeBlocks = document.querySelectorAll('pre code[class*="language-"]');

    codeBlocks.forEach((block) => {

        const match = block.className.match(/\blanguage-([a-zA-Z0-9-]+)\b/);
        if (match) {
            // 获取语言类别
            // const language = block.className.split('-')[1];
            const language = match[1];
            if (language.includes('undefined') || language.includes('nohighlight') || language.includes('plaintext')) {
                return; // 跳出当前循环
            }

            // 创建语言标签元素
            const languageLabel = document.createElement('span');
            languageLabel.style.position = 'absolute';
            languageLabel.style.right = '10px';
            languageLabel.style.top = '5px';

            languageLabel.textContent = language;

            // 获取代码块的父元素
            const parentElement = block.parentNode;

            // 如果父元素存在，则设置父元素的 position 为 relative，并将语言标签插入到父元素的开头
            if (parentElement) {
                parentElement.style.position = 'relative';  // 设置父元素的 position 为 relative
                parentElement.insertBefore(languageLabel, parentElement.firstChild);  // 将语言标签插入到父元素的开头
            } else {
                console.error('Unable to find parent element for block');
            }
        }
    });
}


const { y } = useScroll(window)

const bellvalue = ref(1200)
const showImageViewer = ref(false)
const isagree = ref(true)
const ismsg = ref(false)
const isfollow = ref(false)
const drawer = ref(false)

const comments = ref([
    {
        id: 1,
        author: {
            id: 1,
            avatar: 'https://via.placeholder.com/40',
            username: '用户1',
            position: '工程师',
        },
        text: '1 https://www.zhihu.com/people/annie-37-28-90 <script>alert("XSS Attack!")<//script>使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现 <img src="invalid-image" onerror="alert(\'XSS Attack!\')" />  https://github.com/vueComponent/ant-design-vue',
        pics: {
            url: "https://p9-passport.byteacctimg.com/img/user-avatar/7afb026d59be994d6e7e27c9d28944b5~50x50.awebp",
            width: 530,
            height: 523,
            type: 1
        },
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
                text: '2 这是一个回复使一个 JWT <script>alert("XSS Attack!")<//script>  1111111 <img src="invalid-image" onerror="alert(\'XSS Attack!\')" />  立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
                time: '2个月前',
                likes: 2,
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '<a href="https://example.com">Link</a> 3',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
                id: 4,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '<script>alert("XSS Attack!")<//script> 4',
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
                id: 5,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '<div style="color:red;">Text</div> 5',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
                id: 6,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复6',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
                id: 7,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复7',
                pics: {
                    url: "https://pic3.zhimg.com/v2-3ee2856defe7233d211e1180b2ec71a2_xld.jpeg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
        id: 33,
        author: {
            id: 31,
            avatar: 'https://via.placeholder.com/40',
            username: '用户C',
            position: '设计师',
        },
        text: '33 使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，',
        pics: {
            url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
            width: 530,
            height: 523,
            type: 1
        },
        time: '6个月前',
        likes: 5,
        childcomments: []
    }, {
        id: 34,
        author: {
            id: 31,
            avatar: 'https://via.placeholder.com/40',
            username: '用户C',
            position: '设计师',
        },
        text: '34 使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，',
        pics: {
            url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
            width: 530,
            height: 523,
            type: 1
        },
        time: '6个月前',
        likes: 5,
        childcomments: []
    }, {
        id: 35,
        author: {
            id: 31,
            avatar: 'https://via.placeholder.com/40',
            username: '用户C',
            position: '设计师',
        },
        text: '35 使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，',
        pics: {
            url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
            width: 530,
            height: 523,
            type: 1
        },
        time: '6个月前',
        likes: 5,
        childcomments: []
    }, {
        id: 36,
        author: {
            id: 31,
            avatar: 'https://via.placeholder.com/40',
            username: '用户C',
            position: '设计师',
        },
        text: '36 使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，',
        pics: {
            url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
            width: 530,
            height: 523,
            type: 1
        },
        time: '6个月前',
        likes: 5,
        childcomments: []
    }, {
        id: 41,
        author: {
            id: 1,
            avatar: 'https://via.placeholder.com/40',
            username: '用户1',
            position: '工程师',
        },
        text: '41 https://www.zhihu.com/people/annie-37-28-90 <script>alert("XSS Attack!")<//script>使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现 <img src="invalid-image" onerror="alert(\'XSS Attack!\')" />  https://github.com/vueComponent/ant-design-vue',
        pics: {
            url: "https://p9-passport.byteacctimg.com/img/user-avatar/7afb026d59be994d6e7e27c9d28944b5~50x50.awebp",
            width: 530,
            height: 523,
            type: 1
        },
        time: '1个月前',
        likes: 1,
        childcommentcount: 17,
        childcomments: [
            {
                id: 42,
                author: {
                    id: 2,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户2',
                    position: '前端开发2',
                },
                text: '42 这是一个回复使一个 JWT <script>alert("XSS Attack!")<//script>  1111111 <img src="invalid-image" onerror="alert(\'XSS Attack!\')" />  立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
                time: '2个月前',
                likes: 2,
            },
            {
                id: 43,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '<a href="https://example.com">Link</a> 43',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
                id: 44,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '<script>alert("XSS Attack!")<//script> 44',
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
                id: 45,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '<div style="color:red;">Text</div> 45',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
                id: 46,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复46',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
                id: 47,
                author: {
                    id: 3,
                    avatar: 'https://via.placeholder.com/40',
                    username: '用户3',
                    position: '前端开发3',
                },
                text: '这是一个回复47',
                pics: {
                    url: "https://pic3.zhimg.com/v2-3ee2856defe7233d211e1180b2ec71a2_xld.jpeg",
                    width: 530,
                    height: 523,
                    type: 1
                },
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
]);

const upcomments = ref([
    {
        id: 1,
        author: {
            id: 1,
            avatar: 'https://via.placeholder.com/40',
            username: '用户1',
            position: '工程师',
        },
        text: '1 https://www.zhihu.com/people/annie-37-28-90 <script>alert("XSS Attack!")<//script>使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现 <img src="invalid-image" onerror="alert(\'XSS Attack!\')" />  https://github.com/vueComponent/ant-design-vue',
        pics: {
            url: "https://p9-passport.byteacctimg.com/img/user-avatar/7afb026d59be994d6e7e27c9d28944b5~50x50.awebp",
            width: 530,
            height: 523,
            type: 1
        },
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
                text: '2 这是一个回复使一个 JWT <script>alert("XSS Attack!")<//script>  1111111 <img src="invalid-image" onerror="alert(\'XSS Attack!\')" />  立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：使一个 JWT (JSON Web Token) 立即失效可以通过多种方式实现，取决于具体的实现和系统需求。以下是几种常见的方法：',
                pics: {
                    url: "https://pic2.zhimg.com/v2-79615c6b45858db5b2ee2eb07037fe4f_b.jpg",
                    width: 530,
                    height: 523,
                    type: 1
                },
                time: '2个月前',
                likes: 2,
            }
        ]
    }
]);

const imgPreviewUrl = ref('');


const showImageViewerclose = () => {
    document.body.style.overflow = 'auto';
    showImageViewer.value = false
}

const collect = () => {
    console.log('收藏');
}

const share = () => {
    console.log('分享');
}

const report = () => {
    console.log('举报');
}


window.previewImg = (url) => {
    imgPreviewUrl.value = url
    showImageViewer.value = true
    document.body.style.overflow = 'hidden';
}


const textLabelsUp = (content) => {
    return replaceImgWithTag(content)
}

const replaceImgWithTag = (str) => {
    if (str) {
        return str.replace(/<img\s+src="([^"]+)"[^>]*>/g, (match, src) => {
            return `<img class="comment-img" onclick="previewImg('${src}')" src=${src}>`;
        });
    }
    // const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

}

</script>

<style lang="scss" scoped>
.transition-background {
    background-color: #f2f3f5;

    transition: background-color 0.2s ease;
    transition: background-color 0.5s ease-out;
}


.hljs-ln-numbers {

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    text-align: center;
    color: #ccc;
    border-right: 1px solid #CCC;
    vertical-align: top;
    padding-right: 5px;

    /* your custom style here */
}

/* for block of code */
.hljs-ln-code {
    padding-left: 10px;
}

:deep(.el-overlay) {
    background-color: rgba(0, 0, 0, 0.05);
}

:deep(.el-drawer__body) {
    padding-top: 0;
    padding-right: 0;
    // overflow-y: hidden;
}

.post-home-main {
    flex: 1;

    .drawer-right {
        :deep(.el-el-drawer__close) {
            display: none;
        }


        .comment-list-box {
            height: 800;

            .comment-form {
                display: flex;
                position: relative;
                border-radius: 2px;
                flex-direction: column;
            }
        }

        .comment-drawer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            padding: 0 22px 0 24px;
            top: 0;
            height: 64px;
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

    .comment-list {
        // margin-top: 10px;
        // padding-right: 15px;
        padding: 20px;
    }

    .comment-input {
        margin-top: 5px;
        box-sizing: border-box;
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

        i {
            font-size: 20px;
        }
    }

    .fetch-more-comment:hover {
        background-color: #f2f3f5;
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



                .context-box {
                    font-size:1rem;

                    >*+* {
                        margin-top: 0.8em;
                    }


                    :deep(.comment-img) {
                        cursor: zoom-in;
                        width: 100%;
                        display: block;
                    }

                    :deep(hr) {
                        border: none;
                        border-top-width: medium;
                        border-top-style: none;
                        border-top-color: currentcolor;
                        // background-color: #1cd7f8;
                        border-top: 2px solid rgba(13, 13, 13, 0.1);
                        margin: 2rem 0;
                    }



                    .ProseMirror {
                        height: 100%;
                        outline: 0 !important;
                    }

                    :deep(em) {
                        font-style: italic;
                    }

                    :deep(blockquote) {
                        padding-left: 1rem;
                        border-left: 2px solid rgba(13, 13, 13, 0.1);
                    }

                    :deep(pre) {
                        background: #0D0D0D;
                        color: #FFF;
                        font-family: 'JetBrainsMono', monospace;
                        padding: 0.75rem 1rem;
                        border-radius: 0.5rem;

                        code {
                            color: inherit;
                            padding: 0;
                            background: none;
                            //font-size: 0.8rem;
                        }


                        .hljs-comment,
                        .hljs-quote {
                            color: #616161;
                        }

                        .hljs-variable,
                        .hljs-template-variable,
                        .hljs-attribute,
                        .hljs-tag,
                        .hljs-name,
                        .hljs-regexp,
                        .hljs-link,
                        .hljs-name,
                        .hljs-selector-id,
                        .hljs-selector-class {
                            color: #F98181;
                        }

                        .hljs-number,
                        .hljs-meta,
                        .hljs-built_in,
                        .hljs-builtin-name,
                        .hljs-literal,
                        .hljs-type,
                        .hljs-params {
                            color: #FBBC88;
                        }

                        .hljs-string,
                        .hljs-symbol,
                        .hljs-bullet {
                            color: #B9F18D;
                        }

                        .hljs-title,
                        .hljs-section {
                            color: #FAF594;
                        }

                        .hljs-keyword,
                        .hljs-selector-tag {
                            color: #70CFF8;
                        }

                        .hljs-emphasis {
                            font-style: italic;
                        }

                        .hljs-strong {
                            font-weight: 700;
                        }


                    }

                    :deep(table) {
                        border-collapse: collapse;
                        table-layout: fixed;
                        width: 100%;
                        margin: 0;
                        overflow: hidden;

                        td,
                        th {
                            min-width: 1em;
                            border: 2px solid #ced4da;
                            padding: 3px 5px;
                            vertical-align: top;
                            box-sizing: border-box;
                            position: relative;

                            >* {
                                margin-bottom: 0;
                            }
                        }

                        th {
                            font-weight: bold;
                            text-align: left;
                            background-color: #f1f3f5;
                        }

                        .selectedCell:after {
                            z-index: 2;
                            position: absolute;
                            content: "";
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            background: rgba(200, 200, 255, 0.4);
                            pointer-events: none;
                        }

                        .column-resize-handle {
                            position: absolute;
                            right: -2px;
                            top: 0;
                            bottom: -2px;
                            width: 4px;
                            background-color: #adf;
                            pointer-events: none;
                        }

                        p {
                            margin: 0;
                        }
                    }



                    li {
                        list-style: decimal;
                    }

                    :deep(code) {
                        background-color: rgba(97, 97, 97, 0.1);
                        color: #616161;
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
                                font-size: 12px;
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


    .comment-list-wrapper {
        margin-top: 10px;

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


}
</style>