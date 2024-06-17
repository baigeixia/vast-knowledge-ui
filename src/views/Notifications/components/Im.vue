<template>
    <el-container class="im-box">
      <el-aside class="im-left">
        <div class="left-herder-search">
          <el-input v-model="searchinput" style="width: 240px" placeholder="搜索联系人" suffix-icon="Search"
            @change="searchchange" />
        </div>
        <div class="contacts-list">
          contacts
        </div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const searchinput = ref('')
const emit = defineEmits(['data-loaded']);

const searchchange = () => {
  console.log(searchinput.value);
}
// 使用组合式API中的 onMounted 钩子
onMounted(() => {
  setTimeout(() => {
    // 数据加载完成后触发事件通知父组件
    console.log('data-loaded');
    emit('data-loaded');
  }, 2000);
});
</script>

<style lang="scss" scoped>
.im-box {
  height: 100%;
  .im-left {
    border-right: 1px solid #dcdfe6;
    .left-herder-search{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }
}
</style>
