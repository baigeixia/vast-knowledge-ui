<template>
    <div class="comment-item">
        <div class="comment-avatar" >
            <img v-if="comment.author" @mouseover="showUserInfo(comment.author.id)" @mouseleave="hideUserInfo" :src="comment.author.avatar" alt="avatar"
                class="avatar" />
            <div class="user-info-popup" :style="{ left: mouseX + 'px' }" :class="{ 'small-popup': isLoading }" v-if="isHovering">
                <div class="loading-dots" v-if="isLoading">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <div v-else>
                    <div v-if="isReplytoauthor">
                        <p>用户名：{{ comment.replytoauthor.username }}</p>
                        <p>职位：{{ comment.replytoauthor.position }}</p>
                    </div>
                    <div v-else>
                        <p>用户名：{{ comment.author.username }}</p>
                        <p>职位：{{ comment.author.position }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment-content">
            <div class="user-info">
                <div class="comment-header">
                    <span class="username" @mouseover="showUserInfo(comment.author.id)" @mouseleave="hideUserInfo">
                        {{ comment.author.username }}
                    </span>
                    <span class="position">{{ comment.author.position }}</span>
                </div>
                <div v-if="comment.replytoauthor" class="comment-header">
                    <i class="bi bi-caret-right-fill"></i>
                    <span class="username"  @mouseover="showReplytoauthor(comment.replytoauthor.id, $event.clientX)"
                        @mouseleave="hideUserInfo">
                        {{ comment.replytoauthor.username }}
                    </span>
                    <span class="position">{{ comment.replytoauthor.position }}</span>
                </div>
            </div>
            <div class="comment-text">
                <div ref="contentRef" class="content" :class="{ 'expand': expanded }">{{ comment.text }}</div>
                <div ref="expandRef" class="expand-action-wrap">
                    <span @click="expanded = !expanded" class="expand-action">{{ expanded ? '收起' : '展开' }}</span>
                </div>
            </div>
            <div class="comment-meta">
                <span>{{ comment.time }}</span>
                <span>点赞 {{ comment.likes }}</span>
                <span>回复</span>
            </div>
            <div class="replies" v-if="comment.childcomments && comment.childcomments.length">
                <PostCommentItem v-for="reply in comment.childcomments" :key="reply.id" :comment="reply" class="reply-item" />
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
import { ref, computed, onMounted, reactive } from 'vue';
const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
});

console.log(props.comment.author.username);

const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const isLoading = ref(false)
const isReplytoauthor = ref(false)
const contentRef = ref(null)
const expandRef = ref(null)
const buttonText = ref(`查看全部 ${props.comment.childcommentcount} 条回复 `);

const showReplytoauthor=(id, clientX)=>{
    mouseX.value = clientX-600;
    console.log(mouseX.value);
    console.log(clientX);
    isReplytoauthor.value=true;
    showUserInfo(id)
}
const showUserInfo = (id) => {
    console.log('id', id);
    isHovering.value = true;
    // 在这里可以添加加载数据的逻辑，比如设置 isLoading 为 true，然后异步加载用户信息
    // 模拟加载数据
    isLoading.value = true;
    setTimeout(() => {
        // 假设加载完成后的回调
        isLoading.value = false;
        // 这里可以设置实际的用户信息数据
    }, 100); // 模拟2秒的加载时间

}

const hideUserInfo = () => {
    isHovering.value = false;
    // 在这里可以取消加载数据的逻辑，比如取消异步加载
    isLoading.value = false;
    isReplytoauthor.value=false;
    mouseX.value = 0
}


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

const contentRefOP = () => {
    if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
        expandRef.value.style.display = 'block';
    } else {
        expandRef.value.style.display = 'none';
    }
}



const expanded = ref(false);

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

        .user-info-popup {
            position: absolute;
            // position: sticky;
            top: calc(90%); // 将弹窗定位在用户名或头像下方
            left: 15px;
            z-index: 50;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 添加阴影效果
            transition: width 0.2s ease, height 0.3s ease; // 添加过渡效果

            &.small-popup {
                width: 120px;
                height: 80px;
            }

            &:not(.small-popup) {
                width: 380px;
                height: auto;
            }

            &.show {
                display: block;
                /* 根据需要显示 */
            }

            .loading-dots {
                width: 120px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;

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

.user-info {
    display: flex;
    align-items: center;

    i {
        margin: 0 2px;
    }

    .comment-header {
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
}

.replies {
    margin-top: 1rem;
    margin-left: 2rem;
    border-left: 2px solid #e0e0e0;
    padding-left: 1rem;
}
</style>