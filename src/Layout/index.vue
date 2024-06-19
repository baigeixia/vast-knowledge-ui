<template>
    <el-container class="bo-wen">
        <el-header class="main-header" :class="{ 'hidden':  ishide }">
            <HeaderMain></HeaderMain>
        </el-header>
        <div class="header-placeholder"></div>
        <el-main class="container-main">
            <RouterView></RouterView>
        </el-main>
        <div class="global-component-box">
            <div class="suspension-panel">
                <el-tooltip effect="light" content="建议反馈" placement="left">
                    <el-button link class="btn meiqia-btn"><i class="bi bi-send-exclamation"></i></el-button>
                </el-tooltip>
                <el-button v-if="y > 60" link class="btn meiqia-btn fade-in" @click="totop"><i
                        class="bi bi-chevron-bar-up"></i></el-button>
            </div>
        </div>
    </el-container>
</template>

<script setup>
import { ref, watch } from "vue"
import { RouterView } from "vue-router"
import HeaderMain from './components/HeaderMain.vue'
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)

const ishide = ref(false);
const threshold = 378;
let maxY = 0;
let currentY = 0;

// let var1 = 0;

// watch(y, (newValue) => {
//     if (newValue > 126) {

//         currentY=newValue
//     } else {
//         ishide.value = false;
//     }
// });


watch(y, (newValue) => {
    if (newValue > 126) {
        if (newValue > currentY) {
            maxY=newValue
            ishide.value = true;
        }else{
           if( Math.abs(maxY-newValue) > threshold){
            ishide.value = false;
           }
        }
        currentY = newValue;
    } else {
        ishide.value = false;
    }
});

const totop = () => {
    console.log(y.value);
    y.value = 0
}
</script>

<style lang="scss" scoped>
.bo-wen {
    overflow: hidden;
    min-height: 925px;
    background-color: #f2f3f5;
    min-width: 1100px;

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
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        --el-header-padding: 0;
        background-color: #ffffff;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        transition: top 0.3s ease;
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
        width: 1200px;
        display: flex;
        padding: 20px 0;
        border-radius: 5px;

    }
}
</style>
