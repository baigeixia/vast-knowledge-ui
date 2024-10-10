<template>
  <div class="user-activity">
    <div class="List-header">
      <h4>{{ (userinfoAppStores.userinfo.id == getUserid() ? '我' : (userinfoAppStores.userinfo.sex == 0 ? '他' : '她'))
        + '的' + pageTitle }}</h4>
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
      <div>
        <div class="itme-List" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"
          :infinite-scroll-disabled="loadingdisabled" v-if="collects && collects.length > 0">
          <div class="content-skeleton-item" v-for="collect in collects" :key="collect.id">
            <div class="post-time">
              <time>创建时间&nbsp;:&nbsp;{{ $formatDateTime(collect.createdTime) }}</time>
            </div>
            <MaincontentItme :content="collect" />
          </div>
        </div>
        <div v-else class="user-activity-nodata">
          <span v-if="!loading">还没有任何收藏</span>
        </div>
        <div v-if="loadingdisabled &&collects.length > 0 " class="user-activity-nodata">
          已经到底部了
        </div>
        <br>
        <el-skeleton animated :loading="reloading">
          <template #template>
            <el-skeleton-item style="width: 40%;" variant="h1" />
            <el-skeleton-item style="width: 100%;" variant="h1" />
            <el-skeleton-item style="width: 40%;" variant="text" />
          </template>
        </el-skeleton>
      </div>
    </el-skeleton>
  </div>
</template>
  
<script setup>
import MaincontentItme from '@/views/home/components/MaincontentItme.vue'
import { ref, onMounted, nextTick } from 'vue';
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
import { getUserid } from '@/utils/auth'

import behaviourAppStore from "@/stores/collection/behaviour"
const behaviourAppStoreS = behaviourAppStore();


const props = defineProps({
  userid: {
    type: String,
    required: true,
  }
})
const collects = ref([])
const page = ref(1)
const size = ref(5)
const type = ref(1)
const loadingdisabled = ref(false)
const loading = ref(false)
const reloading = ref(false)

const pageTitle = '收藏';

onMounted(async () => {
  if (loading.value) {
    return
  }
  try {
    loading.value = true
    await getcollects();
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

async function getcollects() {
  try {
    const data = await behaviourAppStoreS.getuserCollectList(props.userid, page.value, size.value, type.value);
    if (data && data.length > 0) {
      console.log(data);
      collects.value.push(...data);
      page.value++;
    } else {
      loadingdisabled.value = true
    }
  } catch (error) {
    console.error('获取动态数据失败:', error);
  }
}

const loadMore = async () => {
  if (reloading.value) {
    return
  }
  try {
    reloading.value = true
    await getcollects();
    reloading.value = false
  } catch {
    console.error("数据加载错误");
  } finally {
    reloading.value = false
  }
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

.user-activity {

  .List-header {
    align-items: center;
    border-bottom: 1px solid #f8f8fa;
    box-sizing: border-box;
    display: flex;
    height: 50px;
    justify-content: space-between;
    margin: 0 20px;

    .tge {
      display: flex;
      justify-content: center;
      align-items: center;

      .is-active {
        color: #558eff;
        font-weight: 600;
      }

      span {
        text-align: center;
        margin-left: 5px;
        padding: 5px;
        color: #868688;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
        //  background-color: #ebebeb;
        border-radius: 5px;
        cursor: pointer;
      }

      span:not(.is-active):hover {
        color: #cfcfcf;
      }


    }

    h4 {
      font-weight: 600;
    }
  }

  .itme-List {

    // padding: 10px 20px;
    .content-skeleton-item {
      // display: flex;
      transition: all .3s ease-in;
      cursor: pointer;
      position: relative;
      background: #fff;
      padding: 10px 20px 0;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid #f1f2f5;

      .post-time {
        margin: 5px 0;
        display: flex;
        justify-content: end;
        color: #676768;
      }


    }

    .content-skeleton-item:hover {
      background-color: #f7f8fa;

      :deep(.dots) {
        display: block;
      }

    }
  }
}
</style>
  