<template>
  <div class="chat-chatBox">
    <div class="chat-header">
      <div class="header-title">知乎小管家</div>
    </div>
    <div class="chat-main-content">
      1111
    </div>
    <div class="inputBox">
      <div class="toolBar">
        <div class="emoji-container">
          <el-popover width="280px" popper-style="padding: 0; border-radius: 10px;" :show-arrow='false' placement="bottom"
            trigger="click">
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
        <el-input  ref="commentinputRef" v-model="commentinput" :autosize="{ minRows: 4, maxRows: 5 }" type="textarea" />
      </div>
      <div class="inputBox-footer">
        <span class="footer-hint">按 Enter 键发送</span>
        <el-button type="primary" :disabled="!commentinput">发送</el-button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue"
import EmojiFileInput from '@/Layout/components/EmojiFileInput.vue';

const fileInput = ref(null)
const EmojiFileInputRef = ref(null)
const commentinputRef = ref(null)
const commentinput = ref('')


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

    .toolBar{
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
    align-items: flex-start;
    flex-direction: initial;
    display: flex;
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
}</style>
