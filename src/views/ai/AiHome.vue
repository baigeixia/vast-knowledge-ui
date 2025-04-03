<template>
    <div class="home-box">
        <div class="left-box">
            <div class="left-open" @click="handleOpen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="icon-xl-heavy">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.85719 3L13.5 3C14.0523 3 14.5 3.44772 14.5 4C14.5 4.55229 14.0523 5 13.5 5H11.5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V11.5C20.5 10.9477 20.9477 10.5 21.5 10.5C22.0523 10.5 22.5 10.9477 22.5 11.5V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM9.5 19V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                        fill="currentColor"></path>
                    <circle cx="20" cy="5" r="4" fill="#0285FF"></circle>
                </svg>
            </div>
            <div class="left-List-box" :class="{ 'is-left-open': isCollapse }">
                <div class="box-heder">
                    <div class="new-chat" @click="isNewChat = true">
                        <i class="bi bi-plus"></i> 新的聊天
                    </div>
                </div>

                <el-scrollbar class="box-text">
                    <div class="list-text" v-for=" itme in 100 " :key="itme">
                        <div class="list-itme" @click="isNewChat = false"> {{ `text ${itme}` }}</div>
                    </div>
                </el-scrollbar>
                <div class="box-bottom">
                    bottom
                </div>
            </div>
        </div>
        <div class="text-base">
            <div class="text-base-header">
                <div class="logo">
                    <img src="https://static.deepseek.com/static/logo.3a7b4c4e.svg" alt="logo">
                </div>
                <div class="model">DeepSeek-R1</div>
            </div>
            <div class="chat-container">
                <div class="messages-box">
                    <div class="text-typewriter">
                        <Bubble class="text-bubble" content="Hi, good morning, I'm fine!" placement="end" />
                        <Typewriter :content="markdownText" :is-markdown="true" />
                        <Bubble class="text-bubble" content="Hi, good morning, I'm fine!" placement="end" />
                        <Typewriter :content="evText" :is-markdown="true" />
                    </div>

                    <!-- <VueMarkdown :source="markdownText"  /> -->
                </div>
                <div class="new-wrap" v-show="isNewChat">
                    有什么可以帮忙的？
                </div>
                <div class="input-area" :class="{ 'input-area-center': isNewChat }">
                    <Sender  v-model:value="senderValue" :auto-size="{ minRows: 3, maxRows: 5 }" placeholder="询问任何内容" clearable :loading="senderLoading"
                        @submit="handleSubmit" @cancel="handleCancel" />
                </div>
                <div class="tips-text">内容由 AI 生成，请仔细甄别</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render'
import { ref } from "vue"
import { Typewriter, Bubble, BubbleList, Sender } from 'vue-element-plus-x'
import { fetchEventSource } from '@microsoft/fetch-event-source';

const isCollapse = ref(false)
const isNewChat = ref(false)
const senderLoading = ref(false)
const timeValue = ref(null)
const senderValue = ref('')
const evText = ref('')

const handleOpen = () => {
    isCollapse.value = !isCollapse.value
}

function handleSubmit(value) {
    ElMessage.info(`发送中`)
    senderLoading.value = true
    timeValue.value = setTimeout(() => {
        // 可以在控制台 查看打印结果
        console.log('submit-> value：', value)
        console.log('submit-> senderValue', senderValue.value)
        getreply()
        senderLoading.value = false
        ElMessage.success(`发送成功`)
        senderValue.value=''
    }, 3500)
}

function handleCancel() {
    senderLoading.value = false
    if (timeValue.value)
        clearTimeout(timeValue.value)
    timeValue.value = null
    ElMessage.info(`取消发送`)
}
const markdownText = ref(`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
    #### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\`
`)

const getreply =  async ()=>{
    await fetchEventSource(`http://localhost:19010/chat/stream-chat?message=${senderValue.value}`, {
    onmessage(ev) {
        console.log(ev.data);
        evText.value=evText.value+ev.data
    }
})
}

</script>

<style lang="scss" scoped>
.home-box {
    height: 100vh;
    display: flex;
    background: #fff;


    .left-box {
        position: relative;
        padding-left: 10px;

        .left-open {
            position: absolute;
            top: 2%;
            cursor: pointer;
            z-index: 200;
            margin-left: 10px;
        }

        .left-List-box {
            transform: scaleX(0);
            transform-origin: left;
            width: 0;
            overflow: hidden;
            background-color: #fff;
            transition: transform 0.4s ease, width 0.5s ease-in-out;
            height: 100%;
            border-right: 1px solid #e4e7ed;
            position: relative;

            display: flex;
            flex-direction: column;


            .box-heder {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                border-bottom: 1px solid #e4e7ed;

                .new-chat {
                    padding: 10px 20px;
                    font-size: 1rem;
                    border-radius: 20px;
                    cursor: pointer;


                }

                .new-chat:hover {
                    background-color: #ececec;
                }
            }


            .box-text {
                flex: 1;
                // flex-grow: 1;
                overflow-y: auto;

                .list-text {
                    margin-right: 10px;

                    .list-itme {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        border-radius: 4px;
                        height: 50px;
                        margin: 10px;
                        cursor: pointer;
                        border-radius: 8px;
                        padding: calc(var(--spacing)*2);
                    }
                }

                .list-text:hover {
                    background-color: #ececec;
                }


            }

            .box-bottom {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-top: 1px solid #e4e7ed;
                height: 60px;
            }

        }

        .is-left-open {
            transform: scaleX(1);
            width: 260px;
        }



    }

    .text-base {

        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        flex-shrink: 0;


        .text-base-header {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px;
            border-bottom: 1px solid #e4e7ed;

            .logo {
                img {
                    height: 32px;
                }
            }

            .model {
                margin-left: 16px;
                font-weight: 500;
                color: #303133;
            }
        }

        .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            background: #fff;
            overflow-y: auto;

            .messages-box {
                flex: 1;
                overflow-y: auto;
                padding: 20px;

                .text-typewriter {
                    margin: auto;
                    width: 60%;

                    .text-bubble {
                        margin: 40px 20px;
                    }
                }

            }

            .new-wrap {
                position: sticky;
                margin: auto;
                bottom: 70%;
                font-size: 28px;
                color: #000;
                font-weight: bold;
            }

            .input-area {
                position: sticky;
                bottom: 0;
                background: #fff;
                width: 60%;
                margin: auto;
                transition: bottom 0.5s ease-in-out;
            }

            .input-area-center {
                bottom: 50%;
            }

            .tips-text {
                position: sticky;
                bottom: 0;
                text-align: center;
                font-size: 14px;
                color: #909399;
                margin: 8px 0 12px 0;
            }

        }

    }
}
</style>