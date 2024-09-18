<template>
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
</template>

<script setup>
import { onMounted, ref } from "vue"

const props = defineProps({
    dialoguserlist: {
        type: Array,
        required: true,
    },
})

</script>

<style lang="scss" scoped>
.dialog-list-box {
    max-height: 750px;
    padding-top: 20px;
    overflow-y: auto;

    .list-item-box {
        padding: 16px 20px;
        border-bottom: 1px solid #f3f3f5;

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
</style>
