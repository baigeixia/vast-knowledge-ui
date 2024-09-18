<template>
  <div class="">
    <Followingheader :userid="userid" />
    <UserdialogTable  :dialoguserlist="[ 
                {
                    id: '1111',
                    commentEndTime: '22:05',
                    attach_info: {
                        id: 33,
                        title: '哪个瞬间你觉得你的宠物爱上了你？',
                    },
                    replyMesg: {
                        contentText: '您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
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
                        contentText: '您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
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
                        contentText: '您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
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
                        contentText: '您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
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
                        contentText: '您举报的回答暂时无法判定违规，平台后续会持续关注，感谢您的反馈。'
                    }
                },
            ]"/>
    UserFollowing
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import Followingheader from './Followingheader.vue'
import UserdialogTable from '@/components/UserdialogTable.vue'

const pageTitle = ref('关注');
onMounted(() => {
  document.title = pageTitle.value;
});

const props = defineProps({
  userid: {
    type: String,
    required: true,
  }
})

</script>
  
<style lang="scss" scoped></style>
  