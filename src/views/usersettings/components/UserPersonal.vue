<template>
    <div class="presonal-view">
        <div class="nav-text">
            个人资料
        </div>
        <div class="user-infos">
            <div class="info-input">
                基本信息
            </div>
            <div class="avatar-input">
                上传头像
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
</script>

<style lang="scss" scoped>
.presonal-view {
    .nav-text {

        color: #252933;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        padding: 16px 20px;
        border-bottom: 1px solid #e4e6eb;

    }

    .user-infos {
            display: flex;

            .info-input {
                min-width: 240px;
                width: calc(100% - 346px);
            }

            .avatar-input {
                flex: 1;
                padding-top: 20px;
                padding-left: 20px;
                padding-right: 20px;
            }

        }

}
</style>
