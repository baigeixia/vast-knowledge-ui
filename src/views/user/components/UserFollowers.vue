<template>
  <div class="">
    <Followingheader :userid="userid"  />
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
            ]" />
    followers
  </div>
</template>

<script setup>
import { ref } from "vue"
import Followingheader from './Followingheader.vue'
import UserdialogTable from '@/components/UserdialogTable.vue'
const props = defineProps({
  userid: {
    type: String,
    required: true,
  }
})
</script>

<style lang="scss" scoped>

</style>
