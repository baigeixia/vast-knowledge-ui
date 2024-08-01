import { ref, computed } from 'vue'
import { saveComment,saveCommentRe,getCommentList } from '@/api/admin/comment'
import { defineStore } from 'pinia'

const commentStore = defineStore(
    'comment', () => {

    const commentDto = ref({
        type: 1,
        channelId: undefined,
        entryId: undefined,
        content: undefined,
        image: undefined,
    })

    const commentReDto = ref({
        commentId: undefined,
        commentRepayId: undefined,
        content: undefined,
        image: undefined,
    })
    
    const commentHomeDto = ref({
        entryId: undefined,
        type: undefined,
        page: 1,
        size: 10,
    })

    const commentHomeVo = ref({})
    
    const saveCommentReContent = async () => {
        const {commentId,commentRepayId,content,image}=commentReDto.value
        try {
            const response = await saveCommentRe(commentId,commentRepayId,content,image);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to save comment:', error);
        }
    }

    const saveCommentContent = async () => {
        const {type,channelId,entryId,content,image}=commentDto.value
        try {
            const response = await saveComment(type,channelId,entryId,content,image);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to save comment:', error);
        }
    }


    const commentListGet = async (postid) => {
    console.log('postid',postid);
        const {entryId,type,page,size}=commentHomeDto.value
        try {
            const response = await getCommentList(postid,type,page,size);
            commentHomeVo.value= response.data
        } catch (error) {
            console.error('Failed to save comment:', error);
        }
    }

    const resetComment =()=>{
        commentDto.value={
            type: 1,
            channelId: undefined,
            entryId: undefined,
            content: undefined,
            image: undefined,
        }
   }

   const resetCommentRe =()=>{
    commentReDto.value={
        commentRepayId: undefined,
        channelId: undefined,
        entryId: undefined,
        content: undefined,
        image: undefined,
    }
}
    return {
        commentDto,
        commentReDto,
        commentHomeDto,
        commentHomeVo,
        saveCommentContent,
        saveCommentReContent,
        resetComment,
        resetCommentRe,
        commentListGet,
    }
})

export default commentStore
