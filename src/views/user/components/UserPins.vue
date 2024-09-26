<template>
  <div class="UserPins" v-if="dynamics && dynamics.length > 0">
    <div class="List-header">
      <h4>{{ (userinfoAppStores.userinfo.id == getUserid() ? '我' : (userinfoAppStores.userinfo.sex == 0 ? '他' : '她')) +
        '的动态' }}</h4>
    </div>
    <div class="List-content" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"
      :infinite-scroll-disabled="loadingdisabled">
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

  </div>
</template>
  
<script setup>
import MaincontentItme from '@/views/home/components/MaincontentItme.vue'
import { ref, onMounted, reactive, nextTick } from 'vue';
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

const dynamics = ref([])
const page = ref(1)
const size = ref(5)
const loadingdisabled = ref(false)

const pageTitle = '的动态';

onMounted(async () => {
  await getdynamics();
  nextTick(() =>
    document.title = userinfoAppStores?.userinfo?.name + pageTitle
  )
})

async function getdynamics() {
  try {
    const data = await behaviourAppStoreS.getdynamics(props.userid, page.value, size.value);
    console.log(data);
    if (data && data.length > 0) {
      dynamics.value = [...dynamics.value, ...data];
      page.value++;
    } else {
      loadingdisabled.value = true
    }
  } catch (error) {
    console.error('获取动态数据失败:', error);
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
  