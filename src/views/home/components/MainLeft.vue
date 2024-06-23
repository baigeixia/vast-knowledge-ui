<template>
  <div class="main-left">
    <div class="side-wrapper">
      <div class="item-wrap">
        <div class="item-content  is-active">
          <a class="item" href="/">
            <el-icon>
              <HelpFilled />
            </el-icon>
            <div class="item-text ">
              大模型子站大aaaaaaaaaaaaaaaa
            </div>
          </a>
        </div>
        <div class="item-content ">
          <a class="item" href="/">
            <el-icon>
              <HelpFilled />
            </el-icon>
            <div class="item-text ">
              大模型子站大aaaaaaaaaaaaaaaa
            </div>
          </a>
        </div>
        <div class="item-content ">
          <a class="item" href="/">
            <el-icon>
              <HelpFilled />
            </el-icon>
            <div class="item-text ">
              大模型子站大aaaaaaaaaaaaaaaa
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
</script>

<style lang="scss" scoped>
.main-left {
  flex: 4;
  margin-right: 20px;
  height: fit-content;
  border-radius: 4px;
  background-color: #fff;

  .side-wrapper {
    // min-width: 180px;
    .item-wrap {
      max-height: 830px;
      border-radius: 4px;
      background-color: #fff;
      box-sizing: border-box;
      // padding: 8px;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      max-width: 180px;
      padding: 8px;
      // position: absolute;
      // top: 0px;
      // left: 0px;
      position: fixed;
  //     top: 0;
  // left: 0;
  // right: 0;
  transition: transform .2s;


      .is-active {
        background-color: #eaf2ff;

        .el-icon {
          color: #1e80ff;

        }

        .item-text {
          color: #1e80ff;
        }

      }

      .item-content {
        padding: 10px 10px;
        margin: 2px 0;

        .item {
          display: flex;
          align-items: center;
          color: #515767;
          width: 100%;


          .el-icon {
            margin-right: 12px;
            flex-shrink: 0;
          }

          .item-text {
            font-size: 16px;
            line-height: 24px;
            white-space: nowrap;
            /* Prevent text from wrapping */
            overflow: hidden;
            /* Hide overflowing text */
            text-overflow: ellipsis;
            /* Show ellipsis for overflowing text */
            flex-grow: 1;

          }

        }
      }



      .item-content:not(.is-active):hover {
        background-color: #f7f8fa;

        .el-icon {
          color: #1e80ff;
        }

        .item-text {
          color: #1e80ff;
        }
      }
    }

  }
}</style>
