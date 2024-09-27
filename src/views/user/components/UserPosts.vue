<template>
  <div class="user-activity" v-if="posts.records && posts.records.length > 0">
    <div class="List-header">
      <h4>{{ (userinfoAppStores.userinfo.id == getUserid() ? '我' : (userinfoAppStores.userinfo.sex == 0 ? '他' : '她'))
        + '的' + pageTitle }}</h4>
      <div class="tge">
        <span :class="{ 'is-active': type == 1 }" @click="tgeType(1)">最新</span>
        <span :class="{ 'is-active': type == 2 }" @click="tgeType(2)">最火</span>
      </div>
    </div>
    <div class="itme-List" v-infinite-scroll="loadMore" :infinite-scroll-immediate="false"
      :infinite-scroll-disabled="loadingdisabled">
      <div class="content-skeleton-item" v-for="post in posts.records" :key="post.id">
        <div class="post-time">
          <time>{{ $formatDateTime(post.createdTime) }}&nbsp;:&nbsp;创建时间</time>
        </div>
        <MaincontentItme :content="post" />
      </div>
    </div>
  </div>
  <div v-else class="user-activity-nodata">
  还没有数据
  </div>
</template>
  
<script setup>
import MaincontentItme from '@/views/home/components/MaincontentItme.vue'
import { ref, onMounted, nextTick } from 'vue';
import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
import { getUserid } from '@/utils/auth'

const props = defineProps({
  userid: {
    type: String,
    required: true,
  }
})
const posts = ref(
  {
    records: [],
    pageNumber: 0,
    pageSize: 0,
    totalPage: 0,
    totalRow: 0,
  })
const page = ref(1)
const size = ref(5)
const type = ref(1)
const loadingdisabled = ref(false)

const pageTitle = '文章';

const tgeType = async (t) => {
  console.log(type);
  if (type == type.value) {
    return
  }
  type.value = t

  page.value = 1
  loadingdisabled.value = false
  posts.value = {
    records: [],
    pageNumber: 0,
    pageSize: 0,
    totalPage: 0,
    totalRow: 0,
  }

  await getPosts();

}
onMounted(async () => {
  await getPosts();
  nextTick(() =>
    document.title = userinfoAppStores?.userinfo?.name + pageTitle
  )
})

async function getPosts() {
  try {
    const data = await articleStore.getuserArticleList(props.userid, page.value, size.value, type.value);
    console.log(data);
    if (data || data.records) {
      // posts.value = [...posts.value, ...data];
      posts.value.records.push(...data.records);
      posts.value.pageNumber = data.pageNumber;
      posts.value.pageSize = data.pageSize;
      posts.value.totalPage = data.totalPage;
      posts.value.totalRow = data.totalRow;

      page.value++;
    } else {
      loadingdisabled.value = true
    }
  } catch (error) {
    console.error('获取动态数据失败:', error);
  }
}

const loadMore = async () => {
  await getPosts();
}
</script>
  
<style lang="scss" scoped>
.user-activity-nodata{
  display: flex;
  align-items: center;
  justify-content: center;
  span{
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
  