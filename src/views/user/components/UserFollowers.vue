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
                :infinite-scroll-disabled="loadingdisabled" v-if="followersData && followersData.length > 0">
                <UserdialogTable :dialoguserlist="followersData" />
            </div>
            <div v-else class="user-activity-nodata">

                <span v-if="!loading">还没有关注</span>
            </div>
            <div v-if="loadingdisabled && followersData.length > 0" class="user-activity-nodata">
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
import { ref, onMounted, nextTick ,defineAsyncComponent} from "vue"


const Followingheader = defineAsyncComponent(() => import("./Followingheader.vue"))
const UserdialogTable = defineAsyncComponent(() => import("@/components/UserdialogTable.vue"))


const props = defineProps({
    userid: {
        type: String,
        required: true,
    }
})

import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const page = ref(1)
const size = ref(5)
const loadingdisabled = ref(false)

const reloading = ref(false);
const loading = ref(false);
const pageTitle = '粉丝';

const followersData = ref([])

onMounted(async () => {
    if (loading.value) {
        return
    }
    try {
        loading.value = true
        await getData()

        let data = await getUserinfo()
        nextTick(() =>
            document.title = data.name + pageTitle
        )

        nextTick()
        loading.value = false
    } catch {
        console.error("数据加载错误");
    } finally {
        loading.value = false
    }
})

const getUserinfo = async () => {
  const data = await userinfoAppStores.getusergetInfo(props.userid)
  return data
}

const getData = async () => {
    try {
        if (reloading.value) {
            return;
        }
        reloading.value = true;
        const data = await userinfoAppStores.getuserfollowersList(props.userid, page.value, size.value);
        if (data?.records && data?.records.length > 0) {
            console.log(data);
            followersData.value.push(...data.records);
            page.value++;
        } else {
            loadingdisabled.value = true
        }

        reloading.value = false;
    } catch (error) {
        console.error('获取动态数据失败:', error);
    } finally {
        reloading.value = false;
    }

}

const loadMore = async () => {
    await getData();
}
</script>

<style lang="scss" scoped>
.user-activity-nodata {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;

    span {
        font-weight: 600;
    }
}
</style>
