<template>
    <div class="dialog-list-box" v-if="dialoguserlist">
        <div class="list-item-box" v-for=" (info, index) in dialoguserlist" :key="info.id">
            <div class="ContentItem">
                <div class="ContentItem-head">
                    <div class="UserItem-title">
                        <user-info-popover :author="info">
                            <template v-slot:reference>
                                <div class="ContentItem-info">
                                    <div class="ContentItem-image">
                                        <RouterLink :to="`/user/${info.id}`" >
                                            <img class="image-box" :src="info.avatar || info.image" alt="avatar" />
                                        </RouterLink>
                                    </div>
                                    <div class="info-text">
                                        <RouterLink :to="`/user/${info.id}`" >
                                            <div class="UserItem-title-username" v-html="info.username ||  info.name">
                                        </div>
                                        </RouterLink>
                                        <div class="ContentItem-status">
                                            {{ info.introduction }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </user-info-popover>
                    </div>

                </div>
                <div class="ContentItem-extra" v-if="getUserid()">
                    <el-button :type="info.concerned === 1 ? 'info' : 'primary'" :round="true" style="min-width: 130px;"
                        @click="followedButton(info.id, info.username || info.name)" :disabled="info.id == getUserid()"
                        @mouseenter="hoverStates[index] = true" @mouseleave="hoverStates[index] = false">
                        <i class="bi  bi-dash-lg " v-if="info.concerned === 1">
                            <span class="button-icon "> {{ hoverStates[index] ? "取消" : "已" }}关注</span></i>
                        <i class="bi bi-plus-lg" v-else><span class="button-icon">关注</span></i>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue"
import { getUserid } from '@/utils/auth'
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()

import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    dialoguserlist: {
        type: Array,
        required: true,
    },
})
const hoverStates = ref([]);

// const hoverStates = ref(new Array(props.dialoguserlist.value.length).fill(false));
onMounted(() => {
    hoverStates.value = new Array(props.dialoguserlist.length).fill(false);
});

watch(() => props.dialoguserlist, (newVal) => {
    hoverStates.value = new Array(newVal.length).fill(false);
});
const followedButton = (id, username) => {
    console.log("关注",id, username);
    notificationS.fanMsg(id, username)
    const user = props.dialoguserlist.find(i => i.id === id);
    if (user) {
        user.concerned = user.concerned === 1 ? 0 : 1;
    }
}

const opuserinfo = (id) => {
  router.resolve({
        path: `/user/${id}`
    });
}
</script>

<style lang="scss" scoped>
.dialog-list-box {
    max-height: 750px;
    padding-top: 10px;
    overflow-y: auto;

    .list-item-box {
        padding: 16px 20px;
        border-bottom: 1px solid #f3f3f5;

        .ContentItem {
            display: flex;
            align-content: center;

            // .ContentItem-image {
            //     float: left;
            //     margin-right: 16px;

            //     .image-box {
            //         cursor: pointer;

            //         box-sizing: border-box;
            //         margin: 0px;
            //         min-width: 0px;
            //         max-width: 100%;
            //         background-color: rgb(255, 255, 255);
            //         width: 60px;
            //         height: 60px;
            //         border-radius: 4px;

            //     }

            // }

            .ContentItem-head {

                -webkit-box-flex: 1;
                flex: 1 1;
                margin-right: 6px;
                overflow: hidden;

                .UserItem-title {
                    color: #000;
                    -webkit-box-align: center;
                    align-items: center;
                    display: flex;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 1.6;
                    word-break: break-word;

                    .ContentItem-info {
                        display: flex;
                        align-items: center;
                        a {
                                color: #000;
                                margin:0;
                            }

                        .UserItem-title-username {
                            max-height: 60px;
                            max-width: 50%;
                            min-width: 200px;
                            cursor: pointer;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            -webkit-box-orient: vertical;

                        }

                        .ContentItem-status {
                            font-size: 14px;
                            font-weight: 400;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            overflow: hidden;
                            -webkit-box-orient: vertical;

                        }

                     
                        .ContentItem-image {
                            float: left;
                            margin-right: 16px;
                         


                            .image-box {
                                cursor: pointer;
                                box-sizing: border-box;
                                margin: 0px;
                                min-width: 60px;
                                max-width: 100%;
                                background-color: rgb(255, 255, 255);
                                width: 60px;
                                height: 60px;
                                border-radius: 4px;

                            }

                        }
                    }


                }
            }

            .ContentItem-extra {
                align-self: center;
                min-width: 100px;

                .button-icon {
                    margin: 0 10px;
                }

            }


        }
    }
}
</style>
