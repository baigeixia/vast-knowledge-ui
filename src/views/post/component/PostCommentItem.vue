<!-- CommentItem.vue -->
<template>
    <div class="comment-item">
        <img :src="comment.avatar" alt="avatar" class="avatar" />
        <div class="comment-content">
            <div class="user-info">
                <span class="username">{{ comment.username }}</span>
                <span class="position">{{ comment.position }}</span>
            </div>
            <div class="comment-text">
                <div ref="contentRef" class="content" :class="{ 'expand': expanded }">{{ comment.text }}</div>
                <div ref="expandRef" class="expand-action-wrap" @click="expanded = !expanded">
                    <span class="expand-action">{{ expanded ? '收起' : '展开' }}</span>
                </div>
            </div>
            <div class="comment-meta">
                <span>{{ comment.time }}</span>
                <span>点赞 {{ comment.likes }}</span>
                <span>回复 {{ comment.replies.length }}</span>
            </div>
            <div class="replies" v-if="comment.replies && comment.replies.length">
                <comment-item v-for="reply in comment.replies" :key="reply.id" :comment="reply" class="reply-item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue';
const contentRef=ref(null)
const expandRef=ref(null)

onMounted(()=>
    contentRefOP()
)
const contentRefOP=()=>{
    if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
        expandRef.value.style.display = 'block';
        } else {
            expandRef.value.style.display = 'none';
        }
}

const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
});
console.log('props.comment', props.comment);
const expanded = ref(false);

</script>

<style lang="scss" scoped>


.comment-item {
    display: flex;
    margin-bottom: 1rem;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
}

.comment-content {
    flex: 1;
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

    .expand{
        -webkit-line-clamp:initial; 
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
}

.username {
    font-weight: bold;
}

.position {
    color: gray;
    margin-left: 0.5rem;
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