import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {getCommentList } from '@/api/admin/comment'

 const maincommentAppStore = defineStore(
    'maincomment', () => {
        const commentitemRefidMap = ref({})

        const iscommentId = ref(null)
        const commentId = ref(0)

        const toggleAnswer = (commentId) => {
            console.log("commentId",commentId);
            iscommentId.value = commentId === iscommentId.value ? null : commentId
        }

        const commentHomedrawerVo = ref({})
        const isLoadingEnd = ref(false)
        const noMore  = ref(false)
        const Loadingdisabled  = computed(() => isLoadingEnd.value || noMore.value)
        const commentHomedrawerDto = ref({
            entryId: undefined,
            type: 0,
            page: 1,
            size: 5,
        })

        const commentListGet = async () => {
            if (isLoadingEnd.value) return;
            isLoadingEnd.value = true;
    
            const {entryId,type,page,size}=commentHomedrawerDto.value
    
            try {
                const resp = await getCommentList(entryId,type,page,size);
    
                if(Array.isArray(resp.data?.comments) && resp.data?.comments.length === 0){
                    noMore.value=true
                }
    
        
                if (!commentHomedrawerVo.value) {
                    commentHomedrawerVo.value = { comments: [] };
              }
        
              const newComments = Array.isArray(resp.data?.comments) ? resp.data.comments : [];
        
        
              const existingComments = Array.isArray(commentHomedrawerVo.value.comments) ? commentHomedrawerVo.value.comments : [];
        
        
              commentHomedrawerVo.value = {
                ...commentHomedrawerVo.value, 
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
                commentHomedrawerDto.value.page ++;
                commentListGet()
            }
          }

        return {
            commentitemRefidMap,
            toggleAnswer,
            iscommentId,
            commentId,
            commentHomedrawerDto,
            commentListGet,
            loadMore,
            isLoadingEnd,
            noMore,
            Loadingdisabled,
            commentHomedrawerVo,
        }
    })


    export default maincommentAppStore