<template>
    <div class="home-box">
        <AiLeft />
        aihome
    </div>
</template>

<script setup>
import { ref } from "vue"
import AiLeft from './components/AiLeft.vue'

</script>

<style lang="scss" scoped>
.home-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}
</style>
