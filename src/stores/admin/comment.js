import { ref, computed } from 'vue'
import { saveComment, saveCommentRe, getCommentList } from '@/api/admin/comment'
import { defineStore } from 'pinia'
import { getcommentLikeApi } from '@/api/collection/behaviour'


const commentStore = defineStore(
    'comment', () => {

        const TemporaryComments = ref({})

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
            size: 10,
        })

        const commentHomeVo = ref({})
        const commentLikes = ref(new Map())
        // const isLoading = ref(false)
        const isLoadingEnd = ref(false)
        const noMore = ref(false)
        const Loadingdisabled = computed(() => isLoadingEnd.value || noMore.value)

        const saveCommentReContent = async () => {
            const { commentId, commentRepayId, content, image, repayAuthorId, entryId } = commentReDto.value
            try {
                const response = await saveCommentRe(commentId, commentRepayId, content, image, repayAuthorId, entryId);
                TemporaryComments.value = response.data
            } catch (error) {
                console.error('Failed to save comment:', error);
            }
        }

        const saveCommentContent = async () => {
            const { type, channelId, entryId, content, image, arAuthorId } = commentDto.value
            try {
                const response = await saveComment(type, channelId, entryId, content, image, arAuthorId);
                TemporaryComments.value = response.data
            } catch (error) {
                console.error('Failed to save comment:', error);
            }
        }


        const commentListGet = async () => {
            if (isLoadingEnd.value) return;
            isLoadingEnd.value = true;

            const { entryId, type, page, size, notificationId } = commentHomeDto.value

            try {
                const resp = await getCommentList(entryId, type, page, size, notificationId);

                if (Array.isArray(resp.data?.comments) && resp.data?.comments.length === 0) {
                    noMore.value = true
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

                commentHomeDto.value.page++;
                isLoadingEnd.value = false;

               await getcommentLike(entryId, resp.data?.comments)

                console.log('commentLikes.value', commentLikes.value);

            } catch (error) {
                console.error('Error loading more data:', error);
            } finally {
                isLoadingEnd.value = false;
            }
        }

        const getcommentLike = async (entryId, comments) => {
            const idSet = new Set();
            const extractIds = (comments) => {
                if (comments) {
                    comments.forEach(comment => {
                        // 添加评论本身的 id
                        idSet.add(comment.id);

                        // 如果评论有 childComments，添加其 id
                        if (comment.childComments) {
                            comment.childComments.forEach(child => {
                                idSet.add(child.id);
                            });
                        }
                    });
                }
            };

            if (comments && comments.length > 0) {
                extractIds(comments)
                try {
                    const response = getcommentLikeApi(entryId, idSet)
                    const dataObject = (await response).data;
                    if (dataObject) {
                        console.log('dataObject',dataObject);
                        const dataMap = new Map(Object.entries(dataObject).map(([key, value]) => [Number(key), value]));
                        console.log('dataMap',dataMap.value);
                        console.log('commentLikes',commentLikes.value);
                        const mergedMap = new Map([...commentLikes.value, ...dataMap]);
                        commentLikes.value = mergedMap;
                    }
                } catch (error) {
                    console.error("Error fetching comment likes:", error);
                }
            }
            idSet.clear();
        }

        const loadMore = () => {
            console.log('loadMore noMore');
            if (!noMore.value) {
                commentListGet()
            }
        }


        const resetComment = () => {
            commentDto.value = {
                type: 1,
                channelId: undefined,
                entryId: undefined,
                content: undefined,
                image: undefined,
            }
        }

        const resetCommentRe = () => {
            commentReDto.value = {
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
            TemporaryComments,
            headerTag,
            loadMore,
            isLoadingEnd,
            noMore,
            saveCommentContent,
            getcommentLike,
            saveCommentReContent,
            resetComment,
            resetCommentRe,
            commentListGet,
            Loadingdisabled,
            commentLikes,
        }
    })

export default commentStore
