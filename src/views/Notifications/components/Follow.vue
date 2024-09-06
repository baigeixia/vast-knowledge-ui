<template>
    <div class="follow-box" v-infinite-scroll="load" :infinite-scroll-immediate="false" :infinite-scroll-disabled="noMore">
        <el-skeleton :rows="5" animated :loading="Loading">
            <NotificationList notificationType="follow" :notificationList="notificationList" :extendicon="extendicon"
                :verb="verb" />
        </el-skeleton>
        <el-skeleton style="padding-top: 24px;" :rows="5" animated :loading="endLoading"/>
        <div v-if="noMore" class="end-of-data">
            <div v-if="notificationList?.length > 1">已经到最底部了</div>
            <div v-else>还没有内容</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NotificationList from '@/components/NotificationList.vue'
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()


const extendicon = ref('https://pica.zhimg.com/v2-bbe4688083199733e8e64d0fc447791d_200x0.png?source=582e62d4')
const verb = ref('关注了您')

const Loading = ref(false)
const endLoading = ref(false)
const noMore = ref(false)

const notificationList = ref([])


/* const notificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationInfoList: [
                {
                    verb:"关注了你",
                    mergeCount:11,
                    followEndTime: '22:05',
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                        },
                        {
                            id: '2',
                            username: '大橙子吃小臣子',
                        },
                        {
                            id: '3',
                            username: '鑻籰',
                        },
                        {
                            id: '4',
                            username: '鑻籰',
                        },
                        {
                            id: '5',
                            username: '鑻籰',
                        },
                        {
                            id: '6',
                            username: '鑻籰',
                        },
                        {
                            id: '7',
                            username: '鑻籰',
                        },
                        {
                            id: '8',
                            username: '鑻籰',
                        },
                        {
                            id: '9',
                            username: '鑻籰',
                        },
                        {
                            id: '10',
                            username: '鑻籰',
                        },
                        {
                            id: '11',
                            username: '鑻籰11',
                        },
                    ]
                }
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
                    verb:"关注了你",
                    mergeCount:11,
                    followEndTime: '22:05',
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                        },
                        {
                            id: '2',
                            username: '大橙子吃小臣子',
                        },
                        {
                            id: '3',
                            username: '鑻籰',
                        },
                        {
                            id: '4',
                            username: '鑻籰',
                        },
                        {
                            id: '5',
                            username: '鑻籰',
                        },
                        {
                            id: '6',
                            username: '鑻籰',
                        },
                        {
                            id: '7',
                            username: '鑻籰',
                        },
                        {
                            id: '8',
                            username: '鑻籰',
                        },
                        {
                            id: '9',
                            username: '鑻籰',
                        },
                        {
                            id: '10',
                            username: '鑻籰',
                        },
                        {
                            id: '11',
                            username: '鑻籰11',
                        },
                    ]
                }
            ]
        },
    ]
)

const count = ref(1)
const load = async () => {
    count.value += 1
    endLoading.value = true
    try {
        const data = await notificationS.getfollowNotificationInfo(count.value, 5)

        if (!data || data.length === 0) {
            noMore.value = true
        }

        if (data) {
            notificationList.value = [...notificationList.value, ...data]
        }

        endLoading.value = false
    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        endLoading.value = false;
    }
}


const pageTitle = ref('新增粉丝');
onMounted( async () => {
    document.title = pageTitle.value;
    Loading.value = true
    try {
        const data = await notificationS.getfollowNotificationInfo(count.value, 5)

        notificationList.value = data
        document.title = pageTitle.value;
        Loading.value = false;

    } catch (error) {
        // console.error('Error loading more data:', error);
    } finally {
        Loading.value = false;
    }
});
/* const emit = defineEmits(['data-loaded']);
// 使用组合式API中的 onMounted 钩子
onMounted(() => {
    setTimeout(() => {
        // 数据加载完成后触发事件通知父组件
        // console.log('data-loaded');
        emit('data-loaded');
    }, 2000);
}); */
</script>

<style lang="scss" scoped>
.follow-box {
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
