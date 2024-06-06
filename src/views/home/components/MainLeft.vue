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
              大模型子站大
            </div>
          </a>
        </div>
        <div class="item-content">
          <a class="item" href="/">
            <el-icon>
              <HelpFilled />
            </el-icon>
            <div class="item-text">
              综合
            </div>
          </a>
        </div>
        <div class="item-content">
          <a class="item" href="/">
            <el-icon>
              <HelpFilled />
            </el-icon>
            <div class="item-text">
              前端
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
  width: 180px;
  // position: sticky;
  // top: 80px;
  margin-right: 20px;
  height: fit-content;
  border-radius: 4px;
  background-color: #fff;

  .side-wrapper {
    min-width: 180px;
    box-sizing: border-box;
    padding: 8px;
    font-size: 16px;

    .item-wrap {
      display: flex;
      flex-direction: column;

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
        padding: 10px 17px;

        .item {
          display: flex;
          align-items: center;
          color: #515767;

          .el-icon {
            margin-right: 12px;
          }

          .item-text {
            font-size: 16px;
            line-height: 24px;
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
}
</style>
