<template>
  <div class="main-container">
    <header class="list-header">
      <div class="list">
        <ul class="list-ul">
          <li class="list-li is-active">
            <a href="/">推荐</a>
          </li>
          <li class="list-li"><a href="/">最新</a></li>
        </ul>
      </div>
    </header>
    <div class="top-content">
      <div class="content-list " v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading">
        <el-skeleton class="skeleton" animated :loading="false">
          <template #template>
            <div class="main-skeleton">
              <el-skeleton-item variant="h1" />
              <el-skeleton-item variant="h1" style="margin-bottom: 5px;" />
              <div class="skeleton-right">
                <el-skeleton-item variant="image" style="width:20%; height: 90px; margin-bottom: 10px;" />
                <div class="skeleton-right-p">
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                </div>
              </div>
              <div class="skeleton-bottom-p">
                <el-skeleton-item variant="p" style="width: 40%;" />
                <el-skeleton-item variant="p" style="width: 40%;" />
              </div>
            </div>
            <div class="main-skeleton">
              <el-skeleton-item variant="h1" />
              <el-skeleton-item variant="h1" style="margin-bottom: 5px;" />
              <div class="skeleton-right">
                <el-skeleton-item variant="image" style="width:20%; height: 90px; margin-bottom: 10px;" />
                <div class="skeleton-right-p">
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                </div>
              </div>
              <div class="skeleton-bottom-p">
                <el-skeleton-item variant="p" style="width: 40%;" />
                <el-skeleton-item variant="p" style="width: 40%;" />
              </div>
            </div>
            <div class="main-skeleton">
              <el-skeleton-item variant="h1" />
              <el-skeleton-item variant="h1" style="margin-bottom: 5px;" />
              <div class="skeleton-right">
                <el-skeleton-item variant="image" style="width:20%; height: 90px; margin-bottom: 10px;" />
                <div class="skeleton-right-p">
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                  <el-skeleton-item variant="p" />
                </div>
              </div>
              <div class="skeleton-bottom-p">
                <el-skeleton-item variant="p" style="width: 40%;" />
                <el-skeleton-item variant="p" style="width: 40%;" />
              </div>
            </div>
          </template>
          <div class="item">
            <div class="content-main" @click="router.push('/post/222')">
              <div class="title-row">预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8
                分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8
                分钟错过航班索赔 2400 元，此事责任在谁？</div>
              <div class="row-text">
                <img class="thumb"
                  src="https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b">
                <div class="abstract">
                  95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。
                </div>
              </div>
            </div>
            <div class="row-footer">
              <ul class="action-list">
                <li class="item-li">
                  <RouterLink to="/user" class="user-message">
                    <div class="user-popover">小红帽的大灰狼</div>
                  </RouterLink>
                </li>
                <li class="item-li view">
                  <el-icon>
                    <View />
                  </el-icon>
                  <span>106k</span>
                </li>
                <li class="item-li like">
                  <i class="bi bi-suit-heart"></i>
                  <span> 653</span>
                </li>
                <li class="dislike-item">
                  <el-icon>
                    <More />
                  </el-icon>
                </li>
              </ul>
              <div class="row-footer-tags">
                <a class="footer-tag " href="/">后端</a>
                <a class="footer-tag " href="/">掘金·金石计划</a>
                <a class="footer-tag " href="/">前端</a>
              </div>
            </div>
          </div>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';
const router = useRouter();

const page = ref(0)
const pagesize = ref(10)
const isLoading = ref(false)

const loadMore = () => {
  if (isLoading.value) return;

  isLoading.value = true;

  console.log(page.value);
  console.log(pagesize.value);
  page.value += 2

  isLoading.value = false;
  // 模拟异步加载数据
  // setTimeout(() => {
  //   // const newData = [...data.value, ...mockData]; // 假设 mockData 是新加载的数据
  //   // data.value = newData;
  //   isLoading.value = false;
  // }, 1000); // 延迟加载，模拟异步加载数据
}
</script>

<style lang="scss" scoped>
.main-container {
  flex: 15;
  background-color: #fff;
  margin-right: 20px;
  border-radius: 4px;
  min-height: 800px;

  .top-content {
    .content-list {
      background-color: #fff;

      .skeleton {
        flex: 15;

        .main-skeleton {
          padding: 12px 20px;

          .skeleton-bottom-p {
            display: flex;
            justify-content: space-between;
          }

          .skeleton-right {
            display: flex;
            align-items: center;

            .skeleton-right-p {
              width: 80%;
              margin-left: 10px;
            }
          }
        }
      }

      .item:hover {
        background-color: #f7f8fa;
      }

      .item {
        // display: flex;
        transition: all .3s ease-in;
        cursor: pointer;
        position: relative;
        background: #fff;
        padding: 12px 20px 0;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #f1f2f5;

        .content-main {

          // flex: 1 1 auto;
          .title-row {
            font-weight: 600;
            font-size: 18px;
            line-height: 1.6;
            display: flex;
            margin-bottom: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }


          .row-text {
            margin-top: 10px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;

            .thumb {
              flex: 0 0 auto;
              // width: 120px;
              height: 90px;
              margin-right: 24px;
              background-color: #ffffff;
              border-radius: 4px;
              border: 1px solid #f1f2f5;
            }

            .abstract {
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }

        .row-footer {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding-top: 10px;

          .row-footer-tags {
            display: flex;
            flex-direction: row;
            align-items: center;

            .footer-tag {
              background-color: #f2f3f5;
              // padding: 0 6px;
              border-radius: 2px;
              // max-width: 76px;
              box-sizing: border-box;
              margin-left: 6px;
              color: #8a919f;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              min-height: 18px;
              line-height: 18px;
            }

            .footer-tag:hover {
              color: #1e80ff;
            }

            // .width-limited {
            //   // max-width: 65px;
            // }
          }

          .action-list {
            display: flex;
            align-items: center;

            .dislike-item {
              display: none;
            }

            .like:hover {
              color: #1e80ff;
            }

            .like {
              color: #000;
            }

            .view{
                cursor: default;
              }
            .item-li {
              display: flex;
              align-items: center;
              position: relative;
              margin-right: 24px;
              font-size: 13px;
              line-height: 20px;
              color: #8a919f;
              flex-shrink: 0;
              
              .el-icon {
                font-size: 16px;
              }

              span {
                margin-left: 4px;
              }

              .user-message {
                display: flex;
                align-items: center;
                // max-width: 132px;
                font-size: 13px;
                line-height: 22px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                color: #8a919f;

                .user-popover {
                  display: inline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  padding-right: 10px;

                }
              }

              .user-message :hover {
                color: #1e80ff;
              }

            }
          }
        }


      }
    }
  }

  .list-header {
    padding: 1rem 1.66rem;
    border-bottom: 1px solid #f2f3f5;

    .list {
      display: flex;
      align-items: center;

      .list-ul {
        display: flex;
        justify-content: space-between;

        .list-li {
          font-size: 15px;
          padding: 0 1.36rem;
          line-height: 2rem;

          a {
            color: #909090;
          }
        }

        .list-li:hover {
          a {
            color: #1e80ff;
          }
        }

        .is-active {
          a {
            color: #252933;
            padding-bottom: 10px;
            border-bottom: 2px solid #1e80ff;
          }
        }


        .list-li:first-child {
          margin-left: -1.66rem;
        }
      }
    }
  }
}</style>
