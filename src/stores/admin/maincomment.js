import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const maincommentAppStore = defineStore(
    'maincomment', () => {
        const commentitemRefidMap=ref({})

        const isAnswerOpen=ref(0)

       const toggleAnswer=(commentId)=> {
        isAnswerOpen.value = isAnswerOpen.value == commentId ? 0 : commentId
          }

    return {
        commentitemRefidMap,
        toggleAnswer,
        isAnswerOpen,
    }
})