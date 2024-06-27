<template>
    <div ref="guardMainBox" class="guard-main-box">
        <div class="overlay" v-if="showOverlay" @click="handleOverlayClick">
            <div class="popup" @click.stop>
                <p class="popup-title">即将离开本站，请注意账号财产安全</p>
                <p class="popup-link">{{ externalLink }}</p>
                <el-button class="popup-button" type="primary" @click="continueVisit">继续访问</el-button>
                <!-- <el-button class="popup-button" @click="cancelVisit">取消</el-button> -->
            </div>
        </div>
        <slot></slot>
    </div>
</template>
  
<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'

const showOverlay = ref(false)
const externalLink = ref('')
const guardMainBox = ref(null)

const checkLink = (event) => {
    const link = event.target.closest('a')
    if (link && !link.href.startsWith(window.location.origin)) {
        event.preventDefault()
        externalLink.value = link.href
        showOverlay.value = true
    }
}

const continueVisit = () => {
    window.location.href = externalLink.value
}

const cancelVisit = () => {
    showOverlay.value = false
}

const handleOverlayClick = () => {
    showOverlay.value = false
}

onMounted(() => {
    guardMainBox.value.addEventListener('click', checkLink)
})

onBeforeUnmount(() => {
    guardMainBox.value.removeEventListener('click', checkLink)
})
</script>
  
<style lang="scss" scoped>
.guard-main-box {
    position: relative;
    .overlay {

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .popup {
        max-width: 600px;
        width: 70%;
        box-sizing: border-box;
        border: 1px solid #e5e6eb;
        background: white;
        padding: 20px;
        border-radius: 5px;

        .popup-title {
            font-size: 18px;
            font-weight: 700;
        }

        .popup-link {
            padding: 16px 0 24px;
            border-bottom: 1px solid #e5e6eb;
            position: relative;
            color: gray;
            font-family: "PingFang SC";
            font-size: 17px;
        }

        .popup-button {
            float: right;
            margin-top: 15px;
        }
    }
}
</style>
  