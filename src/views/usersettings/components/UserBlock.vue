<template>
  <div class="block-view">
    <div class="block-headr">
      <div class="byte-tab-ba" :style="{ transform: `translateX(${type == 1 ? 16 : 140}px)` }"></div>
      <h1 class="block-head " :class="{ 'is-active': type == 1 }" @click="switchtype(1)">屏蔽作者</h1>
      <h1 class="block-head" :class="{ 'is-active': type == 2 }" @click="switchtype(2)">屏蔽标签</h1>
    </div>
    <el-skeleton style="margin-top: 10px;" :rows="3" animated :loading="loading">
      <template #template>
      </template>
        <div class="block-author" v-if="type == 1">
          <el-card class="list-li" shadow="hover">
            <div class="avatar-wrapper">
              <div class="avatar">
                <img class="avatar-img"
                  src="https://p9-passport.byteacctimg.com/img/user-avatar/47ca06131d7d1ff6bace81267cebad79~100x100.awebp"
                  alt="">
              </div>
            </div>
            <div class="username-col">
              <div class="name">程序媛班班</div>
              <div class="dislike-time">屏蔽时间:2024-06-26</div>
            </div>
            <el-button type="primary">取消屏蔽</el-button>
          </el-card>
        </div>

        <div class="block-label" v-if="type == 2">
          标签
        </div>
    </el-skeleton>
  </div>
</template>
  
<script setup>
import { ref } from "vue"
const type = ref(1)
const loading = ref(false)

const switchtype = (typenmber) => {
  type.value = typenmber
}
</script>
  
<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 0;
}

.block-author {
  display: flex;
  flex-wrap: wrap;

  .list-li {

    margin: 10px 20px 10px 0;
    border: 1px solid #e4e6eb;
    width: 163px;
    height: 186px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;

    .avatar-wrapper {
      display: flex;
      font-size: 0;
      margin: 1rem 0 .5rem;
      justify-content: center;

      .avatar {
        height: 4rem;
        width: 4rem;
        border-radius: 50px;

        .avatar-img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: #f7f8fa;
        }
      }
    }

    .username-col {
      text-align: center;
      margin-bottom: 5px;


      .name {
        font-weight: 400;
        font-size: 1rem;
        line-height: 2rem;
        margin-bottom: 4px;
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 140px;
      }

      .dislike-time {
        color: #8a919f;
        font-size: .8rem;
        line-height: 1rem;
        font-weight: 400;
      }
    }
  }
}



.block-view {
  box-sizing: border-box;
  min-height: 626px;

  .block-headr {
    display: flex;
    border-bottom: 1px solid #e4e6eb;
    position: relative;

    .byte-tab-ba {
      height: 3px;
      top: calc(100% - 1px);
      position: absolute;
      white-space: nowrap;
      width: 60px;
      transform: translateX(16px);
      background: #1e80ff;
      transition: transform .3s cubic-bezier(.645, .045, .355, 1), height .3s cubic-bezier(.645, .045, .355, 1), width .3s cubic-bezier(.645, .045, .355, 1), -webkit-transform .3s cubic-bezier(.645, .045, .355, 1);
      list-style: none;
      left: 16px;
    }

    .block-head {
      cursor: pointer;
      font-size: 1.5em;
      color: #252933;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      padding: 16px 20px;
    }

    .block-head:hover {
      color: #1e80ff;
    }

    .is-active {
      color: #1e80ff;
    }
  }


}
</style>
  