<template>
  <el-container class="im-box">
    <el-aside class="im-left">
      <div class="left-herder-search">
        <!-- <el-input v-model="searchinput" style="width: 240px" placeholder="搜索联系人" suffix-icon="Search" clearable  @change="searchchange" /> -->
        <el-autocomplete v-model="searchinput" @select="handleSelect" :fetch-suggestions="querySearch"
          prefix-icon="Search" :trigger-on-focus="false" style="width: 240px" placeholder="搜索联系人" clearable
          @change="searchchange" />
      </div>
      <div class="contacts-list">
        <el-menu :default-openeds="['1']" class="contacts-list-tac" :unique-opened="true" @open="handleOpen">
          <el-sub-menu index="1">
            <template #title>
              <el-badge :offset="[0, 15]" :is-dot="recentisUnread">
                最近联系
              </el-badge>
            </template>
            <div class="menu-list" v-infinite-scroll="loadrecent" :infinite-scroll-immediate="false">
              <div v-if="recentlist.length === 0" class="list-EmptyState">还没有对话</div>
              <div v-else class="listItem" :class="{ 'listItem-active': boxuserid === item.id }"
                @click="sendmessage(item.id, item.name)" v-for="item in recentlist" :key="item.id">
                <div class="info-avatar">
                  <img class="info-avatar-img" :src="item.avatar || item.image">
                </div>
                <div class="info-content">
                  <div class="info-content-name">
                    <div class="info-name">
                      <el-badge :offset="[3, 4]" :is-dot="!Boolean(item.unread)">
                        <div class="name-top">{{ item.name }}</div>
                      </el-badge>
                    </div>
                    <div class="info-snippet">{{ item.snippet }}</div>
                  </div>
                  <div class="info-more">
                    <time v-if="item.senderTime">{{ formatTime(item.senderTime) }}</time>
                    <el-dropdown trigger="click">
                      <i class="bi bi-three-dots-vertical"></i>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <!-- <el-dropdown-item @click="infodel(item.id)">删除</el-dropdown-item> -->
                          <el-dropdown-item @click="inforeport(item.id)">举报</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="menutype == 1 && upLoading" class="loading-animation">
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
            </div>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-badge :offset="[0, 15]" :is-dot="strangerisUnread">
                陌生人私信
              </el-badge>
            </template>
            <div class="menu-list" v-infinite-scroll="loadrecent" :infinite-scroll-immediate="false">
              <div v-if="strangerlist.length === 0" class="list-EmptyState">还没有对话</div>
              <div v-else class="listItem" :class="{ 'listItem-active': boxuserid === item.id }"
                @click="sendmessage(item.id, item.name)" v-for="item in strangerlist" :key="item.id">
                <div class="info-avatar">
                  <img class="info-avatar-img" :src="item.avatar">
                </div>
                <div class="info-content">
                  <div class="info-content-name">
                    <div class="info-name">
                      <el-badge :offset="[3, 4]" :is-dot="!Boolean(item.unread)">
                        <div class="name-top">{{ item.name }}</div>
                      </el-badge>
                    </div>
                    <div class="info-snippet">{{ item.snippet }}</div>
                  </div>
                  <div class="info-more">
                    <time>{{ formatTime(item.senderTime) }}</time>
                    <el-dropdown trigger="click">
                      <i class="bi bi-three-dots-vertical"></i>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="infodel(item.id)">删除</el-dropdown-item>
                          <el-dropdown-item @click="inforeport(item.id)">举报</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="menutype == 2 && upLoading" class="loading-animation">
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
            </div>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-badge :offset="[0, 15]" :is-dot="mutualconcernisUnread">
                互相关注
              </el-badge>
            </template>
            <div class="menu-list" v-infinite-scroll="loadrecent" :infinite-scroll-immediate="false">
              <div v-if="mutualconcernlist.length === 0" class="list-EmptyState">还没有对话</div>
              <div v-else class="listItem" :class="{ 'listItem-active': boxuserid === item.id }"
                @click="sendmessage(item.id, item.name)" v-for="item in mutualconcernlist" :key="item.id">
                <div class="info-avatar">
                  <img class="info-avatar-img" :src="item.avatar">
                </div>
                <div class="info-content">
                  <div class="info-content-name">
                    <div class="info-name">
                      <el-badge :offset="[3, 4]" :is-dot="!Boolean(item.unread)">
                        <div class="name-top">
                          {{ item.name }}
                        </div>
                      </el-badge>
                    </div>
                    <div class="info-snippet">{{ item.snippet }}</div>
                  </div>
                  <div class="info-more">
                    <time>{{ formatTime(item.senderTime) }}</time>
                    <el-dropdown trigger="click">
                      <i class="bi bi-three-dots-vertical"></i>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="infodel(item.id)">删除</el-dropdown-item>
                          <el-dropdown-item @click="inforeport(item.id)">举报</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="menutype == 3 && upLoading" class="loading-animation">
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
              <div class="dot-pulse"></div>
            </div>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-aside>
    <el-dialog class="report-dialog" v-model="reportdialog" title="举报" width="650" :before-close="reportdialogClose">
      <div class="report-group-title">
        <div class="title-marl">*</div>
        请选择举报类型
      </div>
      <el-radio-group class="report-group" v-model="reporting" size="large">
        <el-radio-button v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </el-radio-button>
      </el-radio-group>
      <template #footer>
        <div class="report-dialog-footer">
          <el-button :disabled="!reporting" type="primary" round @click="reportsubmit()">
            提交举报
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-main class="chat-main">
      <ChatChatBox :boxuserid="boxuserid" :boxUserName="boxUserName" @message-sent="handleMessage">
      </ChatChatBox>
    </el-main>
    <!-- {{ useractive }} -->
  </el-container>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount, nextTick } from 'vue';
import { ElMessage } from 'element-plus'
import ChatChatBox from './components/ChatChatBox.vue';
import { formatTime } from '@/utils/formDate'

import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()

import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
import {  getCurrentTime } from '@/utils/formDate'

const handleMessage = (message,userid) => {
  console.log("接收到消息:", message,userid);
  messageUp(recentlist,userid,message)
  messageUp(strangerlist,userid,message)
  messageUp(mutualconcernlist,userid,message)
};

const messageUp=(list,userId,message)=>{
  list.value = list.value.map(item => {
        if (item.id == userId) {
          return { ...item, snippet: message };
        }
        return item;
      });
}

const props = defineProps({
  participantId: {
    type: String,
    required: true
  },
});

onMounted(async () => {
  await handleOpen(menutype.value)
  notificationS.isim = false
  let userid = props.participantId
  if (userid) {
    await newMsg(userid)
    // const data = await userinfoAppStores.getusergetInfo(props.participantId)
    // recentlist.value.unshift(data)

  }
})


watch(() => props.participantId, async (newValue) => {
  newMsg(newValue)
})

watch(() => notificationS.upMsgdata, (newValue) => {
  upcontent(recentlist, newValue, true)
  upcontent(strangerlist, newValue, false)
  upcontent(mutualconcernlist, newValue, false)

})

//更新列表。list 更新对象  newValue 新数据  add 是否添加入列表
const upcontent = async (list, newValue, add) => {
  const { content, senderId, userId, userName } = newValue

  const index = list.value.findIndex(item => item.id == userId);
  console.log('index', index);
  if (index !== -1) {
    // 存在，更新 snippet
    nextTick(() => {
      recentlist.value = recentlist.value.map(item => {
        if (item.id == userId) {
          return { ...item, snippet: content, unread: (userId == boxuserid.value) ? 1 : 0 };
        }
        return item;
      });

      notificationS.isim = false;
    })
    // list.value[index].snippet = content;
    // list.value[index].unread = (userId == boxuserid.value) ? 1 : 0;
  } else {
    // 不存在，添加新对象
    if (add) {
      const data = await userinfoAppStores.getusergetInfo(userId)
      list.value.push(
        {
          id: userId,
          avatar: data.image,
          name: userName,
          unread: 0,
          senderTime: getCurrentTime(),
          snippet: content
        }
      );
    }

  }
}


const newMsg = async (userid) => {
  const targetItem = recentlist.value.find(item => item.id == userid);
if(targetItem){
  sendmessage(targetItem.id, targetItem.name)
}else{
  const data = await userinfoAppStores.getusergetInfo(userid)
  recentlist.value = recentlist.value.filter(item => item.id !== data.id);
  recentlist.value = [data].concat(recentlist.value);
  sendmessage(data.id, data.name)
}

  // recentlist.value = recentlist.value.filter(item => item.id !== data.id);
  // recentlist.value = [data].concat(recentlist.value);

}
const boxuserid = ref(0)
const boxUserName = ref('')

const recentlist = ref([])
const strangerlist = ref([])
const mutualconcernlist = ref([])


const recentisUnread = computed(() => {
  return recentlist.value.some(item => item.unread === 0);
})

const strangerisUnread = computed(() => {
  return strangerlist.value.some(item => item.unread === 0);
})

const mutualconcernisUnread = computed(() => {
  return mutualconcernlist.value.some(item => item.unread === 0);
})

// 组合 computed 属性
const hasUnread = computed(() => {
  return recentisUnread.value || strangerisUnread.value || mutualconcernisUnread.value;
});


watch(hasUnread, (newValue) => {
  console.log('newValue', newValue);
  notificationS.isim = newValue;
});


const upLoading = ref(false)
const menutype = ref(1)
const page = ref(1)
const pagesize = ref(10)
const noMore = ref(false)

const handleSelect = (item) => {
  console.log(item.id)
}

const loadrecent = async () => {
  page.value += 1;
  console.log('type', menutype.value);
  upLoading.value = true
  try {
    const data = await notificationS.getImListInfo(menutype.value, count.value, 5)

    if (!data || data.length === 0) {
      noMore.value = true
    }

    if (data) {
      sametypeList(type, data)
    }

    upLoading.value = false
  } catch (error) {
    // console.error('Error loading more data:', error);
  } finally {
    upLoading.value = false;
  }

  console.log(page.value);
  recentlist.value = [...recentlist.value, ...testlist.value]
}



const handleOpen = async (type) => {
  menutype.value = type
  upLoading.value = true
  try {
    const data = await notificationS.getImListInfo(type, page.value, pagesize.value)
    sametypeList(type, data)

    upLoading.value = false;
  } catch (error) {
    // console.error('Error loading more data:', error);
  } finally {
    upLoading.value = false;
  }
}

const sametypeList = (type, data) => {
  if (type == 1) {
    recentlist.value = data
  } else if (type == 2) {
    strangerlist.value = data
  } else if (type == 3) {
    mutualconcernlist.value = data
  }
}

const upclearUnreadMsg = (userid) => {
  notificationS.upsetclearUnreadMsg(userid)
  if (menutype.value == 1) {
    const targetItem = recentlist.value.find(item => item.id === userid);
    // 如果目标对象存在，则更新 unread 属性
    if (targetItem) {
      targetItem.unread = 1;
    }
  } else if (menutype.value == 2) {
    const targetItem = strangerlist.value.find(item => item.id === userid);
    if (targetItem) {
      targetItem.unread = 1;
    }
  } else if (menutype.value == 3) {
    const targetItem = mutualconcernlist.value.find(item => item.id === userid);
    if (targetItem) {
      targetItem.unread = 1;
    }
  }
}




const querySearch = (queryString, cb) => {
  const results = []

  searchInList(recentlist, queryString, results);
  searchInList(strangerlist, queryString, results);
  searchInList(mutualconcernlist, queryString, results)

  cb(results)
}

const searchInList = (list, queryString, results) => {
  list.value.forEach((item, index) => {
    if (item.name.includes(queryString)) {
      results.push({ value: item.name, id: item.id });
    }
  });
};



const cities = ['涉政有害', '不友善', '垃圾广告'
  , '涉嫌侵权'
  , '色情低俗'
  , '网络暴力'
  , '涉未成年'
  , '自杀自残'
  , '不实信息'
  , '扰乱社区秩序'
  , '涉嫌诈骗'
  , '冒充'
]
const reporting = ref(null)
const reportuserid = ref('')

const sendmessage = (userid, name) => {
  boxuserid.value = userid
  boxUserName.value = name
  // console.log(boxuserid.value);
  // console.log(boxUserName.value);
  upclearUnreadMsg(userid)

}

const pageTitle = ref('私信');
const reportdialog = ref(false);

const reportsubmit = () => {
  console.log('举报理由', reporting.value)
  console.log('userid', reportuserid.value)
  if (reporting.value) {
    ElMessage.success('已提交举报申请')
  } else {
    ElMessage.warning('请选择举报理由')
  }
  reportuserid.value = ''
  reportdialog.value = false
  reporting.value = ''
}



const infodel = (userid) => {
  console.log('删除userid ', userid)
}


const inforeport = (userid) => {
  console.log('举报userid', userid)
  reportuserid.value = userid
  reportdialog.value = true
}

const reportdialogClose = () => {
  reportdialog.value = false
  reporting.value = null
  reportuserid.value = ''
}


onMounted(() => {
  document.title = pageTitle.value;
});
const searchinput = ref('')

const searchchange = () => {
  console.log(searchinput.value);
}
// 使用组合式API中的 onMounted 钩子

</script>

<style lang="scss" scoped>
:deep(.el-dialog__title) {
  display: flex;
  justify-content: center;
  font-weight: 500;
  color: rgb(25, 27, 31);
  font-size: 24px;

}

.im-box {
  flex: 1;


  .chat-main {
    padding-top: 0;
  }

  .report-dialog {

    .report-group-title {
      margin-bottom: 20px;
      display: flex;
      box-sizing: border-box;
      // margin: 0px;
      min-width: 0px;
      font-weight: 600;
      font-size: 16px;
      color: rgb(25, 27, 31);

      .title-marl {
        color: rgb(217, 83, 80);
        margin-left: 10px;
        margin-right: 5px;

      }
    }

    .report-group {
      justify-content: center;

      .el-radio-button {
        margin: 5px;
        border: var(--el-border);

        :deep(.el-radio-button__inner) {
          width: 174px;
          border: #f2f3f5;
        }
      }
    }

    .report-dialog-footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 10px;

      .el-button {
        width: 370px;
      }
    }

  }

  .im-left {
    border-right: 1px solid #dcdfe6;

    .left-herder-search {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }



    .contacts-list {
      .el-menu {
        border-right: none;
      }

      .contacts-list-tac {

        .loading-animation {
          position: absolute;
          left: 50%;
          // top: -10%;
          bottom: 5%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dot-pulse {
          width: 5px;
          height: 5px;
          background-color: #1772f6;
          border-radius: 50%;
          margin: 0 5px;
          animation: dotPulse 1s infinite alternate;
          /* 定义动画效果 */
        }

        .dot-pulse:nth-child(2) {
          animation-delay: 0.2s;
          /* 延迟第二个点的动画开始 */
        }

        .dot-pulse:nth-child(3) {
          animation-delay: 0.4s;
          /* 延迟第三个点的动画开始 */
        }

        .dot-pulse:nth-child(4) {
          animation-delay: 0.4s;
          /* 延迟第三个点的动画开始 */
        }

        .dot-pulse:nth-child(5) {
          animation-delay: 0.4s;
          /* 延迟第三个点的动画开始 */
        }

        .dot-pulse:nth-child(6) {
          animation-delay: 0.4s;
          /* 延迟第三个点的动画开始 */
        }

        @keyframes dotPulse {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
            /* 上跳 */
          }

          100% {
            transform: translateY(0);
          }
        }



        .menu-list {
          transition: height 300ms;
          height: 390px;
          overflow-y: auto;

          .list-EmptyState {
            padding: 32px 0;
            text-align: center;
          }
        }

        .listItem {
          cursor: pointer;
          display: flex;
          align-content: center;

          padding: 10px 5px 10px 10px;
          margin-right: 5px;
          margin-top: 5px;



          .info-more {
            display: flex;

            align-items: center;
            margin-left: 5px;

            time {
              font-size: 10px;
              color: #404244;
              text-align: center;
            }
          }

          .info-avatar {
            box-sizing: border-box;
            line-height: 40px;
            margin-right: 10px;

            .info-avatar-img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }

          .info-content {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .info-content-name {
              // max-width: 10rem;

              .info-name {
                display: flex;
                justify-content: space-between;

                .name-top {
                  font-size: 15px;
                  font-weight: 500;
                  max-width: 120px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }


              }
            }



            .info-snippet {
              max-width: 10rem;
              font-size: 13px;
              color: #929394;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }

        .listItem:hover {
          background-color: #f4f6f9;
        }

        .listItem-active {
          background-color: #f4f6f9;
        }
      }
    }
  }
}
</style>
