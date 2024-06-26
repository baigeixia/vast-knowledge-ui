import { getlist } from '@/api/admin/channel'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const channelAppStore = defineStore(
  'channel', () => {
    const channellist = ref({})

    const getchannellist = async (data) => {
      const { name, status, pageSize, pageNum } = data.value
      const res = await getlist({ name, status, pageSize, pageNum })
      channellist.value = res.data
    }

    const STATUSMAP = {
      1: "启动",
      0: "禁用",
    };

    const channellistdata=computed(()=> channellist.value.records?.map((item) => ({ ...item, isDefault: item.isDefault ? "是" : "否",status: STATUSMAP[item.status],createdTime:item.createdTime.replace(/T/,' ')})))

    return {
      channellist,
      getchannellist,
      channellistdata,
    }
  })