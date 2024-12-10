<template>
    <div class="">
        <Followingheader :userid="userid" />

        <el-skeleton animated :loading="loading" style="padding-top: 36px">
            <template #template>
                <div style="display: flex;">
                    <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                    <div style="width: 100%; padding-left: 14px">
                        <el-skeleton-item style="width: 40%;" variant="text" />
                        <el-skeleton-item style="width: 100%;" variant="text" />
                        <el-skeleton-item style="width: 40%;" variant="text" />
                    </div>
                </div>
            </template>
            <div class="itme-List" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"
                :infinite-scroll-disabled="loadingdisabled" v-if="followingData && followingData.length > 0">
                <UserdialogTable :dialoguserlist="followingData" />
            </div>
            <div v-else class="user-activity-nodata">
                
                <span v-if="!loading">还没有关注用户</span>
            </div>
            <div v-if="loadingdisabled && followingData.length > 0" class="user-activity-nodata">
                已经到底部了
            </div>
            <el-skeleton animated :loading="reloading">
                <template #template>
                    <div style="display: flex;">
                        <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                        <div style="width: 100%; padding-left: 14px">
                            <el-skeleton-item style="width: 40%;" variant="text" />
                            <el-skeleton-item style="width: 100%;" variant="text" />
                            <el-skeleton-item style="width: 40%;" variant="text" />
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </el-skeleton>

    </div>
</template>
  
<script setup>
import { ref, onMounted ,nextTick} from 'vue';
import Followingheader from './Followingheader.vue'
import UserdialogTable from '@/components/UserdialogTable.vue'

const pageTitle = '关注';
onMounted(async () => {
    let data = await getUserinfo()
    nextTick(() =>
      document.title = data.name + pageTitle
    )

    // document.title = pageTitle.value;
});

const props = defineProps({
    userid: {
        type: String,
        required: true,
    }
})

const getUserinfo = async () => {
  const data = await userinfoAppStores.getusergetInfo(props.userid)
  return data
}

import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const page = ref(1)
const size = ref(5)
const loadingdisabled = ref(false)

const loading = ref(false);
const reloading = ref(false);

const followingData = ref([])

onMounted(async () => {
    if (loading.value) {
        return
    }
    try {
        loading.value = true
        await getData()
        nextTick()
        loading.value = false
    } catch(error) {
        console.error("数据加载错误",error);
    } finally {
        loading.value = false
    }
})


const getData = async () => {
    try {
        if (reloading.value) {
            return
        }
        reloading.value = true;
        const data = await userinfoAppStores.getuserFollowingList(props.userid, page.value, size.value);
        if (data?.records && data?.records.length > 0) {
            console.log(data);
            followingData.value.push(...data.records);
            page.value++;
        } else {
            loadingdisabled.value = true
        }

        reloading.value = false
    } catch (error) {
        console.error('获取动态数据失败:', error);
    } finally {
        reloading.value = false
    }

}

const loadMore = async () => {
    await getData();
}
</script>
  
<style lang="scss" scoped>
.user-activity-nodata{
    display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  span {
    font-weight: 600;
  }
}
</style>
  