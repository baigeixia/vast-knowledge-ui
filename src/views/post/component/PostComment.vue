<template>
    <div class="auth-card" :class="{ 'auth-card-hovered': isHovered, 'auth-card-focused': (isFocused || commentinput) }"
        @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <el-input ref="commentinputRef" :autosize="{ minRows: 2, maxRows: 10 }" @keydown.enter.prevent show-word-limi
            maxlength="1000" type="textarea" v-model="commentinput" :placeholder="inputplaceholder" clearable
            @focus="isFocused = true" @blur="isFocused = false" />
        <div v-if="imageUrl" class="small-preview-box">
            <img :src="imageUrl" alt="预览图片" class="small-preview-image" @click="showLargePreview">
            <i class="remove-icon bi bi-x-circle" @click="removeImage"></i>
        </div>
        <div class="action-box">
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
            <div class="text-count-wrapper">
                <span>{{ commentinput.length }}/1000</span>
                <el-button :disabled="!commentinput.trim().length >= 1" @click="sendmessage">发送</el-button>
            </div>
        </div>
        <el-dialog v-model:visible="dialogVisible" width="50%">
            <img width="100%" :src="dialogImageUrl" alt="预览图片">
        </el-dialog>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus'
import EmojiFileInput from '@/Layout/components/EmojiFileInput.vue';
import commentStore from "@/stores/admin/comment";
const commentS = commentStore()
import maincommentAppStore from "@/stores/admin/maincomment";
const maincommentS = maincommentAppStore()

const props = defineProps({
    articleId: {
        type: String,
        required: true
    },
    replyauthor: {
        type: [String, Number,Object],
        // type: Object,
        required: false,
        default: () => ({})
    },
    commentIdTop: {
        type: Number,
        required: false,
    },
    replyauthorId: {
        type: Number,
        required: false,
    },
});
onMounted(() => {
    if (props.replyauthor?.username) {
        inputplaceholder.value = '回复： ' + props.replyauthor.username
    }
})

const inputplaceholder = ref('平等表达，友善交流')
const commentinput = ref('')
const commentinputRef = ref(null)
const fileInput = ref(null)
const EmojiFileInputRef = ref(null)
const imageUrl = ref('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const isHovered = ref(false)
const isFocused = ref(false)

const handleClick = () => {
    fileInput.value.click()
}

const sendmessage = () => {
    let timeoutId;

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
        console.log('log', commentinput.value);
        console.log('logreplyauthor', props?.replyauthor);
        commentS.commentReDto.entryId = props.articleId

        if (props.replyauthorId) {
            console.log('props',props.replyauthor);
            commentS.commentReDto.content = commentinput.value
            commentS.commentReDto.image = imageUrl.value
            commentS.commentReDto.commentRepayId = props.replyauthorId
            commentS.commentReDto.commentId = props.commentIdTop

            await commentS.saveCommentReContent()

            commentS.resetCommentRe()
        } else {
            commentS.commentDto.content = commentinput.value
            commentS.commentDto.entryId = props.articleId
            commentS.commentDto.image = imageUrl.value
            await commentS.saveCommentContent()
            commentS.resetComment()
        }

        imageUrl.value = ''
        commentinput.value = ''
        // commentS.commentHomeDto.type = 1
        await commentS.commentListGet()
        maincommentS.iscommentId=false
    }, 300);

}

const commentinputfocus = (emoji) => {
    if (emoji) {
        console.log('mian ', emoji);
        commentinput.value = commentinput.value + emoji?.i
    }
    if (!isFocused) {
        commentinputRef.value.focus();
    }
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

const removeImage = () => {
    imageUrl.value = ''
    ElMessage.info('已移除')
}

const showLargePreview = () => {
    dialogImageUrl.value = imageUrl.value
    dialogVisible.value = true
}


</script>
  
<style lang="scss" scoped>
:deep(.el-textarea__inner) {
    // background-color: #f4f4f4;
    background-color: #e4e6eb;
    // font-size: 18px;
    font-size: 16px;
    min-height: 44px;
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




.auth-card-focused {
    outline: 1px solid #1e80ff;
    transition: border 0.3s ease;
}

.auth-card-hovered {
    background-color: #e4e6eb;
}

.auth-card {
    box-sizing: border-box;
    position: relative;
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 8px;
    margin: 2px;

    .small-preview-box:hover .remove-icon {
        display: block;
    }

    .emoji-input {
        position: absolute;
        top: calc(100% - 1rem);
        left: -800px;
        transition: left 0.2s ease-in-out;
        z-index: 1000;

    }


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
        cursor: pointer;
        height: 100%;
    }



    .action-box {
        height: 40px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .emoji-container {
            position: relative;
            display: flex;
            align-items: center;

            // :deep(.el-popover){
            //     border-radius: 10px;
            // }
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
                padding: 6px;
                display: flex;
                align-items: center;
                position: relative;
                color: #8a919f;
                cursor: pointer;
                display: inline-block;

                .upload-icon {
                    font-size: 24px;
                }
            }

        }

        .text-count-wrapper {
            display: flex;
            align-items: center;
            color: #8a919f;
            margin-right: 16px;

            span {
                margin-right: 10px;
            }
        }
    }
}

.emoji-box {
    display: inline-block;
    cursor: pointer;
}

.emoji-box:hover {
    i {
        color: #1e80ff;
    }
}

.upload-icon {
    font-size: 24px;
}


.small-preview-image {
    width: 64px;
    height: 64px;
    cursor: pointer;
    // border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.remove-icon {
    width: auto;
    position: absolute;
    top: 0;
    // right: 0;
    left: 45px;
    cursor: pointer;
    // background-color: #e4e6eb;
    color: #e4e6eb;
    border-radius: 20px;
    font-size: 18px;
    display: none;
}


.small-preview-box:hover .remove-icon {
    color: #1e80ff;
    ;
}
</style>
  