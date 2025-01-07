import { getlist } from '@/api/admin/channel'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const channelAppStore = defineStore(
  'channel', () => {
    const channellist = ref([])
    const headertype = ref(1)


    const page = ref(0)     
    const pagesize = ref(10)     

    const getchannellist = async () => {
      const res = await getlist()
      channellist.value = res.data.records	
    }

    const STATUSMAP = {
      1: "启动",
      0: "禁用",
    };

    const channellistdata = computed(() => channellist.value.records?.map((item) => ({ ...item, isDefault: item.isDefault ? "是" : "否", status: STATUSMAP[item.status], createdTime: item.createdTime.replace(/T/, ' ') })))

    return {
      channellist,
      getchannellist,
      channellistdata,
      headertype,
      page,
      pagesize,
      
    }
  })