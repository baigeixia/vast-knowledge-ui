<template>
   <div class="main-header-box">
          <a class="logo" href="/">logo</a>
          <div class="header-title">
            <ul class="title-ul">
              <li class="title-li active">
                <a href="/">首页</a>
                <!-- <i>首页</i> -->
              </li>
              <li class="title-li">
                <a href="/">推荐</a>
              </li>
              <li class="title-li">
                <a href="/">热榜</a>
              </li>
            </ul>
          </div>
          <div class="header-right">
            <ul class="right-ul">
              <!-- <el-input v-model="input" type="text" style="width: 260px" placeholder="搜索" suffix-icon="Search"  clearable /> -->
              <li class="right-li">
                <el-input v-model="headerinput" style="width: 300px" placeholder="搜索" class="header-input">
                  <template #append>
                    <el-button class="header-search" @click="headersearch" icon="Search" />
                  </template>
                </el-input>
              </li>
              <li class="right-li"><el-button style="border-radius:15px;" type="primary">提问</el-button></li>
              <li class="right-li">
                <el-icon>
                  <Bell />
                </el-icon>
                <i>消息</i>
              </li>
              <li class="right-li">
                <div>
                  <el-icon>
                    <ChatDotRound />
                  </el-icon>
                  <i>私信</i>
                </div>
              </li>
              <li class="right-li">
                <div>
                  <el-icon>
                    <Cpu />
                  </el-icon>
                  <i>创作中心</i>
                </div>
              </li>
              <li class="right-li">
                <div>
                  <el-icon>
                    <User />
                  </el-icon>
                  <i>头像</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
</template>

<script setup>
import {ref} from "vue"
import { byLoading } from '@/utils/Loading'

const headerinput = ref('')

const headersearch = () => {
  console.log(headerinput.value);
}
</script>

<style lang="scss" scoped>
 .main-header-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      margin: 0 auto;
      width: 1200px;
      background-color: rgb(255, 255, 255);

      .logo {
        margin-right: 1rem;
        margin-left: 24px;
        height: 22px;
        width: auto;
        padding: 1.58rem 0 1.48rem;
        color: #000;
      }

      .header-title {
        display: flex;
        text-align: center;

        .title-ul {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title-li {
            line-height: 60px;
            padding: 0 1rem;

            a {
              padding: 1rem 0;
              color: #9fa2ab;
            }
          }

          .title-li a:not(.active a):hover {
            color: #252933;
          }

          .title-li a:hover {
            border-bottom: 2px #1e80ff solid;
          }

          .active a {
            color: #1e80ff;
          }


        }



      }

      .header-right {

        .right-ul {
          display: flex;
          align-items: center;
          justify-content: start;

          .right-li {
            display: flex;
            padding: 0 10px 0 10px;
            flex-direction: column;

            .header-input {
              --el-input-border-radius: 20px;

              .header-search {
                padding: 0;
                font-size: 18px;
              }
            }
          }
        }
      }
    }
</style>
