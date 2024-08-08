<template>
    <!-- <div class="comment-item" :id="vice ? comment.id : null"> -->
    <div class="comment-item" :id="vice ? comment.id : null">
        <div class="comment-avatar">
            <user-info-popover :author="comment.author">
                <template v-slot:reference>
                    <img class="avatar" :src="comment.author.avatar" alt="avatar" />
                </template>
            </user-info-popover>
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <div class="comment-name">
                    <user-info-popover :author="comment.author">
                        <template v-slot:reference>
                            <span class="username">
                                {{ comment.author.username }}
                            </span>
                        </template>
                    </user-info-popover>
                    <span class="position">{{ comment.author.position }}</span>
                </div>
                <div v-if="comment.reply" class="comment-name">
                    <i class="bi bi-caret-right-fill"></i>
                    <user-info-popover :author="comment.reply">
                        <template v-slot:reference>
                            <span class="username">
                                {{ comment.reply.username }}
                            </span>
                        </template>
                    </user-info-popover>
                    <span class="position">{{ comment.reply.position }}</span>
                </div>
            </div>
            <div class="comment-text">
                <div ref="contentRef" class="content" :class="{ 'expand': expanded }">
                    <div v-html="sanitizeString(comment.text)"></div>
                    <!-- <p v-html="comment.text"></p> -->
                </div>
                <div ref="expandRef" class="expand-action-wrap">
                    <span @click="expanded = !expanded" class="expand-action">{{ expanded ? '收起' : '展开' }}</span>
                </div>
                <div class="comment-img-box" v-if="comment.image">
                    <el-image class="comment-img" :src="comment.image" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                        :preview-src-list="[comment.image]" fit="cover" :hide-on-click-modal="true" lazy />
                </div>
            </div>
            <div class="comment-meta">
                <span>{{ $formatTime(comment.time)}}</span>
                <span class="action-itme" :class="{ 'action': false }" @click="likesCilck">
                    <i class="bi bi-suit-heart-fill"></i> {{ !comment.likes || comment.likes == 0 ? "喜欢" : comment.likes }}
                </span>
                <span class="action-itme" :class="{ 'action': opencommenttime === maincommentS.istime }" @click="opencommentclick">
                    <i class="bi bi-chat-left-text-fill"></i> {{ opencommenttime === maincommentS.istime ? '取消回复' : '回复' }}
                </span>
            </div>
            <div class="comment-reply-editor" v-if="opencommenttime === maincommentS.istime">
                <PostComment    :articleId="articleid" :replyauthor="comment.author" :replyauthorId="comment.id"
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

            <el-dialog class="dialog-child-Comments" v-if="dialogFormVisible" v-model="dialogFormVisible"  width="700" top="2vh" @close="dialogchildclose">
                <template #header="{ titleId, titleClass }">
                    <h4 :id="titleId" :class="titleClass" class="dialog-title-Class">评论回复</h4>
                </template>
                <div   class="child-Comments" v-infinite-scroll="loadchildComments" :infinite-scroll-immediate="false"  v-loading="dialogloading">
                    <PostCommentItem :vice="false" :comment="maincommentS.commentdialog" :articleid="articleid" :commentIdTop="comment.id" />
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick ,toRaw } from 'vue';
import UserInfoPopover from '@/components/UserInfoPopover.vue'
import PostComment from './PostComment.vue';
import { escapeHtml } from '@/utils/escapeHtml'
import maincommentAppStore from '@/stores/admin/maincomment'
const maincommentS = maincommentAppStore()
import commentStore from "@/stores/admin/comment";
const commentS = commentStore()

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    vice: {
        type: Boolean,
        required: false,
        default: ()=>(false)
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


const loadPage = ref(1);
const dialogloading = ref(false);


const dialogchildclose = () => {
    dialogFormVisible.value = false
    maincommentS.commentdialog={}
    loadPage.value=1
}

const getCommentReList = async()=>{
    try {
        dialogloading.value=true
        const commentReList= await maincommentS.getCommentReListS(props.vice? maincommentS.commentHomedrawerDto.type : commentS.commentHomeDto.type ,props.comment.id,loadPage.value,10)
     maincommentS.commentdialog.childComments=[... maincommentS.commentdialog.childComments,...commentReList]
     dialogloading.value=false
    } catch (error) {
        
    }finally{
        dialogloading.value=false
    }
   
    loadPage.value++
}
const loadchildComments = () => {
    getCommentReList()
}

const likesCilck = () => {
    console.log(props.comment.id + '点击了喜欢');
}

const opencommentclick=()=>{
    if(opencommenttime.value==0){
        opencommenttime.value = Date.now()
    }
    maincommentS.toggleAnswer(opencommenttime.value)
}
const opChildComments = () => {
    dialogFormVisible.value = true
    maincommentS.commentdialog = JSON.parse(JSON.stringify(props.comment))
    if (maincommentS.commentdialog) {
  maincommentS.commentdialog.childComments = [];
}
getCommentReList()

    // console.log( maincommentS.commentdialog );
}

const opencommenttime = ref(0);

const dialogFormVisible = ref(false);
const expanded = ref(false);
const contentRef = ref(null)
const expandRef = ref(null)

onMounted(() =>
   {
    contentRefOP()
   }
)

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

    .dialog-child-Comments{

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
        height:750px;
        max-height: 750px;
        padding-top: 20px;
        overflow-y: auto;
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