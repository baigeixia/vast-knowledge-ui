<template>
    <div class="comment-box" v-infinite-scroll="load" :infinite-scroll-immediate="false" :infinite-scroll-disabled="noMore">
        <NotificationList notificationType="comment" :notificationList="notificationList" :extendicon="extendicon" :endLoading="endLoading" :upLoading="upLoading" />
        <div class="end-of-data">
            <div v-if="noMore && notificationList.length>1">已经到最底部了</div>
            <div v-if="!endLoading && notificationList.length === 0">还没有内容</div>
        </div>
        <el-button @click="sendchatMsg" > 私信</el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NotificationList from '@/components/NotificationList.vue'
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()

const sendchatMsg=()=>{
    console.log("sendchatMsg");
    notificationS.chatMsg()
}
const extendicon = ref('https://picx.zhimg.com/v2-40cc57d7a7f9fc24711c601615c9fb57_200x0.png?source=582e62d4')
const count = ref(1)
const noMore = ref(false)
const notificationList = ref([])
const upLoading = ref(false)
const endLoading = ref(false)

const load = async () => {
    count.value += 1
    upLoading.value = true
    try {
        const data = await notificationS.getCommentNotificationInfo(count.value, 10)

        if (!data || data.length === 0) {
            noMore.value = true
        }

        if (data) {
            notificationList.value = [...notificationList.value, ...data]
        }

        upLoading.value = false
    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        upLoading.value = false;
    }

}

const pageTitle = ref('评论与回复');
onMounted(async () => {
    endLoading.value = true
    try {
        const data = await notificationS.getCommentNotificationInfo(count.value, 10)

        //   notificationList.value=notificationS.commentNotificationList
        notificationList.value = data
        document.title = pageTitle.value;
        endLoading.value = false;
    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        endLoading.value = false;
    }
});

const emit = defineEmits(['data-loaded']);

// 使用组合式API中的 onMounted 钩子
onMounted(() => {
    setTimeout(() => {
        // 数据加载完成后触发事件通知父组件
        // console.log('data-loaded');
        emit('data-loaded');
    }, 2000);
});
</script>

<style lang="scss" scoped>
.comment-box {
    flex: 1;

    .end-of-data {
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 10px;
        color: #8a919f;
        bottom: 20px;
        z-index: 1000;
    }
}
</style>
