<template>
  <div class="user-activity">
    <div class="List-header">
      <h4>{{ (userid == getUserid() ? '我' : (userinfoAppStores.userLocalinfo.sex == 0 ? '他' : '她'))
        + '的' + pageTitle }}</h4>
      <div class="tge">
        <span :class="{ 'is-active': type == 1 }" @click="tgeType(1)">最新</span>
        <span :class="{ 'is-active': type == 2 }" @click="tgeType(2)">最火</span>
      </div>
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
          :infinite-scroll-disabled="loadingdisabled" v-if="posts.records && posts.records.length > 0">
          <div class="content-skeleton-item" v-for="post in posts.records" :key="post.id">
            <div class="post-time">
              <time>{{ $formatDateTime(post.createdTime) }}&nbsp;:&nbsp;创建时间</time>
            </div>
            <MaincontentItme :content="post"   />
          </div>
        </div>
        <div v-else class="user-activity-nodata">

          <span v-if="!loading">还没有发布过文章</span>
        </div>
        <div v-if="loadingdisabled && posts.records.length > 0" class="user-activity-nodata">
          已经到底部了
        </div>

        <el-skeleton animated :loading="reloading" style="padding-top: 32px">
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

const reloading = ref(false)
const loading = ref(false)



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
  if (loading.value) {
    return
  }
  try {
    loading.value = true
    await getPosts();
    let data = await getUserinfo()
    nextTick(() =>
      document.title = data.name + pageTitle
    )
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


async function getPosts() {
  try {
    if (reloading.value) {
      return;
    }
    reloading.value = true
    const data = await articleStore.getuserArticleList(props.userid, page.value, size.value, type.value);
    console.log(data);
    if (data?.records && data?.records.length > 0) {
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
    reloading.value = false
  } catch (error) {
    console.error('获取动态数据失败:', error);
  } finally {
    reloading.value = false
  }
}

const loadMore = async () => {
  await getPosts();
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
  