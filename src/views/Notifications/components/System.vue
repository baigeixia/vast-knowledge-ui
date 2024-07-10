<template>
  <div class="system-box" v-infinite-scroll="load">
    <NotificationList notificationType="system" :notificationList="notificationList" :extendicon="extendicon"  />
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import NotificationList from '@/components/NotificationList.vue'

const extendicon=ref('https://pic1.zhimg.com/v2-e4573613154ffec3ced881b7170bc3ac_200x0.png?source=582e62d4')
// const verb=ref('举报处理通知 ')

const notificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            verbType: '举报处理通知',
            notificationinfo: [
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                      contentText:'您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                },
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                      contentText:'您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                },
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                      contentText:'您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                },
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                      contentText:'您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                },
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                      contentText:'您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                },
            ]
        },
        {
            statisticsTime: '2024-07-09',
            verbType: '反馈处理通知',
            notificationinfo: [
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '标题过大导致。。',
                    },
                    replyMesg: {
                      contentText:'问题已处理，平台后续会持续关注，感谢您的反馈。'
                    }
                }
            ]
        },
    ]
)

const upnotificationList = ref(
    [
        {
            statisticsTime: '2024-07-09',
            verbType: '反馈处理通知',
            notificationinfo: [
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                      contentText:'您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                }
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

const pageTitle = ref('系统通知');
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
.system-box{
  flex: 1;
}
</style>
