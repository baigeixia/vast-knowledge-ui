import { getlist } from '@/api/admin/channel'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const channelAppStore = defineStore(
  'channel', () => {
    const channellist = ref([])
    const headertype = ref(1)


    const page = ref(0)     
    const pagesize = ref(10)     

    const maincontentllist = ref([{
      id: 22,
      thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
      title: '<script>alert(XSS Attack!)</script>',
      abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
      author: {
        id: 1,
        avatar: 'https://via.placeholder.com/40',
        username: '小红帽的大灰狼',
        position: '工程师',
      },
      browse: '106k',
      like: '653',
      tags: [
        {
          id: 1,
          url: '/',
          name: '后端',
        },
        {
          id: 2,
          url: '/',
          name: '掘金·金石计划',
        },
        {
          id: 3,
          url: '/',
          name: '前端',
        },
      ],
    }, {
      id: 22,
      thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
      title: '<script>alert(XSS Attack!)</script>',
      abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
      author: {
        id: 1,
        avatar: 'https://via.placeholder.com/40',
        username: '小红帽的大灰狼',
        position: '工程师',
      },
      browse: '106k',
      like: '653',
      tags: [
        {
          id: 1,
          url: '/',
          name: '后端',
        },
        {
          id: 2,
          url: '/',
          name: '掘金·金石计划',
        },
        {
          id: 3,
          url: '/',
          name: '前端',
        },
      ],
    }, {
      id: 22,
      thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
      title: '<script>alert(XSS Attack!)</script>',
      abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
      author: {
        id: 1,
        avatar: 'https://via.placeholder.com/40',
        username: '小红帽的大灰狼',
        position: '工程师',
      },
      browse: '106k',
      like: '653',
      tags: [
        {
          id: 1,
          url: '/',
          name: '后端',
        },
        {
          id: 2,
          url: '/',
          name: '掘金·金石计划',
        },
        {
          id: 3,
          url: '/',
          name: '前端',
        },
      ],
    }, {
      id: 22,
      thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
      title: '<script>alert(XSS Attack!)</script>',
      abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
      author: {
        id: 1,
        avatar: 'https://via.placeholder.com/40',
        username: '小红帽的大灰狼',
        position: '工程师',
      },
      browse: '106k',
      like: '653',
      tags: [
        {
          id: 1,
          url: '/',
          name: '后端',
        },
        {
          id: 2,
          url: '/',
          name: '掘金·金石计划',
        },
        {
          id: 3,
          url: '/',
          name: '前端',
        },
      ],
    }, {
      id: 22,
      thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
      title: '<script>alert(XSS Attack!)</script>',
      abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
      author: {
        id: 1,
        avatar: 'https://via.placeholder.com/40',
        username: '小红帽的大灰狼',
        position: '工程师',
      },
      browse: '106k',
      like: '653',
      tags: [
        {
          id: 1,
          url: '/',
          name: '后端',
        },
        {
          id: 2,
          url: '/',
          name: '掘金·金石计划',
        },
        {
          id: 3,
          url: '/',
          name: '前端',
        },
      ],
    },])

    const upcontentItems = ref([
      {
        id: 22,
        thumb: 'https://picx.zhimg.com/v2-e7e538187231ad6b5d47adf7c06baf70_200x0.jpg?source=172ae18b',
        title: `预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8
                          分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到 8 分钟错过航班索赔 2400 元，此事责任在谁？预留 5 分钟「极限登机」，乘客因预约的网约车迟到
                          8
                          分钟错过航班索赔 2400 元，此事责任在谁？`,
        abstract: ` 95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。95，双非本科，多段大厂前端背景，未婚未育，北漂快七年。总包六折结束北漂，聊聊换城市。卷王也不一定能卷的动。`,
        author: {
          id: 1,
          avatar: 'https://via.placeholder.com/40',
          username: '小红帽的大灰狼',
          position: '工程师',
        },
        browse: '106k',
        like: '653',
        tags: [
          {
            id: 1,
            url: '/',
            name: '后端',
          },
          {
            id: 2,
            url: '/',
            name: '掘金·金石计划',
          },
          {
            id: 3,
            url: '/',
            name: '前端',
          },
        ],
      },
    ])

    const getchannellist = async () => {
      const res = await getlist()
      channellist.value = res.records

      // console.log('channellist', channellist.value );
    }

    const STATUSMAP = {
      1: "启动",
      0: "禁用",
    };

    const channellistdata = computed(() => channellist.value.records?.map((item) => ({ ...item, isDefault: item.isDefault ? "是" : "否", status: STATUSMAP[item.status], createdTime: item.createdTime.replace(/T/, ' ') })))

    return {
      channellist,
      getchannellist,
      channellistdata,
      headertype,
      maincontentllist,
      page,
      pagesize,
      
    }
  })