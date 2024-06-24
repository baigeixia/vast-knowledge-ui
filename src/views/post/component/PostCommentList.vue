<!-- CommentList.vue -->
<template>
  <div class="comment-list">
    <PostCommentItem v-for="comment in displayedComments" :key="comment.id" :comment="comment" />
    <!-- <button v-if="!expanded && comments.length > initialDisplayCount" @click="expanded = true">
      查看全部评论
    </button> -->
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import PostCommentItem from './PostCommentItem.vue';

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});

const initialDisplayCount = 2;
const expanded = ref(false);

const displayedComments = computed(() =>
  expanded.value ? props.comments : props.comments.slice(0, initialDisplayCount)
);
</script>
  
<style scoped>
.comment-list {
  padding: 16px 0;
}

button {
  margin-top: 1rem;
  color: blue;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

button:hover {
  text-decoration: underline;
}
</style>
  