<template>
    <el-popover placement="bottom" :show-after="300" :show-arrow="false" popper-class="user-info-popup"
        :width="isLoading ? 120 : 360" :offset="35">
        <!-- 插槽名为 reference 的具名插槽 -->
        <template v-slot:reference>
            <slot name="reference"></slot>
        </template>
        <div class="loading-dots" v-if="userS.userInfoPoLoading">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div class="popover-content" v-else>
            <div class="info-row">
                <div class="info-avatar">
                    <img :src="userS.userInfoPo.avatar" alt="avatar" class="avatar" />
                </div>
                <div class="info-name">{{ userS.userInfoPo.username }}</div>
            </div>
            <div class="meta-row">
                <div class="item">
                    <div class="item-count">111</div>
                    <div class="item-name">回答</div>
                </div>
                <div class="item">
                    <div class="item-count">0</div>
                    <div class="item-name">文章</div>
                </div>
                <div class="item">
                    <div class="item-count">371</div>
                    <div class="item-name">关注者</div>
                </div>
            </div>
            <div class="operate-btn">
                <el-button class="button-ui" type="primary">关注</el-button>
                <el-button class="button-ui">私信</el-button>
            </div>
        </div>
    </el-popover>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import useUserStore from "@/stores/admin/user";
const userS = useUserStore()

const props = defineProps({
    authorid: {
        type: String,
        required: true
    }
});
const isLoading = ref(false)

// onMounted(() => {
//     let id = props.authorid
//     if (id) {
//         userS.getUserInfoPo(id)
//     }
// })

const isLoadingop = () => {
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
        .operate-btn {
            display: flex;
            align-content: center;
            justify-content: center;
            padding: 0 40px 0 40px;

            .button-ui {
                flex: 1;
            }
        }

        .meta-row {
            padding: 8px 16px;
            display: flex;
            align-content: center;
            justify-content: space-between;
            text-align: center;

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

        .info-row {
            display: flex;
            align-items: center;
            position: relative;
            border-bottom: 1px solid #e5e6eb;
            min-height: 42px;

            .info-avatar {
                width: 68px;
                height: 68px;
                position: absolute;
                top: -40px;

                .avatar {
                    width: 100%;
                }
            }

            .info-name {
                font-size: 17px;
                max-width: 200px;
                box-sizing: border-box;
                margin-left: 85px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
  