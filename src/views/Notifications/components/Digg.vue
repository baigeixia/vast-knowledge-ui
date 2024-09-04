<template>
    <div class="digg-box" v-infinite-scroll="load">
        <el-skeleton :rows="5" animated :loading="Loading">
            <NotificationList notificationType="digg" :notificationList="notificationList" :extendicon="extendicon"
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

const extendicon = ref('https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4')
const verb = ref('喜欢了您的评论')

const Loading = ref(true)
const endLoading = ref(false)

const noMore = ref(false)


const notificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationinfo: [
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
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
                        {
                            id: '4',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '5',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '6',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '7',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '8',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '9',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '10',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '11',
                            username: '鑻籰11',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                    ]
                },
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
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
                        {
                            id: '4',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '5',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '6',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '7',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '8',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '9',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '10',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '11',
                            username: '鑻籰11',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                    ]
                },
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间您觉得您的宠物爱上了您？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        }
                    ]
                },
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间您觉得您的宠物爱上了您？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        }
                    ]
                },
            ]
        },

    ]
)

const upnotificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationinfo: [
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '收藏了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
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
                        {
                            id: '4',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '5',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '6',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '7',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '8',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '9',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '10',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '11',
                            username: '鑻籰11',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                    ]
                },
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的文章',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
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
                        {
                            id: '4',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '5',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '6',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '7',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '8',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '9',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '10',
                            username: '鑻籰',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                        {
                            id: '11',
                            username: '鑻籰11',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        },
                    ]
                },
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间您觉得您的宠物爱上了您？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        }
                    ]
                },
                {
                    commentid: '1111',
                    extendicon: 'https://picx.zhimg.com/v2-b14298b5e448985065c67ab60202199d_720w.png?source=582e62d4',
                    verb: '喜欢了您的评论',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间您觉得您的宠物爱上了您？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                        }
                    ]
                },
            ]
        },
    ]
)
const count = ref(0)
const load = () => {
    count.value += 1
    // console.log(count.value);
    notificationList.value = [...notificationList.value, ...upnotificationList.value]
}



const pageTitle = ref('赞和收藏');
onMounted(() => {
    document.title = pageTitle.value;
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
