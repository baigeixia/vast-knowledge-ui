import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { createChatApi, } from '@/api/ai/message'


const aimessageAppStore = defineStore(
    'aimessage', () => {

        const currentInfo=ref({})

        const createChat = async (chatSessionId) => {
            try {
                const rep = await createChatApi(chatSessionId)
                currentInfo.value=rep.data

                return rep.data
            } catch (e) {
                console.error('获取模型列表失败', e)
            }

        }


        return {
            createChat,
            currentInfo,
        }
    })


export default aimessageAppStore