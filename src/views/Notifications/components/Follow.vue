<template>
  <div class="follow-box"  v-infinite-scroll="load">    
    <NotificationList notificationType="follow" :notificationList="notificationList" :extendicon="extendicon" :verb="verb" />
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import NotificationList from '@/components/NotificationList.vue'

const extendicon=ref('https://pica.zhimg.com/v2-bbe4688083199733e8e64d0fc447791d_200x0.png?source=582e62d4')
const verb=ref('关注了你')

const notificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationinfo: [
                {
                    focuson:true,
                    commentEndTime: '22:05',
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
                    focuson:false,
                    commentEndTime: '21:05',
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
                    focuson:true,
                    commentEndTime: '22:05',
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
                    focuson:false,
                    commentEndTime: '21:05',
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
    console.log(count.value);
    notificationList.value=[...notificationList.value,...upnotificationList.value]
}


const pageTitle = ref('新增粉丝');
onMounted(() => {
  document.title = pageTitle.value;
});
const emit = defineEmits(['data-loaded']);

// 使用组合式API中的 onMounted 钩子
onMounted(() => {
  setTimeout(() => {
    // 数据加载完成后触发事件通知父组件
    console.log('data-loaded');
    emit('data-loaded');
  }, 2000);
});
</script>

<style lang="scss" scoped>
.follow-box{
  flex: 1;
}
</style>
