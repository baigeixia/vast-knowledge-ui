<template>
    <div class="comment-box" v-infinite-scroll="load" :infinite-scroll-immediate="false" :infinite-scroll-disabled="noMore">
        <NotificationList notificationType="comment" :notificationList="notificationList" :extendicon="extendicon"  />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NotificationList from '@/components/NotificationList.vue'
import notificationAppStore from "@/stores/admin/notification";
const notificationS=notificationAppStore()

const extendicon=ref('https://picx.zhimg.com/v2-40cc57d7a7f9fc24711c601615c9fb57_200x0.png?source=582e62d4')

/* const notificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationinfo: [
                {
                    commentid: '16',
                    commentEndTime: '2024-07-09 22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            verb: '回复了您的评论',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了\/n，防止第 \//t一次添加的不正确[撇嘴]第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '2',
                            username: '柴柴啊柴',
                            verb: '回复了您的评论',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '3',
                            username: '柴柴啊柴',
                            verb: '回复了您的评论',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                    ]
                },
                {
                    commentid: '1111',
                    commentEndTime: '2024-07-09 22:05',
                    verb: '回复了您的评论',
                    attach_info: {
                        id: 11,
                        title: '为什么电竞需要天赋极高？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '2',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '3',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                    ]
                }
            ]
        },
    ]
) */
/* const upnotificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            notificationinfo: [
                {
                    commentid: '1111',
                    commentEndTime: '2024-07-09 22:05',
                    verb: '评论了您的文章',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '2',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '3',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                    ]
                },
                {
                    commentid: '1111',
                    commentEndTime: '2024-07-09 22:05',
                    verb: '评论了您的文章',
                    attach_info: {
                        id: 11,
                        title: '为什么电竞需要天赋极高？',
                    },
                    actors: [
                        {
                            id: '1',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '2',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确第二次就是修改了，防止第一次添加的不正确',
                            replycontenttime: '21:05',
                        },
                        {
                            id: '3',
                            username: '柴柴啊柴',
                            avatar: 'https://picx.zhimg.com/v2-90bd7a603bfbec72f49c01d1dd73e142_xl.jpg?source=32738c0c',
                            replycontent: '第二次就是修改了，防止第一次添加的不正确[撇嘴]',
                            replycontenttime: '21:05',
                        },
                    ]
                }
            ]
        },
    ]
) */

const count = ref(1)
const noMore = ref(false)
const notificationList=ref([])

const load = async () => {
    count.value += 1
   const data= await notificationS.getCommentNotificationInfo(count.value,10)

    if (!data || data.length === 0) {
      noMore.value = true
    }

    if(data){
        notificationList.value=[...notificationList.value,...data]
    }
}

const pageTitle = ref('评论与回复');
onMounted(async () => {
const data = await notificationS.getCommentNotificationInfo(count.value,10)

//   notificationList.value=notificationS.commentNotificationList
notificationList.value=data
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
.comment-box {
    flex: 1;
}
</style>
