import { userFeedback} from '@/api/user/report'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const feedbackAppStore = defineStore(
  'feedback', () => {

    
    const userFeedbackSeve= async (content)=>{
        await userFeedback(content)
    }

    return{
        userFeedbackSeve,
    }
  })


export default feedbackAppStore