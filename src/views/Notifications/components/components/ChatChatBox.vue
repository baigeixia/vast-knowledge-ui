<template>
  <div v-if="boxshow" class="chat-chatBox">
    <div class="chat-header">
      <div class="header-title">{{ boxUserName }}</div>
    </div>
    <div ref="chatmaincontentref" class="chat-main-content" @scroll="handleScroll">
      <div class="message-wrapper" v-for="message in messageListData.messages" :key="message.id">
        <div class="message-time" v-if="message.showTimestamp">
          <time>{{ formatMessageTime(message.createdTime) }}</time>
        </div>
        <div class="message"
          :class="{ 'message-right': message.userType == 'receiver', 'message-left': message.userType == 'sender' }">
          <div class="message-user">
            <div class="user-avatar">
              <RouterLink
                :to="`/user/${message.userType == 'sender' ? messageListData.receiver.id : messageListData.sender.id}`">
                <img class="user-avatar-img"
                  :src="message.userType == 'sender' ? messageListData.receiver.avatar : messageListData.sender.avatar"
                  @click="useravatar(
                    message.userType == 'sender' ? messageListData.receiver.id : messageListData.sender.id)">
              </RouterLink>
            </div>
          </div>
          <el-tooltip :offset="0" trigger="click" popper-class="chat-tooltip-message-popper" :show-after="200"
            :placement="message.userType == 'receiver' ? 'left' : 'right'" :show-arrow="false" effect="light">
            <div class="message-content">
              <div class="message-text" v-html="message.text"></div>
            </div>
            <template #content>
              <el-tooltip placement="bottom" popper-class="chat-tooltip-status-popper" effect="light" trigger="click"
                v-if="message.id">
                <div class="content-status">
                  <i class="bi bi-three-dots"></i>
                </div>
                <template #content>
                  <div class="content-status-op">
                    <el-button @click="statusopendel(message.id)" link>
                      删除
                    </el-button>
                    <!-- <el-button  link>
                      举报
                    </el-button> -->
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-tooltip>
        </div>
      </div>
      <div v-if="loading" class="loading-animation">
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
      
          <el-upload ref="fileInput" :action="uploadAction" :headers="fromValue" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div class="emoji-box">
              <el-tooltip content="上传图片最大 10mb" placement="bottom">
                <i class="bi bi-card-image upload-icon"></i>
              </el-tooltip>
            </div>
          </el-upload>
          <!-- <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;"> -->
        </div>
      </div>
      <div class="inputBox-input">
        <el-input ref="commentinputRef" v-model="commentinput" :autosize="{ minRows: 4, maxRows: 5 }" type="textarea"
          placeholder="发送消息 . . ." @keyup.enter.ctrl.prevent="sendmessage" />

          <div v-if="imageUrl" class="small-preview-box">
              <img :src="imageUrl" alt="预览图片" class="small-preview-image" @click="showLargePreview">
              <i class="remove-icon bi bi-x-circle" @click="removeImage"></i>
            </div>
      </div>
      <div class="inputBox-footer">
        <span class="footer-hint">按Enter换行 </span>
        <el-button type="primary" :disabled="!commentinput" @click="sendmessage">发送(Ctrl+Enter)</el-button>
      </div>
    </div>
  </div>
  <div v-else class="ChatBox-emptyImage">
    知乎
  </div>
  <el-dialog v-model:visible="dialogVisible" width="50%">
            <img width="100%" :src="dialogImageUrl" alt="预览图片">
   </el-dialog>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue"
import EmojiFileInput from '@/Layout/components/EmojiFileInput.vue';
import { escapeHtml } from '@/utils/escapeHtml'
import { safeHtml } from '@/utils/domPurifyConfig'
import { formatMessageTime, getCurrentTime } from '@/utils/formDate'
import { getToken, setToken, removeToken } from '@/utils/auth'

import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()

const emit = defineEmits();

const poper = defineProps({
  boxuserid: {
    type: [Number, String],
    required: true
  },
  boxUserName: {
    type: String,
    required: true
  },
})

const boxshow = ref(false)
const loading = ref(false)
const page = ref(1)


watch(() => poper.boxuserid, async (newValue) => {
  page.value = 1
  if (newValue != 0) {
    boxshow.value = true
    messageListData.value = {}
    await fetchMessages()
    nextTick(() => {
      if (chatmaincontentref.value) {
        chatmaincontentref.value.scrollTop = chatmaincontentref.value.scrollHeight
      }
    })
  }
})



watch(() => notificationS.upMsgdata, (newValue) => {
  console.log('upMsgdata', newValue);
  const { content, senderId, userId, userName } = newValue
  let localuserid = poper.boxuserid
  if (localuserid == userId) {
    messageListData.value.messages.push({
      userType: "sender",
      text: content,
      createdTime: getCurrentTime(),
    })

    nextTick(() => {
      chatmaincontentref.value.scrollTop = chatmaincontentref.value.scrollHeight
    });

  }

})

const fromValue = {
  from: 'comment',
  Authorization: getToken()
}

const imageUrl = ref('')
const uploadAction = "http://localhost:16003/dev-collection/dfs/dfs/upload"

const handleAvatarSuccess = (response, uploadFile) => {
  if (response?.data) {
    let image = response.data.url
    imageUrl.value = image
    ElMessage.success('已添加')
  } else {
    console.error("No file uploaded.");
  }
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
  }
  if (!isLt5M) {
    ElMessage.error('上传头像图片大小不能超过 5MB!')
  }
  return isJPG && isLt5M
}


const fileInput = ref(null)
const EmojiFileInputRef = ref(null)
const commentinputRef = ref(null)
const commentinput = ref('')
const chatmaincontentref = ref(null)

const messageListData = ref({
  messages: [],
  receiver: null,
  sender: null,
})

onMounted(async () => {
  // viewDetection()
  const userid = poper.boxuserid
  if (userid != 0) {
    boxshow.value = true
    await fetchMessages()
    nextTick(() => {
      if (chatmaincontentref.value) {
        chatmaincontentref.value.scrollTop = chatmaincontentref.value.scrollHeight
      }
    })
  }
})



const useravatar = (id) => {
  console.log(id);
}

const handleScroll = async () => {
  const chatMainContent = chatmaincontentref.value;
  let heightup = chatMainContent.scrollHeight
  // 如果没有在加载更多数据且滚动接近顶部
  if (!loading.value && chatMainContent.scrollTop < 10) {
    page.value += 1
    await fetchMessages()
    nextTick(() => {
      chatmaincontentref.value.scrollTop = (chatmaincontentref.value.scrollHeight - heightup) - 70
    });
  }
}

const fetchMessages = async () => {
  const userid = poper.boxuserid
  if (userid != 0) {
    loading.value = true;
    try {
      const data = await notificationS.getmsgList(userid, page.value, 10)
      if (data) {
        // 获取 messageListData 的当前值
        const currentMessages = messageListData.value.messages || [];

        // 确保 data.messages 是数组
        const newMessages = Array.isArray(data.messages) ? data.messages : [];

        // 更新 messageListData
        messageListData.value.messages = [...newMessages, ...currentMessages];

        messageListData.value.receiver = data.receiver || messageListData.value.receiver;
        messageListData.value.sender = data.sender || messageListData.value.sender;

      }

      loading.value = false;

    } catch (error) {
      // console.error('Error loading more data:', error);
    } finally {
      loading.value = false;
    }
  }


}

const sendmessage = async () => {
  const vluse = sanitizeString(commentinput.value)
  commentinput.value = ''

  const userid = poper.boxuserid
  const username = poper.boxUserName
  notificationS.chatMsg(userid, username, vluse)


  messageListData.value.messages.push({
    userType: "receiver",
    text: vluse,
    createdTime: getCurrentTime(),
  })


  emit('message-sent', vluse, userid);

  nextTick(() => {
    chatmaincontentref.value.scrollTop = chatmaincontentref.value.scrollHeight
  });

}
const sanitizeString = (str) => {
  // const urlRegex = /(https?:\/\/[\w-]+\.[\w-]+(\/[\w- .\/?%&=]*)?)/g;
  const urlRegex = /(https?[^ \n]+)/g;
  const escapestr = escapeHtml(str)
  // const escapestr =safeHtml(str)
  const sanitizedString = escapestr.replace(urlRegex, (match) => {
    const url = new URL(match); // 使用 new URL() 获取 URL 对象
    return `<a href="${url.href}" target="_blank" title="${url.href}"><i class="bi bi-link-45deg"></i>${url.hostname}</a>`;
  });


  // return escapedString;
  return sanitizedString;
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const showLargePreview = () => {
    dialogImageUrl.value = imageUrl.value
    dialogVisible.value = true
}
const removeImage = () => {
    imageUrl.value = ''
    ElMessage.info('已移除')
}

const commentinputfocus = (emoji) => {
  if (emoji) {
    commentinput.value = commentinput.value + emoji?.i
  }
  commentinputRef.value.focus();

}

const handleClick = () => {
  fileInput.value.click()
}


const handleFileChange = (event) => {
  debugger

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

const statusopendel = (messageid) => {
  ElMessageBox.confirm(
    '是否删除该条消息',
    '删除消息',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await notificationS.delsetdelMsg(messageid)
        .then(response => {
          // 处理请求成功的逻辑
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
          messageListData.value.messages = messageListData.value.messages.filter(message => message.id !== messageid);
        })
        .catch(error => {
          // 处理请求失败的逻辑
          ElMessage({
            type: 'error',
            message: '删除失败，请稍后再试',
          });
          console.error('删除消息失败', error);
        });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    })
}


</script>

<style lang="scss">
.chat-tooltip-message-popper {
  border: none !important;
  font-size: 15px;

}

.chat-tooltip-status-popper {

  .content-status-op {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-button {
      margin: 10px 10px;
    }
  }
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

.ChatBox-emptyImage {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
    .inputBox-input{
    
    .small-preview-box {
        display: block;
        align-items: center;
        // margin: 10px 50px;
        margin-top: 10px;
        position: relative;
        width: 66px;
        height: 66px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-left: 10px;
    }

    .small-preview-image {
        width: 100%;
        height: 100%;
    }
    .remove-icon{
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
    }

    .small-preview-box:hover .remove-icon {
        display: block;
    }

    .small-preview-box:hover  .remove-icon {
    color: #1e80ff;
    cursor: pointer;

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
            cursor: pointer;
            box-sizing: border-box;
            margin: 0px;
            color: rgb(9, 64, 142);

            a {
              margin: 0;
            }

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
