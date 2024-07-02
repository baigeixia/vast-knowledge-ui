<template>
    <el-container class="search-container">
        <el-header class="search-header">
            header
        </el-header>
        <el-main class="search-main">
            main
        </el-main>
    </el-container>
    <!-- <div>
    <h1>Search Results</h1>
    <p>Query: {{ query }}</p>
    <p>From SEO: {{ fromSeo }}</p>
    <p>From History: {{ fromHistory }}</p>
    <p>From Suggest: {{ fromSuggest }}</p>
    <p>Type: {{ type }}</p>
  </div> -->
</template>

<script setup>
import { ref } from "vue"
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)

const props = defineProps({
    query: String,
    fromSeo: Number,
    fromHistory: Number,
    fromSuggest: Number,
    type: Number
});
</script>

<style lang="scss" scoped>
.search-container {
    max-width: 700px;
    margin: 0 auto;
    background-color: #fff;

    .search-header {
        position: fixed;
        top: 0;
        width: 700px;
        margin: auto;
        border-bottom: 3px solid #f2f3f5;
    }

    .search-main {
        margin-top: 60px;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }
}
</style>
