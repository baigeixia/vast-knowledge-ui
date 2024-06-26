<template>
  <div class="message-view">
    <h1 class="message-head">消息设置</h1>
    <div class="item">
      <span class="title">私信设置</span>
      <div class="allow-send-message">
        <div class="setting-type">允许谁给我发私信</div>
        <el-radio-group v-model="radio">
          <el-radio :value="1">所有人</el-radio>
          <el-radio :value="2"> 我关注的人</el-radio>
          <el-radio :value="3">互相关注的人</el-radio>
          <el-radio :value="9">关闭 （不允许任何人给我发私信）</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref} from "vue"
const radio = ref(1)
</script>
  
<style lang="scss" scoped>
.message-view {
  box-sizing: border-box;
  min-height: 626px;

  .message-head {
    font-size: 2em;
    color: #252933;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding: 16px 20px;
    border-bottom: 1px solid #e4e6eb;
  }

  .item {
    padding: 1.1rem 2rem;
    // border-bottom: 1px solid #e4e6eb;

    .title {
      font-size: 1.2rem;
      color: #515767;
      width: 10rem;
    }

    .allow-send-message {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .setting-type {
        display: inline-block;
        font-size: 15px;
        // margin-right: 100px;
      }
    }
  }

}
</style>
  