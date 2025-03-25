<template>
  <div class="main-right">
    <div class="signin-tip box-standard">
      <div class="text-left">
        <div class="context-start">
          上午好！
        </div>
        <div class="context-end">
          点亮在社区的每一天
        </div>
      </div>
      <el-button>去签到</el-button>
    </div>
    <div class=" box-standard">
      <div class="context-title">
        <div class="context">推荐话题</div>
        <div class="context-refresh" style="cursor: pointer">
          <el-icon>
            <RefreshRight />
          </el-icon>
          换一换
        </div>
      </div>
      <div class="context-main">
        <a href="/" class="main-itme">
          <div class="main-itme-text"> #挑战每日一条沸点挑战每日一条沸点挑战每日一条沸点挑战每日一条沸点#</div>
        </a>
        <div class="main-text-heat">7.6m</div>
      </div>
      <div class="context-main">
        <a href="/" class="main-itme">
          <div class="main-itme-text"> #挑战每日一条沸点挑战每日一条沸点#</div>
        </a>
        <div class="main-text-heat">7.6m</div>
      </div>
      <div class="context-main">
        <a href="/" class="main-itme">
          <div class="main-itme-text"> 稀土开发者大会2024#</div>
        </a>
        <div class="main-text-heat">7.6m</div>
      </div>
      <div class="context-main">
        <a href="/" class="main-itme">
          <div class="main-itme-text"> #每日快讯#</div>
        </a>
        <div class="main-text-heat">7.6m</div>
      </div>
      <div class="context-main">
        <a href="/" class="main-itme">
          <div class="main-itme-text"> #挑战每日一条沸点挑战每日一条沸点#</div>
        </a>
        <div class="main-text-heat">7.6m</div>
      </div>
    </div>
    <el-footer class="aside-footer">
      <div class="more-list">
        <div class="more-title">
          <el-icon>
            <QuestionFilled />
          </el-icon> 帮助中心
        </div>
        <div class="more-datails">
          <a href="/" class="link"><span>保护指引</span></a>
          <a href="/" class="link"><span>联系我们</span></a>
        </div>
      </div>
      <div class="more-list">
        <div class="more-title">
          <el-icon>
            <WarningFilled />
          </el-icon> 举报中心
        </div>
        <div class="more-datails">
          <a href="/" class="link"><span>涉未成年举报</span></a>
          <a href="/" class="link"><span>网络谣言举报</span></a>
          <a href="/" class="link"><span>涉企侵权举报</span></a>
        </div>
      </div>
      <div class="more-list">
        <div class="more-title">
          <el-icon>
            <InfoFilled />
          </el-icon>关于
        </div>
        <div class="more-datails">
          <a href="/" class="link"><span>指南</span></a>
          <a href="/" class="link"><span>协议</span></a>
        </div>
      </div>

      <hr style="border: 0.5px solid #ccc;">

      <div class="more-list">
        <div class="more-datails registration">
          <a href="https://beian.miit.gov.cn/" class="link " target="_blank" rel="noopener noreferrer">
            赣 ICP 备2025053496号-1
          </a>
        </div>
      </div>
      <!-- <div class="more-list">
        <div class="more-datails">
          <a href="https://beian.miit.gov.cn/" class="link" target="_blank" rel="noopener noreferrer">
            <img src="//lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/police.d0289dc.png" alt="police"
              style="vertical-align:middle;">
            赣 ICP 备2025053496号-1
          </a>
        </div>
      </div> -->

    </el-footer>


  </div>
</template>

<script setup>
import { ref } from "vue"
</script>

<style lang="scss" scoped>
.main-right {
  flex: 5;

  .box-standard {
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

    background-color: #fff;
    padding: 20px;
    margin-bottom: 1.66rem;
    line-height: 1.29;
  }

  .context-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;

    .context {
      font-weight: 600;
      line-height: 24px;
      color: #252933;
    }

    .context-refresh {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #8a919f;

      .el-icon {
        margin-right: 5px;
      }


    }

    .context-refresh:hover {
      color: #1e80ff;
    }

  }

  .context-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;


    .main-itme {
      color: #252933;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

    }

    .main-itme-text {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .main-itme-text:hover {
      color: #1e80ff;
    }

    .main-text-heat {
      white-space: nowrap;
      color: #8a919f;
      font-size: 12px;
      padding-left: 30px;
    }
  }

  .signin-tip {
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;



    .context-start {
      color: #252933;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }

    .context-end {
      margin-top: 2px;
      color: #8a919f;
    }
  }

  .aside-footer {
    // background-color: #fff;
    padding: 0;
    .Menu-divider{
      border-bottom: 1px solid var(#eaeced);
    }

    .more-list {
      box-sizing: border-box;
      padding-bottom: 10px;
      padding-top: 10px;


      .more-title {
        display: flex;
        align-items: center;
        font-weight: 400;
        color: #373a40;

        .el-icon {
          margin-right: 5px;
          text-align: center;
        }
      }

      .more-datails {
        display: flex;
        align-items: center;
        margin-top: 5px;
        // justify-content: space-between;

        .link {
          font-size: 13px;
          color: #a1a1a1;
          box-sizing: border-box;

          margin: 0px 5px 0px 0px;

          span {
            padding-right: 5px;
          }
        }
        
      }
      .registration{
          justify-content: center;
        }

      .link :hover {
        color: #09408e;
      }
    }
  }

}
</style>
