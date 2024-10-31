<template>
  <div class="UserPins">
    <div class="List-header">
      <h4>{{ (userid == getUserid() ? '我' : (userinfoAppStores.userinfo.sex == 0 ? '他' : '她')) +'的动态' }}</h4>
    </div>
    <el-skeleton animated :loading="loading" style="padding-top: 32px">
      <template #template>
        <el-skeleton-item style="width: 40%;" variant="h1" />
        <el-skeleton-item style="width: 100%;" variant="h1" />
        <el-skeleton-item style="width: 40%;" variant="text" />
        <br>
        <br>
        <el-skeleton-item style="width: 40%;" variant="h1" />
        <el-skeleton-item style="width: 100%;" variant="h1" />
        <el-skeleton-item style="width: 40%;" variant="text" />
      </template>
      <div class="List-content" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"
        :infinite-scroll-disabled="loadingdisabled" v-if="dynamics && dynamics.length > 0">
        <div class="List-itme" v-for="dynamic in dynamics" :key="dynamic.createdTime">
          <div class="itme-behavior">
            <div class="list-text">{{ dynamic.actionText }}</div>
            <div class="list-time">{{ $formatDateTime(dynamic.createdTime) }}</div>
          </div>
          <div class="content-skeleton-item">
            <MaincontentItme :content="dynamic.target" />
          </div>
        </div>
      </div>
      <div v-else class="user-activity-nodata">
        
        <span v-if="!loading">还没有发布任何动态</span>
      </div>
      <div v-if="loadingdisabled && dynamics.length > 0"  class="user-activity-nodata">
        已经到底部了
      </div>
      <el-skeleton animated :loading="reloading" style="padding-top: 32px">
        <template #template>
          <el-skeleton-item style="width: 40%;" variant="h1" />
          <el-skeleton-item style="width: 100%;" variant="h1" />
          <el-skeleton-item style="width: 40%;" variant="text" />
        </template>
      </el-skeleton>
    </el-skeleton>

  </div>
</template>
  
<script setup>
import MaincontentItme from '@/views/home/components/MaincontentItme.vue'
import { ref, onMounted, reactive, nextTick,watch } from 'vue';
import behaviourAppStore from "@/stores/collection/behaviour"
const behaviourAppStoreS = behaviourAppStore();
import { getUserid } from '@/utils/auth'
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
const props = defineProps({
  userid: {
    type: String,
    required: true,
  }
})

import { useRouter } from 'vue-router';
const router = useRouter();

const dynamics = ref([])
const page = ref(1)
const size = ref(5)
const loadingdisabled = ref(false)
const reloading = ref(false)
const loading = ref(false)

const pageTitle = '的动态';

watch(() => props.userid, async (newValue) => {
  // router.go(0);

  console.log('动态',newValue);
  page.value=1
  loadingdisabled.value=false
  dynamics.value=[]
  await getdynamics()
})

onMounted(async () => {
  if (loading.value) {
    return
  }
  try {
    loading.value = true
    await getdynamics();
    nextTick(() =>
      document.title = userinfoAppStores?.userinfo?.name + pageTitle
    )
    loading.value = false
  } catch {
    console.error("数据加载错误");
  } finally {
    loading.value = false
  }


})

async function getdynamics() {
  try {
    if (reloading.value) {
      return;
    }
    reloading.value = true
    const data = await behaviourAppStoreS.getdynamics(props.userid, page.value, size.value);
    console.log(data);
    if (data && data.length > 0) {
      dynamics.value = [...dynamics.value, ...data];
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
  await getdynamics();
}
</script>
  
<style lang="scss" scoped>
.UserPins {
  .List-header {
    align-items: center;
    border-bottom: 1px solid #f8f8fa;
    box-sizing: border-box;
    display: flex;
    height: 50px;
    justify-content: space-between;
    margin: 0 20px;

    h4 {
      font-weight: 600;
    }
  }

  .user-activity-nodata{
    display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;

  span {
    font-weight: 600;
  }
  }
  .List-content {
    .List-itme {
      padding: 5px 20px;

      .content-skeleton-item {
        // display: flex;
        transition: all .3s ease-in;
        cursor: pointer;
        position: relative;
        background: #fff;
        padding: 5px 20px 0;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #f1f2f5;

      }

      .content-skeleton-item:hover {
        background-color: #f7f8fa;

        :deep(.dots) {
          display: block;
        }

      }

      .itme-behavior {
        display: flex;
        color: #8491a5;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
  