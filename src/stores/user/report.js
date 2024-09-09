import { userReport} from '@/api/user/report'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const reportAppStore = defineStore(
  'report', () => {

    
    const userReportSeve= async (reportUserId,reportUserName,articleId,reportReason,reportContent)=>{
        await userReport(reportUserId,reportUserName,articleId,reportReason,reportContent)
    }

    return{
        userReportSeve,
    }
  })


export default reportAppStore