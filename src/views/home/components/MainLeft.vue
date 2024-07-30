<template>
  <div class="main-left">
    <div class="side-wrapper" >
      <div class="item-wrap " :class="{'search-top': ishide}" v-if="channelStore.channellist.length > 0">
        <div class="item-content" :class="{'is-active' : articleStore.tagType ===  itme.id }" v-for="itme in channelStore.channellist" :key="itme.id"  @click="tabSwit(itme.id)">
          <div class="item">
            <el-icon>
              <HelpFilled />
            </el-icon>
            <div class="item-text ">
              {{ itme.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { ishide } from '@/components/Publicvariables'
import { channelAppStore } from "@/stores/admin/channel";
const channelStore = channelAppStore()
import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()
const page =ref(1)

onMounted(() => channelStore.getchannellist())

const tabSwit = (id) => {
  articleStore.tagType = id
  articleStore.page = 1
  articleStore.articleList={}
  articleStore.getarticleList()
}


</script>

<style lang="scss" scoped>
.main-left {
  flex: 4;
  margin-right: 20px;
  height: fit-content;
  border-radius: 4px;
  background-color: #fff;

  .side-wrapper {

    .search-top {
        transform: translate3d(0, -4rem, 0);
    }
    .item-wrap {
      width: 180px;
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
          cursor: pointer;


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
}
</style>
