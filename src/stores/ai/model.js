import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getModelListApi, } from '@/api/ai/model'


const aimodelAppStore = defineStore(
    'aimodel', () => {

        const modelList = ref([])

        const topModel = ref({})

        const getModelList = async () => {
            try {
                const rep = await getModelListApi()
                modelList.value = rep.data || []
            } catch (e) {
                console.error('获取模型列表失败', e)
            }

            topModel.value = Array.isArray(modelList.value) && modelList.value.length > 0
                ? modelList.value[0]
                : null;
        }


        return {
            modelList,
            getModelList,
            topModel,
        }
    })


export default aimodelAppStore