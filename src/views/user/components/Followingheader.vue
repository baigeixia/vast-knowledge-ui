<template>
  <div class="List">
    <div class="List-header">
      <h4 class="List-headerText">
        <div class="SubTabs">
          <div class="SubTabs-item" :class="{ 'is-active': isActive('/following')} ">
            <RouterLink :to="`/user/${userid}/following`">
              <span>{{ (userid == getUserid() ? '我' : (userinfoAppStores.userLocalinfo.sex == 0 ? '他' : '她'))+ '的' +"关注的人" }}</span>
            </RouterLink>
          </div>
          <div class="SubTabs-item" :class="{ 'is-active': isActive('/followers')} ">
            <RouterLink :to="`/user/${userid}/followers`">
              <span>{{"关注"+(userid == getUserid() ? '我' : (userinfoAppStores.userLocalinfo.sex == 0 ? '他' : '她'))+ '的' +"人" }}</span>
            </RouterLink>
          </div>
        </div>
      </h4>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from 'vue-router';
const route = useRoute();
import { getUserid } from '@/utils/auth'
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
const isActive = (path) => {
    return route.path.includes(path);
};

const props = defineProps({
  userid: {
    type: String,
    required: true,
  }
})
</script>

<style lang="scss" scoped>
.List {
  .List-header {
    align-items: center;
    // border-bottom: 1px solid #f8f8fa;
    border-bottom: 1px solid #f3f3f5;
    box-sizing: border-box;
    display: flex;
    height: 50px;
    justify-content: space-between;
    margin: 0 20px;

    .List-headerText {
      .SubTabs {
        display: flex;
        font-weight: 400;
        .is-active{
           font-weight: 600;
        }

        .SubTabs-item {
          margin-right: 36px;
          padding: 6px 0 7px;
          span {
            color: #191b1f;
          }
        }

        .SubTabs-item:not(.is-active):hover {
          span{
            color: #1e80ff;

          }
        }
      }
    }
  }
}
</style>
