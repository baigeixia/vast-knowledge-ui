<template>
    <el-skeleton style="padding-top: 24px;" :rows="5" animated :loading="endLoading">
        <div class="listcontent-box" v-for=" list in  notificationList" :key="list.statisticsTime">
            <div class="notificationList-Item">
                <div class="dateSplit">
                    <time :datetime="list.statisticsTime" :title="list.statisticsTime">
                        {{ list.statisticsTime }}
                    </time>
                </div>
                <div class="notificationList-Item-box" v-for=" info in list.notificationInfoList"
                    :key="info.statisticsTime">
                    <img class="notificationList-Item-icon" :src="extendicon">
                    <div class="list-itme-box">
                        <div class="list-itme-header " v-if="notificationType === 'comment'">
                            <div class="itme-content-box">
                                <div v-if="info.hide" class="list-itme-content ">
                                    {{ info.title }}
                                </div>
                                <div v-else class="list-itme-content list-feedback"
                                    @click="opcontentinfo(info.id, info.commentId)">
                                    {{ info.title }}
                                </div>
                                <div class="content-box-start">
                                    <span v-if="info.hide" class="username-hide">
                                        <div> {{ info.actors.username }}</div>
                                    </span>
                                    <user-info-popover v-else :author="info.actors">
                                        <template v-slot:reference>
                                            <span class="username" @click="opuserinfo(actors.id)">
                                                <div> {{ info.actors.username }}</div>
                                            </span>
                                        </template>
                                    </user-info-popover>
                                    <div v-if="info.hide">
                                        &nbsp;{{ info.actors.verb }} &middot;&nbsp;
                                    </div>
                                    <div v-else class="start-article" @click="opcontentinfo(info.id, info.commentId)">
                                        &nbsp;{{ info.actors.verb }} &middot;&nbsp;
                                    </div>
                                    <time>{{ info.actors.replyContentTime }}</time>
                                </div>
                                <div class="item-extendText">
                                    <div class="text-message"> {{ info.actors.replyContent }}</div>
                                    <el-image class="text-img" @click="handleImageClick" v-if="info.actors.image"
                                        :src="info.actors.image"></el-image>
                                </div>
                            </div>
                        </div>
                        <div class="list-itme-header" v-if="notificationType === 'digg'">
                            <div  class="list-itme-content list-feedback"
                                @click="opcontentinfo(info.attachInfo.id, info.attachInfo.commentId)">
                                {{ info.attachInfo.title }}
                            </div>
                            <div class="itme-content-box">
                                <div class="content-box-start">
                                    <div v-for="(actor, index) in info.actors.slice(0, 10)" :key="actor.id">
                                        <user-info-popover  :author="actor">
                                            <template v-slot:reference>
                                                <span class="username" @click="opuserinfo(actor.id)">
                                                    {{ actor.username }}
                                                    <span v-if="index < info.actors.length - 1 && index < 9">、</span>
                                                </span>
                                            </template>
                                        </user-info-popover>
                                    </div>
                                    <span class="people-list" @click="opdialogTableVisible(info.actors)"
                                        v-if="info.mergeCount > 3">
                                        &nbsp;等{{ info.mergeCount }}人&nbsp;
                                    </span>
                                    <div>&nbsp;{{ info.verb }} &middot;&nbsp; </div>
                                    <time :datetime="info.actors.length" :title="info.commentEndTime">
                                        {{ info.commentEndTime }}</time>
                                </div>
                            </div>
                        </div>
                        <div class="list-itme-header" v-if="notificationType === 'follow'">
                            <div class="itme-content-box">
                                <div class="list-itme-content">
                                    新增关注 &middot;
                                    <time>{{ info.followEndTime }}</time>
                                </div>
                                <div class="content-box-start">
                                    <div v-for="(actor, index) in info.actors" :key="actor.id">
                                        <user-info-popover :author="actor">
                                            <template v-slot:reference>
                                                <span class="username" @click="opuserinfo(actor.id)">
                                                    {{ actor.username }}
                                                    <span v-if="index < info.actors.length - 1 && index < 9">、</span>
                                                </span>
                                            </template>
                                        </user-info-popover>
                                        <!-- index从0开始，所以判断index小于9时才显示分隔符 -->
                                    </div>
                                    <span class="people-list" @click="opdialogTableVisible(info.actors)"
                                        v-if="info.mergeCount > 10">
                                        &nbsp;等{{ info.mergeCount }}人&nbsp;
                                    </span>
                                    <div>&nbsp;{{ info.verb }} &nbsp; </div>
                                </div>
                            </div>
                        </div>
                        <div class="list-itme-header" v-if="notificationType === 'system'">
                            <div class="itme-content-box">
                                <div class="list-itme-content">
                                    {{ list.verbType }} &middot;
                                    <time>{{ info.commentEndTime }}</time>
                                </div>
                                <div class="list-itme-content">
                                    <div class="itme-content-title list-feedback"
                                        @click="opcontentinfo(info.attach_info.id)">
                                        《{{ info.attach_info.title }}》</div>
                                </div>
                                <div class="list-itme-content">
                                    <div class="replyMesg">
                                        {{ info.replyMesg.contentText }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-skeleton style="padding-top: 24px;" :rows="5" animated :loading="upLoading"></el-skeleton>
    </el-skeleton>
    <el-dialog v-if="dialogTableVisible" v-model="dialogTableVisible" width="700" :lock-scroll="true" top="2vh">
        <template #header="{ titleId, titleClass }">
            <h4 :id="titleId" :class="titleClass">
                <div style="height: 20px;"></div>
            </h4>
        </template>
        <div class="dialog-list-box" v-if="dialoguserlist">
            <div class="list-item-box" v-for=" actor in dialoguserlist" :key="actor.id">
                <div class="ContentItem">
                    <div class="ContentItem-image">
                        <user-info-popover :author="actor">
                            <template v-slot:reference>
                                <img class="image-box" :src="actor.avatar" alt="avatar" />
                            </template>
                        </user-info-popover>
                        <!-- <img class="image-box" :src="actor.avatar" alt="avatar" /> -->
                    </div>
                    <div class="ContentItem-head">
                        <div class="UserItem-title">
                            <user-info-popover :author="actor">
                                <template v-slot:reference>
                                    <span class="UserItem-title-username" @click="opuserinfo(actor.id)">
                                        {{ actor.username }}
                                    </span>
                                </template>
                            </user-info-popover>
                        </div>
                        <div class="ContentItem-status"></div>
                    </div>
                    <div class="ContentItem-extra">
                        <el-button type="primary" @click="notificationS.fanMsg(actor.id, actor.username)"><i
                                class="bi bi-plus-lg"></i>关注</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
    <el-image-viewer v-if="showImageViewer" :url-list="[imgPreviewUrl]" @close="showImageViewerclose"
        :hide-on-click-modal="true">
    </el-image-viewer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import UserInfoPopover from '@/components/UserInfoPopover.vue'
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()
import { useRouter } from 'vue-router';
const router = useRouter();
const dialogTableVisible = ref(false)
const dialoguserlist = ref([])

// const UserInfoPopover = () => import('@/components/UserInfoPopover.vue');


const opuserinfo = (id) => {
    console.log('id', id);
}
const showImageViewer = ref(false)
const imgPreviewUrl = ref('');

const showImageViewerclose = () => {
    document.body.style.overflow = 'auto';
    showImageViewer.value = false
}

const handleImageClick = (event) => {
    const imgSrc = event.target.src;
    console.log(imgSrc);
    if (imgSrc) {
        document.body.style.overflow = 'hidden';
        imgPreviewUrl.value = imgSrc
        showImageViewer.value = true
    }
}

const opcontentinfo = (id, commentId) => {
    console.log('contentid', id);
    console.log('commentId', commentId);
    // let routedata = router.resolve({
    //     path: `/post/${id}`,
    //     query: {
    //         notificationId: commentId
    //     }
    // })
    // 构建路由数据
    let routedata;
    if (commentId == null) {
        // commentId 为 null 或 undefined 时，不包含 query 参数
        routedata = router.resolve({
            path: `/post/${id}`
        });
    } else {
        // commentId 有值时，包含 query 参数
        routedata = router.resolve({
            path: `/post/${id}`,
            query: {
                notificationId: commentId
            }
        });
    }

    window.open(routedata.href, '_blank')
}

const opreportinfo = (id) => {
    console.log('report', id);
}
const opdialogTableVisible = (userlist) => {
    dialogTableVisible.value = true
    dialoguserlist.value = userlist
}

const props = defineProps({
    notificationList: {
        type: Object,
        required: true
    },
    extendicon: {
        type: String,
        required: true
    },
    endLoading: {
        type: Boolean,
        required: false
    },
    upLoading: {
        type: Boolean,
        required: false
    },
    notificationType: {
        type: String,
        required: false
    }
});


// onMounted(() => {
//     console.log(props.notificationList);
// })

const formattedTime = (time) => {
    return time.slice(11, 16)
}

</script>

<style lang="scss" scoped>
.dialog-list-box {
    max-height: 750px;
    padding-top: 20px;
    overflow-y: auto;

    .list-item-box {
        padding: 16px 20px;
        border-top: 1px solid #e6e6e7;
        border-bottom: 1px solid #e6e6e7;

        .ContentItem {
            display: flex;
            align-content: center;

            .ContentItem-image {
                float: left;
                margin-right: 16px;

                .image-box {
                    cursor: pointer;

                    box-sizing: border-box;
                    margin: 0px;
                    min-width: 0px;
                    max-width: 100%;
                    background-color: rgb(255, 255, 255);
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;

                }

            }

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

                    .UserItem-title-username {
                        cursor: pointer;
                    }
                }
            }

            .ContentItem-extra {
                align-self: center;
            }
        }
    }
}


.listcontent-box {
    box-sizing: border-box;
    margin-bottom: 5px;
    border-bottom: 1px solid #dcdddf;
    /* 确保内外边距不会影响宽度计算 */



    .notificationList-Item {

        .notificationList-Item-box {
            padding: 5px 35px;
            display: flex;

            .notificationList-Item-icon {
                -webkit-box-flex: 0;
                border-radius: 50%;
                flex: none;
                height: 34px;
                margin-right: 12px;
                margin-top: 3px;
                width: 34px;
            }

            .list-itme-box {
                // display: block;
                display: inline-block;
                flex: 1;

                .header-comment {
                    display: block;
                }

                .list-itme-header {
                    // display: flex;
                    color: #8a8d94;
                    font-size: 14px;
                    line-height: 1.23077;

                    .list-feedback {
                        cursor: pointer;
                        display: inline-block;

                    }

                    .list-feedback:hover {
                        color: #09408e;

                    }

                    .itme-content-box {
                        margin: 0 0 20px 0;

                        .content-box-start {
                            display: flex;
                            margin: 10px 0;


                            .start-article {
                                cursor: pointer;
                            }

                            .start-article:hover {
                                color: #afb2b9;
                            }

                            .username {
                                cursor: pointer;
                                color: #191b1f;
                                font-weight: 600
                            }

                            .username-hide {
                                color: #191b1f;
                                font-weight: 600
                            }

                            .people-list-hide {
                                margin: 0 5px;
                            }

                            .people-list {
                                margin: 0 5px;
                                cursor: pointer;
                            }

                            .people-list:hover {
                                color: #09408e;
                            }

                            .username:hover {
                                color: #09408e;
                            }
                        }

                        .item-extendText {
                            color: #535861;
                            font-size: 15px;
                            line-height: 1.43;
                            margin: 4px 0 6px;
                            padding-left: 10px;
                            border-left: 3px solid #9196a1;

                            .text-img {
                                width: 100px;
                                height: 100px;
                                cursor: zoom-in;

                            }
                        }
                    }
                }

                .list-itme-content {
                    color: #0f1013;
                    font-size: 14px;
                    line-height: 1.42857;
                    margin-top: 4px;
                    font-weight: 600;

                    .itme-content-title {
                        font-size: 16px;

                    }

                }



                .replyMesg {
                    display: inline-block;
                    margin-top: 5px;
                    // cursor: pointer; 

                }

                .replyMesg:hover {
                    color: #09408e;
                }
            }
        }



        .dateSplit {
            display: flex;
            font-size: 14px;
            font-weight: 600;
            padding: 24px 32px 0;
            line-height: 2rem;
        }
    }
}
</style>
