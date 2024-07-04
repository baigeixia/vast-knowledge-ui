<template>
  <el-container class="im-box">
    <el-aside class="im-left">
      <div class="left-herder-search">
        <el-input v-model="searchinput" style="width: 240px" placeholder="搜索联系人" suffix-icon="Search"
          @change="searchchange" />
      </div>
      <div class="contacts-list">
        <el-menu default-active="1" class="contacts-list-tac" :unique-opened="true" @open="handleOpen">
          <el-sub-menu index="1">
            <template #title>最近联系</template>
            <div class="listItem" :class="{ 'listItem-active': useractive === item.id }" @click="sendmessage(item.id)"
              v-for="item in recentlist" :key="item.id">
              <div class="info-avatar">
                <img class="info-avatar-img" :src="item.avatar">
              </div>
              <div class="info-content">
                <div class="info-name">
                  <div class="name-top">{{ item.name }}</div>
                  <time>刚刚</time>
                </div>
                <div class="info-snippet">{{ item.snippet }}</div>
              </div>
            </div>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>陌生人私信</template>
            <div class="listItem" :class="{ 'listItem-active': useractive === item.id }" @click="sendmessage(item.id)"
              v-for="item in strangerlist" :key="item.id">
              <div class="info-avatar">
                <img class="info-avatar-img" :src="item.avatar">
              </div>
              <div class="info-content">
                <div class="info-name">
                  <div class="name-top">{{ item.name }}</div>
                  <time>刚刚</time>
                </div>
                <div class="info-snippet">{{ item.snippet }}</div>
              </div>
            </div>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>互相关注</template>
            <div class="listItem" :class="{ 'listItem-active': useractive === item.id }" @click="sendmessage(item.id)"
              v-for="item in mutualconcernlist" :key="item.id">
              <div class="info-avatar">
                <img class="info-avatar-img" :src="item.avatar">
              </div>
              <div class="info-content">
                <div class="info-name">
                  <div class="name-top">{{ item.name }}</div>
                  <time>刚刚</time>
                </div>
                <div class="info-snippet">{{ item.snippet }}</div>
              </div>
            </div>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const useractive = ref('')
const recentlist = ref([
  {
    id: '11',
    name: '用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },
  {
    id: '21',
    name: '用户@',
    avatar: 'https://picx.zhimg.com/v2-888ae0f39e0d37c5e0ef0c1b3b4d847e_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },
  {
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },{
    id: '33',
    name: '用户3',
    avatar: 'https://picx.zhimg.com/v2-76f332ec17ff65c1ee8f8b7844238977_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },

])

const strangerlist = ref([
  {
    id: '3',
    name: '陌生人用户1',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`

  },
  {
    id: '4',
    name: '陌生人用户2',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },
  {
    id: '5',
    name: '陌生人用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
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
「全媒体运营官培养计划」限额参加～`
  },
  {
    id: '7',
    name: '互相关注用户2',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },
  {
    id: '8',
    name: '互相关注用户3',
    avatar: 'https://pic1.zhimg.com/v2-b5e4fe8f22096e9e84c5eb58885f448d_200x0.jpg?source=78e73102',
    snippet: `亲爱的 枭有：自媒体赚钱红利期，你错过了吗？北漂小妹拍视频记录生活月赚 2w；
8 旬老太直播卖货流水百万；
自媒体已成为普通人翻身的有利渠道！现在，各大平台加大了流量扶持，新手也能快速涨粉变现，戳此领取攻略⬇️
「全媒体运营官培养计划」带你从 0 开始做账号，解决爆款内容制作、带货选品、推流涨粉等问题，助力新手上路，成功赚到钱！现在入局还不晚，速戳下方报名！
「全媒体运营官培养计划」限额参加～`
  },
])

const sendmessage = (userid) => {
  useractive.value = userid
  console.log(useractive.value);
}

const pageTitle = ref('私信');

const handleOpen = (key) => {
  console.log('key', key)
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
.im-box {
  height: 100%;

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
        .listItem {
          cursor: pointer;
          display: flex;
          align-content: center;
          padding: 10px 20px;
          margin-right: 5px;

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
}</style>
