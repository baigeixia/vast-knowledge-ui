import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCommentList, getCommentReList } from '@/api/admin/comment'

const maincommentAppStore = defineStore(
    'maincomment', () => {
        const commentitemRefidMap = ref({})

        const istime = ref(null)
        const time = ref(0)
        const commentdialog = ref({})

        const toggleAnswer = (time) => {
            console.log(time);
            istime.value = time === istime.value ? null : time
            console.log(istime.value);
            // istime.value = time === istime.value ? istime.value : time
        }

        const commentHomedrawerVo = ref({})
        const isLoadingEnd = ref(false)
        const noMore = ref(false)
        const Loadingdisabled = computed(() => isLoadingEnd.value || noMore.value)
        const commentHomedrawerDto = ref({
            entryId: undefined,
            type: 0,
            page: 1,
            size: 10,
        })

        const commentListGet = async () => {
            if (isLoadingEnd.value) return;
            isLoadingEnd.value = true;

            const { entryId, type, page, size } = commentHomedrawerDto.value

            try {
                const resp = await getCommentList(entryId, type, page, size);

                if (Array.isArray(resp.data?.comments) && resp.data?.comments.length === 0) {
                    noMore.value = true
                }


                if (!commentHomedrawerVo.value) {
                    commentHomedrawerVo.value = { comments: [] };
                }

                const newComments = Array.isArray(resp.data?.comments) ? resp.data.comments : [];

                const existingComments = Array.isArray(commentHomedrawerVo.value?.comments) ? commentHomedrawerVo.value?.comments : [];


                commentHomedrawerVo.value = {
                    ...commentHomedrawerVo.value,
                    comments: [
                        ...existingComments,
                        ...newComments
                    ]
                };

                commentHomedrawerDto.value.page++;
                isLoadingEnd.value = false;
            } catch (error) {
                console.error('Error loading more data:', error);
            } finally {
                isLoadingEnd.value = false;
            }
        }


        const loadMore = () => {
            console.log('loadMore noMore main');
            if (!noMore.value) {
                commentListGet()
            }
        }


        const getCommentReListS = async (type, id, page, size) => {
            const resp = await getCommentReList(type, id, page, size)
            return resp.data
        }

        return {
            commentitemRefidMap,
            toggleAnswer,
            istime,
            time,
            commentHomedrawerDto,
            commentListGet,
            getCommentReListS,
            loadMore,
            isLoadingEnd,
            commentdialog,
            noMore,
            Loadingdisabled,
            commentHomedrawerVo,
        }
    })


export default maincommentAppStore