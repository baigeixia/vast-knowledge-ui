import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getInfolistApi,getconversationApi } from '@/api/ai/info'


const aiInfoAppStore = defineStore(
    'aiInfo', () => {

        const infoList=ref({})

        const conversationList = reactive({
            content: []
        })

        const getInfolist = async (offset,limit) => {
            try {
                const rep = await getInfolistApi(offset,limit)
                infoList.value=rep.data

                return rep.data
            } catch (e) {
                console.error('获取消息列表失败', e)
            }

        }

        const getConversation = async (id,offset,limit) => {
            try {
                const rep = await getconversationApi(id,offset,limit)
                return rep.data
            } catch (e) {
                console.error('获取消息详情失败', e)
            }

        }


        return {
            infoList,
            getInfolist,
            getConversation,
            conversationList,

        }
    })


export default aiInfoAppStore