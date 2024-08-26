<template>
    <div class="listcontent-box" v-for=" list in  notificationList" :key="list.statisticsTime">
        <div class="notificationList-Item">
            <div class="dateSplit">
                <time :datetime="list.statisticsTime" :title="list.statisticsTime">
                    {{ list.statisticsTime }}
                </time>
            </div>
            <div class="notificationList-Item-box" v-for=" info in list.notificationinfo" :key="info.id">
                <img class="notificationList-Item-icon" :src="extendicon">
                <div class="list-itme-box">
                    <div class="list-itme-header " v-if="notificationType === 'comment'">
                        <div class="list-itme-content list-feedback" @click="opcontentinfo(info.commentid)">
                            {{ info.attach_info.title }}
                        </div>
                        <div class="itme-content-box" v-for=" actor in info.actors" :key="actor.id">
                            <div class="content-box-start">
                                <user-info-popover :author="actor">
                                    <template v-slot:reference>
                                        <span class="username" @click="opuserinfo(actor.id)">
                                            <div> {{ actor.username }}</div>
                                        </span>
                                    </template>
                                </user-info-popover>
                                <div>&nbsp;{{ info.verb }} &middot;&nbsp; </div>
                                <time>{{ actor.replycontenttime }}</time>
                            </div>
                            <div class="item-extendText">
                                {{ actor.replycontent }}
                            </div>
                        </div>
                    </div>
                    <div class="list-itme-header" v-if="notificationType === 'digg'">
                        <div class="list-itme-content list-feedback" @click="opcontentinfo(info.commentid)">
                            {{ info.attach_info.title }}
                        </div>
                        <div class="itme-content-box">
                            <div class="content-box-start">
                                <div v-for="(actor, index) in info.actors.slice(0, 10)" :key="actor.id">
                                    <user-info-popover :author="actor">
                                        <template v-slot:reference>
                                            <span class="username" @click="opuserinfo(actor.id)">
                                                {{ actor.username }}
                                                <span v-if="index < info.actors.length - 1 && index < 9">、</span>
                                            </span>
                                        </template>
                                    </user-info-popover>
                                </div>
                                <span class="people-list" @click="opdialogTableVisible(info.actors)"
                                    v-if="info.actors.length > 10">
                                    &nbsp;等{{ info.actors.length }}人&nbsp;
                                </span>
                                <div>&nbsp;{{ info.verb }} &middot;&nbsp; </div>
                                <time :datetime="info.commentEndTime" :title="info.commentEndTime">{{
                                    info.commentEndTime.slice(11, 16) }}</time>
                            </div>
                        </div>
                    </div>
                    <div class="list-itme-header" v-if="notificationType === 'follow'">
                        <div class="itme-content-box">
                            <div class="list-itme-content">
                                {{ info.focuson ? '新增关注' : '取消关注' }} &middot;
                                <time>{{ info.commentEndTime }}</time>
                            </div>
                            <div class="content-box-start">
                                <div v-for="(actor, index) in info.actors.slice(0, 10)" :key="actor.id">
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
                                    v-if="info.actors.length > 10">
                                    &nbsp;等{{ info.actors.length }}人&nbsp;
                                </span>
                                <div>&nbsp;{{ info.focuson ? '新增' : '取消' }}{{ verb }} &nbsp; </div>
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
                                <div class="itme-content-title list-feedback" @click="opcontentinfo(info.attach_info.id)">《
                                    {{ info.attach_info.title }} 》</div>
                            </div>
                            <div class="list-itme-content">
                                <div class="replyMesg" @click="opreportinfo(info.id)"> {{ info.replyMesg.contentText }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                        <el-button type="primary"><i class="bi bi-plus-lg"></i>关注</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import UserInfoPopover from '@/components/UserInfoPopover.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const dialogTableVisible = ref(false)
const dialoguserlist = ref([])

const opuserinfo = (id) => {
    console.log('id', id);
}

const opcontentinfo = (id) => {
    console.log('contentid', id);
    let routedata = router.resolve({
        path: '/post/16',
        query: {
            notificationId: '7'
        }
    })

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
    verb: {
        type: String,
        required: false
    },
    notificationType: {
        type: String,
        required: false
    }
});



// const formattedTime = computed((oldValue) => {
//   return  oldValue.slice(11, 16)
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
    border-bottom: 1px solid #9196a1;
    /* 确保内外边距不会影响宽度计算 */



    .notificationList-Item {

        .notificationList-Item-box {
            padding: 20px 32px;
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

                            .username {
                                cursor: pointer;
                            }

                            .people-list {
                                margin: 0 5px;
                                cursor: pointer;
                            }

                            .people-list:hover {
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
                    margin-top: 5px;
                    cursor: pointer;

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
