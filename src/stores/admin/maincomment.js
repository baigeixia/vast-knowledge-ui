import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
 const maincommentAppStore = defineStore(
    'maincomment', () => {
        const commentitemRefidMap = ref({})

        const iscommentId = ref(null)
        const commentId = ref(0)

        const toggleAnswer = (commentId) => {
            console.log("commentId",commentId);
            iscommentId.value = commentId === iscommentId.value ? null : commentId
        }

   


        return {
            commentitemRefidMap,
            toggleAnswer,
            iscommentId,
            commentId,
        }
    })


    export default maincommentAppStore