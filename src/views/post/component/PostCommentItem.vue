<template>
    <div class="comment-item">
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
                <div v-if="comment.replytoauthor" class="comment-name">
                    <i class="bi bi-caret-right-fill"></i>
                    <user-info-popover :author="comment.replytoauthor">
                        <template v-slot:reference>
                            <span class="username">
                                {{ comment.replytoauthor.username }}
                            </span>
                        </template>
                    </user-info-popover>
                    <span class="position">{{ comment.replytoauthor.position }}</span>
                </div>
            </div>
            <div class="comment-text">
                <div ref="contentRef" class="content" :class="{ 'expand': expanded }">
                    <p v-html="sanitizeString(comment.text)"></p>
                </div>
                <div class="comment-img-box" v-if="comment.pics">
                        <el-image class="comment-img" :src="comment.pics.url" :zoom-rate="1.2" :max-scale="7"
                            :min-scale="0.2" :preview-src-list="[comment.pics.url]"  fit="cover" :hide-on-click-modal="true" lazy />
                </div>

                <div ref="expandRef" class="expand-action-wrap">
                    <span @click="expanded = !expanded" class="expand-action">{{ expanded ? '收起' : '展开' }}</span>
                </div>
            </div>
            <div class="comment-meta">
                <span>{{ comment.time }}</span>
                <span class="action-itme" :class="{'action':true}"><i class="bi bi-suit-heart-fill"></i> 点赞 {{ comment.likes }}</span>
                <span class="action-itme" :class="{'action':isanswer}" @click="opisanswer"> <i class="bi bi-chat-left-text-fill"></i> {{isanswer ? '取消回复' :'回复'}}</span>
            </div>
            <div class="comment-reply-editor" v-if="isanswer">
                <PostComment />
            </div>
            <div class="replies" v-if="comment.childcomments && comment.childcomments.length">
                <PostCommentItem v-for="reply in comment.childcomments" :key="reply.id" :comment="reply"
                    class="reply-item" />
            </div>
            <div v-if="comment?.childcommentcount > 2" class="top-has-more">
                <span @click="selectcomment" :class="{ 'loading': isLoading }">
                    {{ buttonText }}
                    <i v-if="isLoading" class="bi bi-arrow-repeat rotate"></i>
                    <i v-else class="bi bi-caret-right"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserInfoPopover from './UserInfoPopover.vue'
import PostComment from './PostComment.vue';

const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
});

const expanded = ref(false);
const isanswer = ref(false);
const isLoading = ref(false)
const contentRef = ref(null)
const expandRef = ref(null)
const buttonText = ref(`查看全部 ${props.comment.childcommentcount} 条回复 `);

const selectcomment = () => {
    // 将按钮文本修改为 "加载中..."
    buttonText.value = '加载中...';
    isLoading.value = true;

    // 这里可以添加加载数据的逻辑，比如异步请求或者模拟延时
    // 模拟延时效果，假设延时2秒后恢复按钮文本
    setTimeout(() => {
        buttonText.value = `查看全部 ${props.comment.childcommentcount} 条回复`;
        isLoading.value = false;
    }, 2000); // 2000毫秒即2秒
};

onMounted(() =>
    contentRefOP(),
)

const opisanswer=()=>{
    isanswer.value=!isanswer.value
}

const contentRefOP = () => {
    if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
        expandRef.value.style.display = 'block';
    } else {
        expandRef.value.style.display = 'none';
    }
}

const sanitizeString = (str) => {
    const urlRegex = /(https?:\/\/[\w-]+\.[\w-]+(\/[\w- .\/?%&=]*)?)/g;
    const escapedString = escapeHtml(str);
    const sanitizedString = escapedString.replace(urlRegex, (match) => {
        const url = new URL(match); // 使用 new URL() 获取 URL 对象
        return `<a href="${url.href}" target="_blank" title="${url.href}"><i class="bi bi-link-45deg"></i>${url.hostname}</a>`;
    });
    return sanitizedString;
}

const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '"': '&quot;',
        '\'': '&#39;'
    }[match]));
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
        }


    }
}



.comment-content {
    flex: 1;

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
                
                :deep(.el-image__preview){
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
            font-size: 16px;
            font-weight: 400;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            transition: -webkit-line-clamp 0.3s ease-out;

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
    color: gray;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    .action-itme{
        cursor: pointer;
    }

    .action-itme:not(.action):hover{
        color: #1e80ff;
    }

    .action{
        color: #1e80ff;
    }
}

.comment-reply-editor{
    margin: 10px 0;
}

.replies {
    margin-top: 1rem;
    margin-left: 2rem;
    border-left: 2px solid #e0e0e0;
    padding-left: 1rem;
}
</style>