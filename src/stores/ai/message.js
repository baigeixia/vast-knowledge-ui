import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { createChatApi, upTitleApi, deChatApi } from '@/api/ai/message'


const aimessageAppStore = defineStore(
    'aimessage', () => {

        const currentInfo = ref({})

        const createChat = async (chatSessionId) => {
            try {
                const rep = await createChatApi(chatSessionId)
                currentInfo.value = rep.data

                return rep.data
            } catch (e) {
                console.error('获取模型列表失败', e)
            }

        }


        const upTitle = async (id, title) => {
            try {
                await upTitleApi(id, title)
            } catch (e) {
                console.error('重命名失败', e)
            }
        }

        const deChat = async (id) => {
            try {
                await deChatApi(id)
            } catch (e) {
                console.error('删除消息失败', e)
            }
        }

        return {
            createChat,
            currentInfo,
            upTitle,
            deChat,
        }
    })


export default aimessageAppStore