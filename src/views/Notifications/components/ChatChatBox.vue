<template>
  <div class="chat-chatBox">
    <div class="chat-header">
      <div class="header-title">知乎小管家</div>
    </div>
    <div ref="chatmaincontentref" class="chat-main-content" @scroll="handleScroll">
      <div class="message-wrapper" v-for="message in testmessage.messages" :key="message.id">
        <div class="message-time">
          <time>{{ formatDate(message.created_time) }}</time>
        </div>
        <div class="message"
          :class="{ 'message-right': message.user_type == 'receiver', 'message-left': message.user_type == 'sender' }">
          <div class="message-user">
            <div class="user-avatar">
              <img class="user-avatar-img"
                :src="message.user_type == 'sender' ? testmessage.sender.avatar_url : testmessage.receiver.avatar_url">
            </div>
          </div>
          <el-tooltip trigger="click" popper-class="chat-tooltip-message-popper" :style="{ fontSize: '20px' }"  show-after="200" :placement="message.user_type == 'receiver'? 'left'  : 'right' "  :show-arrow="false" effect="light">
            <div class="message-content">
              <div class="message-text" v-html="message.text"></div>
            </div>
            <template #content>
              <div class="content-status">
                <i class="bi bi-three-dots-vertical"></i>
                <!-- <div class="status-wrapper">
                  <div class="status-more">
                    悬浮框
                  </div>
                </div> -->
              </div>
            </template>
          </el-tooltip>

        </div>
      </div>
      <div v-if="true" class="loading-animation">
        <div class="dot-pulse"></div>
        <div class="dot-pulse"></div>
        <div class="dot-pulse"></div>
        <div class="dot-pulse"></div>
        <div class="dot-pulse"></div>
        <div class="dot-pulse"></div>
      </div>
    </div>
    <div class="inputBox">
      <div class="toolBar">
        <div class="emoji-container">
          <el-popover width="280px" popper-style="padding: 0; border-radius: 10px;" :show-arrow='false'
            placement="bottom" trigger="click">
            <template #reference>
              <div class="emoji-box">
                <i class="bi bi-emoji-laughing"></i>
              </div>
            </template>
            <EmojiFileInput ref="EmojiFileInputRef" class="emoji-input" @emoji-click="commentinputfocus" />
          </el-popover>
          <div class="emoji-box" @click="handleClick">
            <el-tooltip content="上传图片最大 10mb" placement="bottom">
              <i class="bi bi-card-image upload-icon"></i>
            </el-tooltip>
          </div>
          <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;">
        </div>
      </div>
      <div class="inputBox-input">
        <el-input ref="commentinputRef" v-model="commentinput" :autosize="{ minRows: 4, maxRows: 5 }" type="textarea"
          placeholder="发送消息 . . ." @keyup.enter.ctrl.prevent="sendmessage" />
      </div>
      <div class="inputBox-footer">
        <span class="footer-hint">按Enter换行,按Ctrl+Enter键发送 </span>
        <el-button type="primary" :disabled="!commentinput" @click="sendmessage">发送</el-button>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"
import EmojiFileInput from '@/Layout/components/EmojiFileInput.vue';
import { escapeHtml } from '@/utils/escapeHtml'

const fileInput = ref(null)
const EmojiFileInputRef = ref(null)
const commentinputRef = ref(null)
const commentinput = ref('')
const chatmaincontentref = ref(null)
const loadingMore = ref(false)

const testmessage = ref(
  {
    "messages": [
      {
        "id": "1407317459048861696",
        "type": "message",
        "text": `<a href="https://github.com/vueComponent/ant-design-vue" target="_blank" title="https://github.com/vueComponent/ant-design-vue"><i class="bi bi-link-45deg"></i>github.com</a>`,
        "created_time": 1628310628,
        "content_type": 0,
        "image": null,
        "user_type": "receiver",
        "is_canceled": false,
      },
      {
        "id": "1407317459048861696",
        "type": "message",
        "text": `不好意思现在才看到你消息。没有接触过她，望加油`,
        "created_time": 1628310628,
        "content_type": 0,
        "image": null,
        "user_type": "sender",
        "is_canceled": false,
      },
      {
        "id": "1407317459048861696",
        "type": "message",
        "text": `嘿哥们，你好。打扰你一下。请问下这个妹子你联系过没有，加了好友吗，现在是断了联系，还是说还正在保持联系？就是问你一声，如果已经没联系我就接触一下，还在联系，我就不加好友了。因为我不想多线操作，也不想被多线。谢谢，打扰了~ \u003ca href=\"https://www.zhihu.com/people/annie-37-28-90\" class=\"internal\"\u003e\u003cspan class=\"invisible\"\u003ehttps://www.\u003c/span\u003e\u003cspan class=\"visible\"\u003ezhihu.com/people/annie-\u003c/span\u003e\u003cspan class=\"invisible\"\u003e37-28-90\u003c/span\u003e\u003cspan class=\"ellipsis\"\u003e\u003c/span\u003e\u003c/a\u003e`,
        "created_time": 1628310628,
        "content_type": 0,
        "image": null,
        "user_type": "receiver",
        "is_canceled": false,
      },
      {
        "id": "1407317459048861696",
        "type": "message",
        "text": `不好意思现在才看到你消息。没有接触过她，望加油`,
        "created_time": 1628310628,
        "content_type": 0,
        "image": null,
        "user_type": "sender",
        "is_canceled": false,
      },
    ],
    "receiver": {
      "id": "a19f400e40b4bec800af89d8afe593fa",
      "name": "枭有",
      "avatar_url": "https://pic1.zhimg.com/v2-b9a68a9403798d64e2471e644af4a27a_l.jpg?source=78e73102",
    },
    "sender": {
      "id": "ed9c1f03abe71cb8b735cf0014d5f350",
      "name": "平泽唯",
      "avatar_url": "https://pic1.zhimg.com/v2-1c58e538a97a3000a99b3a6330337ffd_l.jpg?source=78e73102",
    }
  }
)

const upmessage = ref({
  "messages": [
    {
      "id": "1407317459048861696",
      "type": "message",
      "text": `凌鲨(linksaas)是专注于软件研发团队的效率工具，里面提供了很多研发小工具。整个项目是开源的，可以根据需要二次开发，代码地址 linksaas / desktop · 极狐GitLab (jihulab.com) 。预编译版本 凌鲨 软件研发团队信息枢纽 (linksaas.pro)凌鲨(linksaas)是专注于软件研发团队的效率工具，里面提供了很多研发小工具。整个项目是开源的，可以根据需要二次开发，代码地址 linksaas / desktop · 极狐GitLab (jihulab.com) 。预编译版本 凌鲨 软件研发团队信息枢纽 (linksaas.pro)`,
      "created_time": 1628310628,
      "content_type": 0,
      "image": null,
      "user_type": "receiver",
      "is_canceled": false,
    },
    {
      "id": "1407317459048861696",
      "type": "message",
      "text": `凌鲨(linksaas)是专注于软件研发团队的效率工具，里面提供了很多研发小工具。整个项目是开源的，可以根据需要二次开发，代码地址 linksaas / desktop · 极狐GitLab (jihulab.com) 。预编译版本 凌鲨 软件研发团队信息枢纽 (linksaas.pro)凌鲨(linksaas)是专注于软件研发团队的效率工具，里面提供了很多研发小工具。整个项目是开源的，可以根据需要二次开发，代码地址 linksaas / desktop · 极狐GitLab (jihulab.com) 。预编译版本 凌鲨 软件研发团队信息枢纽 (linksaas.pro)`,
      "created_time": 1628310628,
      "content_type": 0,
      "image": null,
      "user_type": "sender",
      "is_canceled": false,
    }
  ],
})
onMounted(() => {
  nextTick(() => {
    chatmaincontentref.value.scrollTop = chatmaincontentref.value.scrollHeight
  })

})
const handleScroll = () => {
  const chatMainContent = chatmaincontentref.value;
  let heightup = chatMainContent.scrollHeight
  console.log(heightup);
  // 如果没有在加载更多数据且滚动接近顶部
  if (!loadingMore.value && chatMainContent.scrollTop < 10) {
    loadingMore.value = true;
    // 模拟加载更多数据的延迟
    setTimeout(() => {
      fetchMessages()
      nextTick(() => {
        chatmaincontentref.value.scrollTop = (chatmaincontentref.value.scrollHeight - heightup) - 70
      });
      loadingMore.value = false;
    }, 200); // 假设延迟1秒加载更多数据
  }
}

const fetchMessages = () => {
  testmessage.value = {
    ...testmessage.value,
    messages: [...upmessage.value.messages, ...testmessage.value.messages]
  }
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month starts from 0
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const sendmessage = () => {
  const vluse = sanitizeString(commentinput.value)
  console.log('消息', vluse);
}
const sanitizeString = (str) => {
  const urlRegex = /(https?:\/\/[\w-]+\.[\w-]+(\/[\w- .\/?%&=]*)?)/g;
  const escapestr = escapeHtml(str)
  const sanitizedString = escapestr.replace(urlRegex, (match) => {
    const url = new URL(match); // 使用 new URL() 获取 URL 对象
    return `<a href="${url.href}" target="_blank" title="${url.href}"><i class="bi bi-link-45deg"></i>${url.hostname}</a>`;
  });

  return sanitizedString;
  // return escapeHtml(sanitizedString);
}

const commentinputfocus = (emoji) => {
  if (emoji) {
    console.log('mian ', emoji);
    commentinput.value = commentinput.value + emoji?.i
  }
  commentinputRef.value.focus();

}

const handleClick = () => {
  fileInput.value.click()
}


const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const isImage = file.type.startsWith('image/')
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return
  }

  if (!isLt10M) {
    ElMessage.error('上传图片大小不能超过 10MB!')
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imageUrl.value = reader.result
    ElMessage.success('已添加')
  }
}


</script>

<style lang="scss">
.chat-tooltip-message-popper{
  background-color:#000000 ;
}
</style>
<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  font-size: 1.1rem;
  width: 100%;
  line-height: 1.4;
  display: block;
  border: none !important;
  box-shadow: none !important;
  /* 禁止用户手动调整大小 */
  resize: none;
  /* 根据需要调整内边距 */
  padding: 10px;
  outline: none;
}


.chat-chatBox {


  .inputBox {
    border-top: 1px solid #dcdfe6;

    .toolBar {
      // border-bottom: 1px solid #dcdfe6;

      .emoji-container {
        position: relative;
        display: flex;
        align-items: center;

        .preview-box {
          margin-top: 20px;
          text-align: center;

          .preview-image {
            max-width: 100%;
            height: auto;
          }
        }

        .emoji-color-op {
          i {
            color: #1e80ff;
          }
        }

        .popperclass {
          padding: 0;
        }

        .emoji-box {
          font-size: 20px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          position: relative;
          color: #8a919f;
          cursor: pointer;
          display: inline-block;

          .upload-icon {
            font-size: 22px;
          }
        }

      }
    }

    .inputBox-footer {
      align-items: center;
      display: flex;
      justify-content: flex-end;

      .footer-hint {
        font-size: 1rem;
        color: #8d8d8d;
        margin-right: 10px;
      }
    }

  }

  .chat-main-content {
    height: 400px;
    box-sizing: border-box;
    min-width: 0px;
    margin: 20px;
    overflow-y: auto;
    position: relative;

    .loading-animation {
      position: absolute;
      left: 50%;
      top: 10%;
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

    .message-wrapper {
      .message-time {
        padding-top: 10px;
        text-align: center;
        // font-size: 12px;
        line-height: 20px;
        color: rgb(145, 150, 161);
      }

      .message-right {
        flex-direction: row-reverse;

        .message-content {
          .message-text {
            background-color: #95ec69;
            color: #373a40;

          }
        }
      }

      .message-left {
        flex-direction: initial;

        .message-content {
          .message-text {
            background-color: #f8f8fa;
            color: #373a40;
          }
        }
      }


      .message {
        box-sizing: border-box;
        min-width: 0px;
        margin: 20px;
        -moz-box-align: center;
        align-items: center;
        display: flex;


        .message-user {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          display: inline-block;
          width: 40px;
          height: 40px;
          position: relative;

          .user-avatar {
            box-sizing: border-box;
            margin: 0px;
            color: rgb(9, 64, 142);

            .user-avatar-img {
              box-sizing: border-box;
              margin: 0px;
              min-width: 0px;
              max-width: 100%;
              width: 40px;
              height: 40px;
              display: block;
              border-radius: 50%;
            }
          }
        }

      
        .message-content {
          box-sizing: border-box;
          min-width: 0px;
          margin: 0px 10px;
          -moz-box-align: center;
          align-items: center;
          display: flex;

          .message-text {
            word-wrap: break-word;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 14px;
            letter-spacing: .4px;
            line-height: 20px;
            margin-left: 8px;
            margin-right: 8px;
            max-width: 388px;
            min-height: 40px;
            padding: 10px 12px;
            position: relative;
            text-align: left;
            white-space: pre-wrap;
            word-break: break-all;
          }


        }

        .content-status {
          background-color: #fff;
          .status-wrapper {
            position: relative;

            .status-more {
              position: absolute;
              top: -20px;
              right: 0;
              background-color: #f0f0f0;
              padding: 5px;
              border: 1px solid #ccc;
              border-radius: 3px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              /* 添加阴影效果 */
              display: none;
              /* 初始时隐藏 */
              cursor: pointer;
              height: 16px;
              width: 16px;
            }


          }
        }
      }
    }
  }

  .chat-header {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #dcdfe6;

    .header-title {
      line-height: 50px;
      font-weight: 600;
      font-size: 15px;
    }


  }
}
</style>
