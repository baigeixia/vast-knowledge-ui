<template>
    <!-- <div class="comment-item" :id="vice ? comment.id : null"> -->
    <div class="comment-item" :id="vice ? comment.id : null">
        <div class="comment-avatar">
            <UserInfoPopover :author="comment.author">
                <template v-slot:reference>
                    <img class="avatar" :src="comment.author.avatar" alt="avatar" />
                </template>
            </UserInfoPopover>
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <div class="comment-name">
                    <UserInfoPopover :author="comment.author">
                        <template v-slot:reference>
                            <span class="username">
                                {{ comment.author.username }}
                            </span>
                        </template>
                    </UserInfoPopover>
                    <span class="position">{{ comment.author.position }}</span>
                    <span class="position">{{ comment.author?.location}}</span>
                </div>
                <div v-if="comment.reply" class="comment-name">
                    <i class="bi bi-caret-right-fill"></i>
                    <UserInfoPopover :author="comment.reply">
                        <template v-slot:reference>
                            <span class="username">
                                {{ comment.reply.username }}
                            </span>
                        </template>
                    </UserInfoPopover>
                    <span class="position">{{ comment.reply.position }}</span>
                    <span class="position">{{ comment.reply?.location}}</span>
                </div>
            </div>
            <div class="comment-text">
                <div ref="contentRef" class="content" :class="{ 'expand': expanded }">
                    <div v-html="sanitizeString(comment.text)"></div>
                </div>
                <div ref="expandRef" class="expand-action-wrap">
                    <span @click="expanded = !expanded" class="expand-action">{{ expanded ? '收起' : '展开' }}</span>
                </div>
                <div class="comment-img-box" v-if="comment.image">
                    <el-image class="comment-img" :src="comment.image" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                        :preview-src-list="[comment.image]" fit="cover"  :hide-on-click-modal="true" lazy />
                </div>
            </div>
            <div class="comment-meta">
                <span>{{ $formatTime(comment.time) }}</span>
                <span v-if="comment.author.id == userinfoAppStores.userid" class="nolike">
                    <i class="bi bi-suit-heart-fill "></i>
                    {{ !comment.likes || comment.likes == 0 ? "喜欢" : comment.likes }}
                </span>
                <span v-else class="action-itme"
                    @click="likeArticle(articleid, comment.author.id, comment.author.username, 1, comment.id)">
                    <i class="bi" :class="iconClass"></i>
                    {{ !comment.likes || comment.likes == 0 ? "喜欢" : comment.likes }}
                </span>
                <span class="action-itme" :class="{ 'action': opencommenttime === maincommentS.istime }"
                    @click="opencommentclick">
                    <i class="bi bi-chat-left-text-fill"></i> {{ opencommenttime === maincommentS.istime ? '取消回复' : '回复' }}
                </span>
            </div>
            <div class="comment-reply-editor" v-if="opencommenttime === maincommentS.istime">
                <PostComment :articleId="articleid" :replyauthor="comment.author" :replyauthorId="comment.id"
                    :commentIdTop="commentIdTop" />
            </div>
            <div class="replies" v-if="comment.childComments && comment.childComments.length">
                <PostCommentItem :vice="vice" v-for="reply in comment.childComments" :key="reply.id" :articleid="articleid"
                    :commentIdTop="commentIdTop" :comment="reply" class="reply-item" />
            </div>
            <div v-if="comment?.childCommentCount > 5" class="top-has-more">
                <span v-if="isSubComments" @click="opChildComments">
                    {{ `查看全部 ${comment.childCommentCount} 条回复` }}
                </span>
            </div>

            <el-dialog class="dialog-child-Comments" v-if="dialogFormVisible" v-model="dialogFormVisible" width="700"
                top="2vh" @close="dialogchildclose" :lock-scroll="false">
                <template #header="{ titleId, titleClass }">
                    <h4 :id="titleId" :class="titleClass" class="dialog-title-Class">评论回复</h4>
                </template>
                <div class="child-Comments" v-infinite-scroll="loadchildComments" :infinite-scroll-immediate="false">
                    <PostCommentItem :vice="false" :comment="maincommentS.commentdialog" :articleid="articleid"
                        :commentIdTop="comment.id" />
                    <div class="item loading-dots" v-if="dialogloading">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick, toRaw } from 'vue';
import PostComment from './PostComment.vue';
import { escapeHtml } from '@/utils/escapeHtml'
import maincommentAppStore from '@/stores/admin/maincomment'
const maincommentS = maincommentAppStore()
import commentStore from "@/stores/admin/comment";
const commentS = commentStore()
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()
import useUserStore from "@/stores/admin/user";
const userS = useUserStore()
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
import debounce from '@/utils/debouncing';
import { defineAsyncComponent } from 'vue'
// const UserInfoPopover = defineAsyncComponent(() => import("@/components/UserInfoPopover.vue"))
const PostComment = defineAsyncComponent(() => import("./PostComment.vue"))

// const PostComment = () => import('./PostComment.vue');

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    vice: {
        type: Boolean,
        required: false,
        default: () => (false)
    },
    articleid: {
        type: String,
        required: true
    },
    commentIdTop: {
        type: [String, Number, Object],
        required: false
    },
    isSubComments: {
        type: Boolean,
        required: false,
    }
});


const likeArticle = debounce((articleid, authorid, username, type, commentid) => {
    if (userS.isloginReLongin()) {
        notificationS.likeArticle(articleid, authorid, username, type, commentid)
        commentS.commentLikes.set(String(commentid), isnolikeArticle.value ? 0 : 1)
        isnolikeArticle.value ? props.comment.likes-- : props.comment.likes++
        console.log(props.comment.likes);
    }
},500)

const iconClass = computed(() => {
    return {
        'bi-heart-fill islike': !isnolikeArticle.value,
        'bi-heart like': isnolikeArticle.value
    };
});


const isnolikeArticle = computed(() =>(commentS.commentLikes.get(String(props.comment.id)) ?? 1) == 1);
const loadPage = ref(1);
const dialogloading = ref(false);


const dialogchildclose = () => {
    document.body.style.overflow = 'auto';
    dialogFormVisible.value = false
    maincommentS.commentdialog = {}
    loadPage.value = 1
}

const getCommentReList = async () => {
    try {
        dialogloading.value = true
        const commentReList = await maincommentS.getCommentReListS(props.vice ? maincommentS.commentHomedrawerDto.type : commentS.commentHomeDto.type, props.comment.id, loadPage.value, 10)
        maincommentS.commentdialog.childComments = [...maincommentS.commentdialog.childComments, ...commentReList]
        dialogloading.value = false
    } catch (error) {

    } finally {
        dialogloading.value = false
    }

    loadPage.value++
}
const loadchildComments = () => {
    getCommentReList()
}


const opencommentclick = () => {
    if (opencommenttime.value == 0) {
        opencommenttime.value = Date.now()
    }
    maincommentS.toggleAnswer(opencommenttime.value)
}
const opChildComments = () => {
    document.body.style.overflow = 'hidden';
    dialogFormVisible.value = true
    maincommentS.commentdialog = JSON.parse(JSON.stringify(props.comment))
    if (maincommentS.commentdialog) {
        maincommentS.commentdialog.childComments = [];
    }
    getCommentReList()
}
const showImageViewer = ref(false)
const showImageViewerclose = () => {
    document.body.style.overflow = 'auto';
    showImageViewer.value = false
}
const opencommenttime = ref(0);

const dialogFormVisible = ref(false);
const expanded = ref(false);
const contentRef = ref(null)
const expandRef = ref(null)

onMounted(() => {
    contentRefOP()
})

const contentRefOP = () => {
    if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
        expandRef.value.style.display = '-webkit-box';
    } else {
        expandRef.value.style.display = 'none';
    }
}

const sanitizeString = (str) => {
    // let str= string.replace(/\n/g, '<br> ')
    const urlRegex = /(https?:\/\/[\w-]+\.[\w-]+(\/[\w- .\/?%&=]*)?)/g;
    const escapedString = escapeHtml(str);
    const sanitizedString = escapedString.replace(urlRegex, (match) => {
        const url = new URL(match); // 使用 new URL() 获取 URL 对象
        return `<a href="${url.href}" target="_blank" title="${url.href}"><i class="bi bi-link-45deg"></i>${url.hostname}</a>`;
    });
    return sanitizedString;
}



const renderLinks = (text) => {
    // 匹配 HTTP 或 HTTPS URL 的正则表达式
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // 使用 replace 方法将 URL 替换为带有 <a> 标签的链接
    const htmlText = text.replace(urlRegex, (match) => {
        try {
            const url = new URL(match);
            return `<a href="${url.href}" target="_blank"><i class="bi bi-link-45deg"></i>${url.hostname}</a>`;
        } catch (error) {
            console.error('Invalid URL:', match);
            return match; // 返回原始的匹配文本
        }
    });

    return htmlText;
}


</script>

<style lang="scss" scoped>
.rotate {
    animation: rotateAnimation 1s infinite linear;
}

@keyframes rotateAnimation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.comment-item {
    display: flex;
    margin-bottom: 1rem;

    .comment-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 1rem;
        position: relative;

        .avatar {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }


    }
}



.comment-content {
    flex: 1;

    .dialog-child-Comments {

        .dialog-title-Class {

            display: flex;
            height: 54px;
            align-items: center;
            font-size: 15px;
            color: rgb(55, 58, 64);
            font-weight: 600;
            border-bottom: 1px solid rgb(235, 236, 237);
        }

        .child-Comments {
            height: 750px;
            max-height: 750px;
            padding-top: 20px;
            overflow-y: auto;
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

    :deep(.el-overlay) {
        background-color: rgba(0, 0, 0, 0.65);
        overflow-y: hidden;
    }





    .top-has-more {
        color: #8a919f;
        display: flex;
        justify-content: center;
        padding: 8px 0;

        .loading {
            color: #1e80ff;
        }

        span {
            display: flex;
            align-items: center;
            font-size: 15px;

            i {
                padding-top: 2px;
                font-size: 20px;
                padding: 0 5px;
            }
        }


    }

    .top-has-more span:hover {
        cursor: pointer;
        color: #1e80ff;
    }

    .comment-text {
        margin-top: 0.5rem;

        .comment-img-box {
            margin-top: 8px;

            .comment-img {
                width: 120px;
                height: 120px;
                overflow: hidden;

                :deep(.el-image__preview) {
                    cursor: zoom-in;
                }

                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .content {
            color: #252933;
            font-size: 15px;
            font-weight: 400;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            transition: -webkit-line-clamp 0.3s ease-out;
            white-space: pre-line
        }

        .expand {
            -webkit-line-clamp: initial;
        }

        .expand-action-wrap {
            display: none;
            margin-top: 8px;

            .expand-action {
                display: inline-block;
                font-size: 14px;
                line-height: 22px;
                color: #1e80ff;
                cursor: pointer;
            }
        }

    }

}

.comment-header {
    display: flex;
    align-items: center;

    i {
        margin: 0 2px;
    }

    .comment-name {
        display: flex;
        align-items: center;

        .username {
            display: inline-block;
            max-width: 300px;
            font-weight: bold;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            z-index: 1;

        }

        .position {
            color: gray;
            margin-left: 0.5rem;
            font-size: 13px;
        }


    }
}


.comment-meta {
    display: flex;
    gap: 1rem;
    color: #8a919f;
    font-size: 0.9rem;
    margin-top: 0.5rem;

    .action-itme {
        cursor: pointer;

    }

    .noLike {
        color: #bdbfc2;
        cursor: default;
    }


    .islike {
        color: #1e80ff;
    }

    .action-itme:not(.action):hover {
        color: #1e80ff;
    }

    .action {
        color: #1e80ff;
    }
}

.comment-reply-editor {
    margin: 10px 0;
}

.replies {
    margin-top: 1rem;
    // margin-left: 2rem;
    // border-left: 2px solid #e0e0e0;
    padding-left: 1rem;
}
</style>