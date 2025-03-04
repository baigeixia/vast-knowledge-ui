<template>
    <el-popover placement="bottom" :show-after="300" :show-arrow="false" popper-class="user-info-popup"
        @show="userpopovershow" width="360" :offset="35">
        <!-- 插槽名为 reference 的具名插槽 -->
        <template v-slot:reference>
            <slot name="reference"></slot>
        </template>

        <div class="popover-content">
            <div class="item loading-dots" v-if="isLoading">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div v-else>
                <div class="info-row">
                    <!-- <div class="info-avatar"> -->
                    <RouterLink :to="`/user/${authorInfor.id}`" class="info-avatar">
                        <img :src="authorInfor?.image" alt="avatar" class="avatar" />
                    </RouterLink>
                    <!-- <img :src="author?.avatar" alt="avatar" class="avatar" @click="touserinfor(author.id)" /> -->
                    <!-- </div> -->
                    <div class="info">
                        <div class="info-name" :title="authorInfor?.username"> {{ authorInfor?.name }}</div>
                        <!-- <div class="info-position" :title="authorInfor?.position"> {{ authorInfor?.position }}</div> -->
                        <div class="info-position" :title="authorInfor?.position"> {{ authorInfor?.introduction }}</div>
                        <div class="info-location" v-if=" authorInfor.location">
                            <div class="item-name">所在地:</div>
                            <div class="item-count">{{ authorInfor.location}}</div>
                        </div>
                    </div>
                    <div class="meta-row">
                        <div class="item">
                            <div class="item-name">粉丝</div>
                            <div class="item-count">{{ authorInfor?.fans ?? 0 }}</div>
                        </div>
                        <div class="item">
                            <div class="item-name">关注者</div>
                            <div class="item-count">{{ authorInfor?.follows ?? 0 }}</div>
                        </div>
                   
                    </div>
                    <div class="operate-btn">
                        <el-button @click="followedButton(authorInfor.id, authorInfor.name)"
                            :type="isfollow ? 'info' : 'primary'" v-if="isLoadUser">
                            <i class="bi bi-dash-lg " v-if="isfollow">
                                <span class="button-icon "> 取消关注</span></i>
                            <i class="bi bi-plus-lg" v-else>
                                <span class="button-icon">关注</span></i>
                        </el-button>
                        <!-- <el-button class="button-ui" type="primary"   @click="focusonclick(authorInfor.id, authorInfor.username)">关注</el-button> -->
                        <el-button class="button-ui" @click="router.push(`/notifications/im/${authorInfor.id}`)"
                            v-if="isLoadUser">私信</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-popover>
</template>
  
<script setup>
import { nextTick, onMounted, ref } from 'vue';
import useUserStore from "@/stores/admin/user";
const userS = useUserStore()
import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()
import { useRouter } from 'vue-router';
const router = useRouter();
import { getUserid } from '@/utils/auth'
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const isfollow = ref(false)
const isLoadUser = ref(false)

const followedButton = (id, name) => {
    notificationS.fanMsg(id, name)
    isfollow.value = !isfollow.value
}

const props = defineProps({
    author: {
        type: Object,
        required: false
    },
    authorid: {
        type: String || Number,
        required: false
    },
});

const isLoading = ref(false)
const authorid = ref('')
const authorInfor = ref({})

onMounted(async () => {
    let id = props.authorid ? props.authorid : props.author?.id
    authorid.value = props.author?.id || id
    isLoadUser.value = getUserid() ? getUserid() != id :false

})
const userpopovershow = async () => {
    console.log(authorid.value);
    if (authorid.value) {
        if (isLoading.value) return
        try {
            isLoading.value = true
            const authordata = await userS.getUserInfoPo(authorid.value)
            if (isLoadUser.value) {
                const relationData = await userinfoAppStores.getInfoRelation(authorid.value)
                if(relationData){
                    isfollow.value = relationData.follow
                }
            }
            if (authordata) {
                authorInfor.value = authordata.data
            }
            nextTick(() => {
                isLoading.value = false
            })
        } catch (error) {
            console.error('Error loading more data:', error);
        } finally {
            isLoading.value = false
        }
    }
}

</script>
  
<style  lang="scss" scoped>
.user-info-popup {
    margin-top: 20px;

    .loading-dots {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 80px;

        .dot {
            width: 10px;
            height: 10px;
            background-color: #1e80ff;
            border-radius: 50%;
            margin: 0 5px;
            animation: dot-bounce 1s infinite ease-in-out alternate;
        }

        @keyframes dot-bounce {
            0% {
                transform: translateY(0);
            }

            100% {
                transform: translateY(-10px);
            }
        }

        .dot:nth-child(2) {
            animation-delay: 0.1s;
        }

        .dot:nth-child(3) {
            animation-delay: 0.2s;
        }
    }

    .popover-content {
        .info-row {
            // display: flex;
            // align-items: center;
            position: relative;
            min-height: 42px;

            .info {
                font-size: 17px;
                border-bottom: 1px solid #e5e6eb;
                margin-left: 85px;

                .info-name {
                    color: #000;
                    min-width: 100px;
                    max-width: 200px;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 600;
                }

                .info-position {
                    color: gray;
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .info-location{
                    margin: 5px 0 5px 0;
                display: flex;
                align-items: center;
                // justify-content: center;
                
                    font-size: 10px;
                }
            }

            .info-avatar {
                cursor: pointer;
                width: 68px;
                height: 68px;
                position: absolute;
                top: -40px;

                .avatar {
                    width: 100%;
                    border-radius: 4px;
                }
            }



            .meta-row {
                padding: 8px 16px;
                display: flex;
                align-content: center;
                justify-content: space-between;
                text-align: center;

                .meta-row-itmes {
                    display: flex;
                }

                .item {
                    flex: 1;
                    line-height: 1.6;
                    color: #8a919f;

                    .item-count {
                        font-weight: 750;
                        color: #252933;
                        font-size: 16px;
                    }
                }
            }

            .operate-btn {
                display: flex;
                align-content: center;
                justify-content: center;
                padding: 0 40px 0 40px;

                .button-ui {
                    flex: 1;
                }
            }
        }


    }

    &.small-popup {
        width: 120px;
        height: 80px;
    }

    &:not(.small-popup) {
        width: 380px;
        height: auto;
    }

    &.show {
        display: block;
        /* 根据需要显示 */
    }


}

.user-info-popover .el-popover__title {
    display: none;
}
</style>
  