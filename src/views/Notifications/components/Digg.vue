<template>
    <div class="digg-box" v-infinite-scroll="load" :infinite-scroll-immediate="false" :infinite-scroll-disabled="noMore">
        <NotificationList notificationType="digg" :notificationList="notificationList" :extendicon="extendicon" :endLoading="endLoading" :upLoading="upLoading" />
        <div class="end-of-data">
            <div v-if="noMore && notificationList.length>1">已经到最底部了</div>
            <div v-if="!endLoading && notificationList.length === 0">还没有内容</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NotificationList from '@/components/NotificationList.vue'
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()

const extendicon = ref('https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4')
const verb = ref('喜欢了您的评论')

const upLoading = ref(false)
const endLoading = ref(false)

const noMore = ref(false)
const notificationList = ref([])
/* 
const notificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationInfoList: [
                {
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢您的评论',
                    commentEndTime: '22:05',
                    mergeCount: 9,
                    attachInfo: {
                        id: 33,
                        commentid: '1111',
                        title: '哪个瞬间您觉得您的宠物爱上了您？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '2',
                            username: '大橙子吃小臣子',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '3',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                    ]
                },
            ]
        },
    ]
) 
 */

const upnotificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationInfoList: [
                {
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    mergeCount: 9,
                    attachInfo: {
                        id: 33,
                        commentid: '1111',
                        title: '哪个瞬间您觉得您的宠物爱上了您？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '2',
                            username: '大橙子吃小臣子',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '3',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                    ]
                },
            ]
        },
    ]
) 

const count = ref(1)
const load = async () => {
    count.value += 1
    upLoading.value = true
    try {
        const data = await notificationS.getLikeNotificationInfo(count.value, 5)

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



const pageTitle = ref('赞与喜欢');
onMounted(async () => {
    document.title = pageTitle.value;
    endLoading.value = true
    try {
        const data = await notificationS.getLikeNotificationInfo(count.value, 10)

        notificationList.value = data
        document.title = pageTitle.value;
        endLoading.value = false;

    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        endLoading.value = false;
    }
});

// const emit = defineEmits(['data-loaded']);
// 影响父组件加载，但是现在改为单独控制
// onMounted(() => {
//     setTimeout(() => {
//         // 数据加载完成后触发事件通知父组件
//         // console.log('data-loaded');
//         emit('data-loaded');
//     }, 2000);
// });
</script>

<style lang="scss" scoped>
.digg-box {
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
