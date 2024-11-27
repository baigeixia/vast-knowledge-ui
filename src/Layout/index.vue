<template>
    <el-container class="bo-wen">
        <el-header class="main-header" :class="{ 'hidden': ishide }">
            <HeaderMain></HeaderMain>
        </el-header>
        <ExternalLinkGuard class="guard-box">
            <div class="header-placeholder"></div>
            <el-main class="container-main">
                <RouterView></RouterView>
            </el-main>
        </ExternalLinkGuard>

        <div class="global-component-box">
            <div class="suspension-panel">
                <el-tooltip effect="light" content="建议反馈" placement="left">
                    <el-button @click="feedbackdialog = true" link class="btn meiqia-btn"><i
                            class="bi bi-send-exclamation"></i></el-button>
                </el-tooltip>
                <el-button v-if="y > 60" link class="btn meiqia-btn fade-in" @click="totop"><i
                        class="bi bi-chevron-bar-up"></i>
                </el-button>
            </div>
        </div>

        <el-dialog v-model="feedbackdialog" title="反馈 & 建议" width="500" :before-close="handleClose">
            <el-input :autosize="{ minRows: 10, maxRows: 20 }" resize="none" type="textarea" v-model="commentinput"
                placeholder="宝贵建议填写处 . . ." />
            <template #footer>
                <div class="dialog-footer">
                    <el-button :disabled="commentinput.length < 1" type="primary" @click="sendpropose">
                        发送
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <Login />
    </el-container>
</template>

<script setup>
import { ref, watch, reactive } from "vue"
import HeaderMain from './components/HeaderMain.vue'
import ExternalLinkGuard from '@/Layout/components/ExternalLinkGuard.vue';
import { useScroll } from '@vueuse/core'
import { ishide } from '@/components/Publicvariables'
import Login from '@/views/login/Login.vue'

import feedbackAppStore from "@/stores/user/feedback";
const feedbackAppStores = feedbackAppStore()


const { y } = useScroll(window)


import {socket } from '@/utils/socketclient'

socket.on("new_like", (data) => {
console.log("new_like data",data);
})


const sendpropose = () => {
    feedbackdialog.value = false
    console.log('意见提交', commentinput.value);
    //发消息
    feedbackAppStores.userFeedbackSeve(commentinput.value)
    commentinput.value = ''

}



const handleClose = () => {
    feedbackdialog.value = false
    commentinput.value = ''
}


const feedbackdialog = ref(false);
const commentinput = ref('');
const threshold = 300;
let maxY = 0;
let currentY = 0;

watch(y, (newValue) => {
    if (newValue > 126) {
        if (newValue > currentY) {
            maxY = newValue
            ishide.value = true;
        } else {
            if (Math.abs(maxY - newValue) > threshold) {
                ishide.value = false;
            }
        }
        currentY = newValue;
    } else {
        ishide.value = false;
    }
});

const totop = () => {
    y.value = 0
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
    padding-bottom: 0;
}

:deep(.el-textarea__inner) {
    min-height: 85px;
    display: block;
    /* 禁止用户手动调整大小 */
    // resize: none;
    /* 根据需要调整内边距 */
    padding: 10px;
    outline: none;
}

.bo-wen {
    overflow: hidden;
    min-height: 925px;
    background-color: #f2f3f5;
    min-width: 1100px;

    .guard-box {
       :deep(a) {
            color: #1e80ff;
            margin: 0 2px;
        }
    }

    .global-component-box {

        .suspension-panel {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-end;
            position: fixed;
            right: 2rem;
            bottom: 2rem;
            z-index: 1000;

            .btn {
                margin: 1rem 0 0;
                padding: 0;
                width: 2.8rem;
                height: 2.8rem;
                line-height: 1;
                color: #909090;
                background-color: #ffffff;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(50, 50, 50, .04);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

            }

            .btn:hover {
                background-color: #f2f6fc;
                box-shadow: 0 0 5px #dddddd;
            }

            .meiqia-btn {
                font-size: 25px;
                color: #007fff;
            }
        }
    }

    .main-header {
        display: flex;
        align-items: center;
        // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        box-shadow:0px 1px 2px rgba(0, 0, 0, 0.2);
        --el-header-padding: 0;
        background-color: #ffffff;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        transition: top 0.3s ease;


        .guard {
            a {
                color: #007fff;
            }
        }
    }

    .hidden {
        top: -70px;
        /* 将头部移出视图 */
    }

    .header-placeholder {
        height: 60px;


    }

    .container-main {
        margin: 0 auto;
        max-width: 1200px;
        display: flex;
        padding: 20px 0;
        border-radius: 5px;
        min-height: calc(100vh - 90px);
        overflow-y: hidden;

    }
}
</style>
