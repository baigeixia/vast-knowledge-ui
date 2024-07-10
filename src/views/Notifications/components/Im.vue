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
              <el-badge :value="recentCount" :offset="[0, 15]" :is-dot="focusonCount < 2">
                最近联系
              </el-badge>
            </template>
            <div class="menu-list" v-infinite-scroll="loadrecent">
              <div v-if="recentlist.length === 0" class="list-EmptyState">还没有对话</div>
              <div v-else class="listItem" :class="{ 'listItem-active': useractive === item.id }"
                @click="sendmessage(item.id)" v-for="item in recentlist" :key="item.id">
                <div class="info-avatar">
                  <img class="info-avatar-img" :src="item.avatar">
                </div>
                <div class="info-content">
                  <div class="info-name">
                    <el-badge :offset="[3, 4]" :is-dot="item.unread">
                      <div class="name-top">{{ item.name }}</div>
                    </el-badge>
                    <time>刚刚</time>
                  </div>
                  <div class="info-snippet">{{ item.snippet }}</div>
                </div>
                <div class="info-more">
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
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-badge :value="strangerCount" :offset="[0, 15]" :is-dot="focusonCount < 2">
                陌生人私信
              </el-badge></template>
            <div class="menu-list" v-infinite-scroll="loadrecent">
              <div v-if="strangerlist.length === 0" class="list-EmptyState">还没有对话</div>
              <div v-else class="listItem" :class="{ 'listItem-active': useractive === item.id }"
                @click="sendmessage(item.id)" v-for="item in strangerlist" :key="item.id">
                <div class="info-avatar">
                  <img class="info-avatar-img" :src="item.avatar">
                </div>
                <div class="info-content">
                  <div class="info-name">
                    <el-badge :offset="[3, 4]" :is-dot="item.unread">
                      <div class="name-top">{{ item.name }}</div>
                    </el-badge>
                    <time>刚刚</time>
                  </div>
                  <div class="info-snippet">{{ item.snippet }}</div>
                </div>
                <div class="info-more">
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
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-badge :value="focusonCount" :offset="[0, 15]" :is-dot="focusonCount < 2">
                互相关注
              </el-badge>
            </template>
            <div class="menu-list" v-infinite-scroll="loadrecent">
              <div v-if="mutualconcernlist.length === 0" class="list-EmptyState">还没有对话</div>
              <div v-else class="listItem" :class="{ 'listItem-active': useractive === item.id }"
                @click="sendmessage(item.id)" v-for="item in mutualconcernlist" :key="item.id">
                <div class="info-avatar">
                  <img class="info-avatar-img" :src="item.avatar">
                </div>
                <div class="info-content">
                  <div class="info-name">
                    <el-badge :offset="[3, 4]" :is-dot="item.unread">
                      <div class="name-top">
                        {{ item.name }}
                      </div>
                    </el-badge>
                    <time>刚刚</time>
                  </div>
                  <div class="info-snippet">{{ item.snippet }}</div>
                </div>
                <div class="info-more">
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
      <ChatChatBox></ChatChatBox>
    </el-main>
    <!-- {{ useractive }} -->
  </el-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
import ChatChatBox from './components/ChatChatBox.vue';
const useractive = ref('')
const focusonCount = ref(1)
const strangerCount = ref(2)
const recentCount = ref(2)
const recentlist = ref([
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:true
  },
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
])
const testlist = ref([
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },])
const strangerlist = ref([
  {
    id: '3',
    name: '陌生人用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false

  },
  {
    id: '4',
    name: '陌生人用户2',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '5',
    name: '陌生人用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
])
const mutualconcernlist = ref([
  {
    id: '6',
    name: '互相关注用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '7',
    name: '互相关注用户2',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '8',
    name: '互相关注用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '8',
    name: '互相关注用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '8',
    name: '互相关注用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },
  {
    id: '8',
    name: '互相关注用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`,
unread:false
  },

])

const page = ref(1)
const pagesize = ref(10)

const handleSelect = (item) => {
  console.log(item.id)
}


const querySearch = (queryString, cb) => {
  const results = []

  console.log(queryString);

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




const loadrecent = () => {
  page.value += 1;
  console.log(page.value);
  recentlist.value = [...recentlist.value, ...testlist.value]
}


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

const sendmessage = (userid) => {
  useractive.value = userid
  console.log(useractive.value);
}

const pageTitle = ref('私信');
const reportdialog = ref(false);

const handleOpen = (key) => {
  console.log('key', key)
}

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
const emit = defineEmits(['data-loaded']);

const searchchange = () => {
  console.log(searchinput.value);
}
// 使用组合式API中的 onMounted 钩子
onMounted(() => {
  setTimeout(() => {
    // 数据加载完成后触发事件通知父组件
    console.log('data-loaded');
    emit('data-loaded');
  }, 2000);
});
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

        .menu-list {
          transition: height 300ms;
          height: 390px;
          overflow-y: auto;

          .list-EmptyState {
            padding: 32px 0;
            text-align: center;
          }
        }

        // :deep(.el-menu) {

        // }

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
            margin-left: 10px;

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
            flex-direction: column;
            -webkit-box-flex: 1;

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

              time {
                font-size: 10px;
                color: #929394;
              }
            }

            .info-snippet {
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
