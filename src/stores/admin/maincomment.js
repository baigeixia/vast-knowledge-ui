import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const maincommentAppStore = defineStore(
    'maincomment', () => {
        const commentitemRefidMap=ref({})

    return {
        commentitemRefidMap
    }
})