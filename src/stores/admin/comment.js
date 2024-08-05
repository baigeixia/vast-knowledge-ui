import { ref, computed } from 'vue'
import { saveComment,saveCommentRe,getCommentList } from '@/api/admin/comment'
import { defineStore } from 'pinia'

const commentStore = defineStore(
    'comment', () => {

        const headerTag = ref(0)

    const commentDto = ref({
        type: 0,
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
        type: 0,
        page: 1,
        size: 5,
    })

    const commentHomeVo = ref({})
    // const isLoading = ref(false)
    const isLoadingEnd = ref(false)
    const noMore  = ref(false)
    const Loadingdisabled  = computed(() => isLoadingEnd.value || noMore.value)
    
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


    const commentListGet = async () => {
        if (isLoadingEnd.value) return;
        isLoadingEnd.value = true;

        const {entryId,type,page,size}=commentHomeDto.value

        try {
            const resp = await getCommentList(entryId,type,page,size);

            if(Array.isArray(resp.data?.comments) && resp.data?.comments.length === 0){
                noMore.value=true
            }


    
            if (!commentHomeVo.value) {
                commentHomeVo.value = { comments: [] };
          }
    
          const newComments = Array.isArray(resp.data?.comments) ? resp.data.comments : [];
    
    
          const existingComments = Array.isArray(commentHomeVo.value.comments) ? commentHomeVo.value.comments : [];
    
    
          commentHomeVo.value = {
            ...commentHomeVo.value, 
            comments: [
                ...existingComments,
                ...newComments
            ]
        };
        
        isLoadingEnd.value = false;

            } catch (error) {
              console.error('Error loading more data:', error);
            } finally {
              isLoadingEnd.value = false;
            }
    }

    const loadMore = () => {
        if(!noMore.value){
            commentHomeDto.value.page ++;
            commentListGet()
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
        headerTag,
        loadMore,
        isLoadingEnd,
        noMore,
        saveCommentContent,
        saveCommentReContent,
        resetComment,
        resetCommentRe,
        commentListGet,
        Loadingdisabled,
    }
})

export default commentStore
