<template>
    <el-container class="search-container">
        <el-header class="search-header" :class="{'search-top':istop}" >
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
import { ref , onMounted, watchEffect } from "vue"
import { useScroll } from '@vueuse/core'
const searchHeaderTop = ref('80px');

var mainHeader=null;
onMounted(()=>
    mainHeader = document.querySelector('.main-header')
)
const istop=ref(false)
watchEffect(() => {
    if(mainHeader){
        if (mainHeader.hasAttribute('hidden')) {
        istop.value=true
//   const top = parseInt(mainHeader.style.top);
//   if (top < 0) {
//     // 添加 top 类
//     istop.value=true
//   } else {
//     // 移除 top 类
//     istop.value=false
//   }
}
    }
    
});
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
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;

    .search-header {
        position: fixed;
        top: 5rem;
        // width: 100%;
        width: 800px;
        margin: 0 auto;
        border-bottom: 3px solid #f2f3f5;
    }

    .search-top {
      transform: translate3d(0, -5rem, 0);
    }

    .search-main {
        margin-top: 60px;
        width: 100%;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }
}
</style>
