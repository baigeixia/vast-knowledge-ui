<template>
  <div class="message-view">
    <h1 class="message-head">消息设置</h1>
    <div class="item">
      <span class="title">私信设置</span>
      <div class="allow-send-message">
        <div class="setting-type">允许谁给我发私信</div>
        <el-radio-group v-model="letter" @change="letterchange">
          <el-radio :value="1">所有人</el-radio>
          <el-radio :value="2"> 我关注的人</el-radio>
          <el-radio :value="3">互相关注的人</el-radio>
          <el-radio :value="9">关闭 （不允许任何人给我发私信）</el-radio>
        </el-radio-group>
      </div>
      <div class="allow-send-message">
        <div class="setting-type">是否允许推荐我给好友</div>
        <el-radio-group v-model="isrecommend" @change="isrecommendchange">
          <el-radio :value="1">是（默认）</el-radio>
          <el-radio :value="2">否</el-radio>
        </el-radio-group>
      </div>
      <div class="allow-send-message">
        <div class="setting-type">是否允许给我推荐好友</div>
        <el-radio-group v-model="isfriend" @change="isfriendchange">
          <el-radio :value="1">是（默认）</el-radio>
          <el-radio :value="2">否</el-radio>
        </el-radio-group>
      </div>
      <div class="allow-send-message">
        <div class="setting-type">是否分享页面显示头像</div>
        <el-radio-group v-model="isdisplayimage" @change="isdisplayimagechange">
          <el-radio :value="1">是（默认）</el-radio>
          <el-radio :value="2">否</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

const pageTitle = ref('消息设置');
onMounted(async() => {
  document.title = pageTitle.value;
  await userinfoAppStores.getusergetLocalInfo()

  letter.value = userinfoAppStores.userLocalinfo.isSendMessage
  isrecommend.value = userinfoAppStores.userLocalinfo.isRecommendMe
  isfriend.value = userinfoAppStores.userLocalinfo.isRecommendFriend
  isdisplayimage.value = userinfoAppStores.userLocalinfo.isDisplayImage
});
const letter = ref(0)
const isrecommend = ref(0)
const isfriend = ref(0)
const isdisplayimage = ref(0)

const letterchange=()=>{
  console.log("letter 变化了",letter.value);
  userinfoAppStores.upuserConfig(1,letter.value)
}
const isrecommendchange=()=>{
  console.log("isrecommend 变化了",isrecommend.value);
  userinfoAppStores.upuserConfig(2,isrecommend.value)

}
const isfriendchange=()=>{
  console.log("isfriend 变化了",isfriend.value);
  userinfoAppStores.upuserConfig(3,isfriend.value)

}
const isdisplayimagechange=()=>{
  console.log("isdisplayimage 变化了",isdisplayimage.value);
  userinfoAppStores.upuserConfig(4,isdisplayimage.value)

}
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
  