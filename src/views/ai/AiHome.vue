<template>
    <div class="home-box">
        <el-tooltip class="box-item" effect="dark" :content="isCollapse ? '关闭边框' : '打开边框'"
            :placement="isCollapse ? 'right' : 'bottom'" :show-after="250" :hide-after="0">
            <div class="left-open" @click="handleOpen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="icon-xl-heavy max-md:hidden">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
                        fill="currentColor"></path>
                </svg>
            </div>
        </el-tooltip>

        <div class="left-box">
            <div class="left-List-box" :class="{ 'is-left-open': isCollapse }">
                <div class="box-heder">
                    <div class="new-chat" @click="newchatclick">
                        <i class="bi bi-plus"></i> 新的聊天
                    </div>
                </div>
                <el-scrollbar class="box-text">
                    <div class="list-text" v-for=" itme in 100 " :key="itme">
                        <div class="list-itme" @click="isNewChat = false">
                            <div :title="itme" class="itme-text">
                                {{ `texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext ${itme}` }}
                            </div>

                            <el-dropdown class="itme-icon" popper-class="itme-icon-popper" placement="bottom"
                                trigger="click" :teleported="false" :persistent="false">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M3 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>重命名</el-dropdown-item>
                                        <el-dropdown-item>删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                        </div>
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
                <div class="messages-box" ref="typewriterRef">
                    <div class="text-typewriter">
                        <div class="reasoning-text">
                            <article class="reasoning-html markdown-body" v-html="reasoninghtmltext"></article>
                        </div>
                        <article class="html-highlight  markdown-body" v-html="htmltext"></article>
                    </div>
                </div>
                <div class="input-area" :class="{ 'input-area-center': isNewChat }">
                    <div class="new-wrap" v-show="isNewChat">
                        有什么可以帮忙的？
                    </div>
                    <div class="input-external">
                        <div class="input-text">
                            <el-input class="internal-textarea" v-model="senderValue" @keydown.enter="handleEnter"
                                :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="询问任何内容"
                                resize="none" />
                        </div>
                        <div class="input-bottom">
                            <div class="input-bottom-start">
                                <div class="bottom-icon" @click="isthink = !isthink"
                                    :class="{ 'bottom-icon-isthink': isthink }">
                                    <el-icon>
                                        <Cpu />
                                    </el-icon>
                                    <p>深度思考</p>
                                </div>
                            </div>
                            <div class="input-bottom-end" @click="handleSubmit"
                                :class="{ 'sender': senderValue && !isMaxSender }"
                                :style="{ pointerEvents: isMaxSender || !senderValue ? 'none' : 'auto' }">
                                <i class="bi bi-caret-up-fill"></i>
                            </div>
                        </div>
                    </div>
                    <!-- <el-button @click="handleSubmit">发送</el-button> -->
                </div>
                <div class="tips-text">内容由 AI 生成，请仔细甄别</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue"
// import AiMarkdown from './components/AiMarkdown.vue'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Marked } from 'marked';
import { safeHtml } from '@/utils/domPurifyConfig'
import hljs from 'highlight.js';
import 'github-markdown-css';
import 'highlight.js/styles/a11y-light.css';
import { markedHighlight } from "marked-highlight";

const marked = new Marked(
    markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
)

const isthink = ref(false)
const isCollapse = ref(false)
const isNewChat = ref(false)
const senderLoading = ref(false)
const timeValue = ref(null)
const senderValue = ref('')
const typewriterRef = ref(null)
const isMaxSender = ref(false)

//输出

//html输出
const htmltext = ref('')
const markedtext = ref('')

const reasoninghtmltext = ref('')
const reasoningContent = ref('')


onMounted(() => {


    const markdownContent = `
以下是一个简单的Java "Hello, World!" 程序示例：

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### 代码解释：
1. **\`public class HelloWorld\`**：定义了一个公共类（class），类名是 \`HelloWorld\`。在Java中，类是一个基本的封装单元，用于组织代码和数据。类名需要与保存代码的文件名（不包括文件扩展名）一致，所以保存这个代码的文件应该命名为 \`HelloWorld.java\`。
2. **\`public static void main(String[] args)\`**：这是Java程序的入口点。\`public\` 表示该方法具有公共访问权限；\`static\` 意味着可以在不创建类的实例的情况下调用该方法；\`void\` 表示该方法不返回任何值；\`main\` 是方法名，Java虚拟机（JVM）会从这个方法开始执行程序；\`String[] args\` 是一个字符串类型的数组，用于接收命令行参数。
3. **\`System.out.println("Hello, World!");\`**：这行代码使用 \`System.out\` 对象的 \`println\` 方法在控制台打印出 "Hello, World!" 字符串，并在打印后换行。\`System\` 是Java标准库中一个预定义的类，\`out\` 是 \`System\` 类的一个静态成员，代表标准输出流，\`println\` 方法用于输出指定的内容。

### 运行步骤：
1. 将上述代码复制到文本编辑器中，保存为 \`HelloWorld.java\` 文件。
2. 打开命令行终端（在Windows上是命令提示符或PowerShell，在Linux和macOS上是终端）。
3. 使用 \`cd\` 命令切换到保存 \`HelloWorld.java\` 文件的目录。
4. 执行 \`javac HelloWorld.java\` 命令来编译Java源文件，这会生成一个字节码文件 \`HelloWorld.class\`。
5. 编译成功后，执行 \`java HelloWorld\` 命令来运行程序，此时会在命令行中看到输出 "Hello, World!"。 
`;

    // const markdownContent = `# 🔥 Typewriter 实例方法-事件 \n 😄 使你的打字器可高度定制化。\n - 更方便的控制打字器的状态 \n - 列表项 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n // 🙉 控制台可以查看相关打日志\n console.log('Hello, world!');console.log('Hello, world!');console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); \n \`\`\``
    const html = marked.parse(markdownContent);
    // DOMPurify.sanitize(html)
    htmltext.value = safeHtml(html)

})




watch(senderValue, () => {
    if (senderValue.value.length > 20000) {
        isMaxSender.value = true
    }
})

//新聊天
const newchatclick = () => {
    isNewChat.value = true

}

const handleOpen = () => {
    isCollapse.value = !isCollapse.value
}

function handleSubmit(value) {
    if (isMaxSender.value) {
        ElMessage.warning(`字数过大`)
    }

    ElMessage.info(`发送中`)
    senderLoading.value = true
    timeValue.value = setTimeout(() => {
        // 可以在控制台 查看打印结果
        console.log('submit-> value：', value)
        console.log('submit-> senderValue', senderValue.value)
        getreply()
        senderLoading.value = false
        ElMessage.success(`发送成功`)
        senderValue.value = ''
    }, 3500)
}

const handleEnter = (event) => {
    // 如果按下了 Shift 键，则允许换行
    if (event.shiftKey) {
        // 不做任何操作，允许换行
        return;
    }
    // 否则，阻止换行并触发提交
    event.preventDefault();
    handleSubmit();
}

// 监听 evText 的变化，触发滚动
watch(htmltext, () => {
    const typewriterElement = typewriterRef.value;
    if (typewriterElement) {
        // 获取到内容区域的总高度和可视区域的高度
        const scrollHeight = typewriterElement.scrollHeight;
        const clientHeight = typewriterElement.clientHeight;
        const scrollTop = typewriterElement.scrollTop;

        // 判断当前滚动条是否已经接近底部
        const isAtBottom = scrollHeight - clientHeight <= scrollTop + 1;

        // 如果已经在底部，才自动滚动到底部
        if (isAtBottom) {
            typewriterElement.scrollTop = scrollHeight - clientHeight;
        }
    }
});

function handleCancel() {
    senderLoading.value = false
    if (timeValue.value)
        clearTimeout(timeValue.value)
    timeValue.value = null
    ElMessage.info(`取消发送`)
}

const getreply = async () => {
    await fetchEventSource(`http://localhost:19010/chat/stream-chat`, {
        openWhenHidden: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: senderValue.value,
            searchEnabled: 1,
        }),
        async onopen(response) {
            console.log("response", response);
            if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
                console.log("EventStream opened");
                return;
            } else {
                console.error("Error in connection");
                throw new Error("Connection error");
            }
        },
        onclose() {
            // if the server closes the connection unexpectedly, retry:
            console.log("EventStream onclose");
            // console.log(markedtext.value);
        },
        onmessage(msg) {
            const message = JSON.parse(msg.data)
            // console.log("message:"+message.r);
            if (message?.s) {
                //搜索
                const searchInfo = message.s
                
            } else if (message?.r) {
                reasoningContent.value = reasoningContent.value + message.r
                const html = marked.parse(reasoningContent.value);
                reasoninghtmltext.value = safeHtml(html)
            } else if(message?.v) {
                markedtext.value = markedtext.value + message.v
                const html = marked.parse(markedtext.value);
                htmltext.value = safeHtml(html)
            }
        },
        onerror(err) {
            console.error("Stream error", err);
        }
    })
}


</script>

<style lang="scss" scoped>
@import "@/assets/styles/highlight.scss";

:deep(.itme-icon-popper) {
    top: 25px;
    border-radius: 15px;
    --el-border-radius-base: 15px;
    --el-dropdown-menuItem-hover-fill: #f5f5f5;
    --el-dropdown-menuItem-hover-color: #000;

    .el-dropdown-menu__item {
        display: flex;
        justify-content: center;
        margin: 5px;
    }

    .el-dropdown-menu__item:hover {
        border-radius: 10px;

    }

    .el-popper__arrow {
        display: none;
    }

}

:deep(.internal-textarea) {
    font-size: 16px;

    .el-textarea__inner {
        border: none;
        box-shadow: none;
        outline: none;
        overflow-y: auto;
        color: #000;


        scrollbar-width: thin;
        /* 滚动条宽度：‘auto’ | ‘thin’ | ‘none’ */
        scrollbar-color: #888 #f1f1f1;
    }

    .el-textarea__inner::-webkit-scrollbar {
        width: 8px;
        /* 设置滚动条宽度 */
    }

    .el-textarea__inner::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        /* 轨道背景色 */
        border-radius: 4px;
        /* 圆角 */
    }

    .el-textarea__inner::-webkit-scrollbar-thumb {
        background-color: #888;
        /* 滑块背景色 */
        border-radius: 4px;
        /* 圆角 */
    }

    .el-textarea__inner::-webkit-scrollbar-thumb:hover {
        background-color: #555;
        /* 悬浮时的背景色 */
    }

}



.home-box {
    height: 100vh;
    // flex: 1;
    display: flex;
    background: #fff;
    position: relative;

    .left-open {
        position: absolute;
        top: 1%;
        cursor: pointer;
        z-index: 200;
        margin-left: 10px;
        box-sizing: border-box;
        padding: 5px;

    }

    .left-open:hover {
        border-radius: 10px;
        background-color: #ededed;
    }


    .left-box {
        padding-left: 10px;
        background-color: #f9f9f9;



        .left-List-box {
            // transform: scaleX(0);
            // transform-origin: left;
            width: 0;
            overflow: hidden;
            background-color: #fff;
            // transition: transform 0.4s ease, width 0.5s ease-in-out;
            transition: width 0.5s ease-in-out;
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
                    white-space: nowrap;


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
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        border-radius: 4px;
                        height: 50px;
                        margin: 10px;
                        cursor: pointer;
                        border-radius: 8px;
                        white-space: nowrap;

                        .itme-text {
                            padding-right: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }



                        .itme-icon {
                            padding: 5px;
                            display: none;
                            position: absolute;
                            left: 90%;
                            font-size: 16px;
                            width: 16px;
                            height: 16px;
                        }


                    }


                }

                .list-text:hover {
                    border-radius: 10px;
                    background-color: #ececec;
                }

                .list-text:hover .itme-icon {
                    display: inline-block;
                }


            }

            .box-bottom {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-top: 1px solid #e4e7ed;
                height: 60px;
                white-space: nowrap;

            }

        }

        .is-left-open {
            // transform: scaleX(1);
            background-color: #f9f9f9;
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
                    font-family: 'Courier New', monospace;

                    .reasoning-text {
                        border-left: 2px solid #e5e5e5;
                        color: #8b8b8b;
                        padding: 0 0 0 13px;
                        line-height: 26px;
                        margin: 1em 0;

                        .reasoning-html {
                            font-size: 14px;
                            color: #8b8b8b;
                        }
                    }



                    .text-bubble {
                        margin: 40px 20px;
                    }
                }

            }


            .input-area {
                position: sticky;
                bottom: 0;
                background: #fff;
                width: 60%;
                margin: auto;
                transition: bottom 0.5s ease-in-out;


                .new-wrap {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                    font-weight: bold;
                    // left: 50%;
                    // top: 20%;
                    // position: absolute;
                    // margin: auto;
                    // bottom: 70%;
                    font-size: 28px;
                    color: #000;
                }


                .input-external {
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    border-radius: 24px;
                    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);

                    .input-text {
                        width: 100%;
                        // padding: 5px 0 5px 10px;

                    }

                    .input-bottom {
                        height: 36px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .input-bottom-end {
                            cursor: pointer;
                            width: 32px; // 圆的宽度
                            height: 32px; // 圆的高度
                            border-radius: 50%;
                            background-color: #d7d7d7;
                            display: flex; // 使图标居中
                            justify-content: center;
                            align-items: center;

                            i {
                                color: #f4f4f4;
                                font-size: 16px;
                            }
                        }

                        .max-number {
                            background-color: #d7d7d7;
                        }

                        .sender {
                            background-color: #000;
                        }

                        .bottom-icon {
                            cursor: pointer;
                            border-radius: 24px;
                            border: 1px solid #e4e7ed;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 5px;
                            margin-right: 5px;

                            i {
                                font-size: 16px;
                            }

                            p {
                                margin-left: 5px;
                            }
                        }

                        .bottom-icon-isthink {
                            background-color: #c4dbf8;

                            i {
                                color: #4d6bfe;
                            }

                            p {
                                color: #4d6bfe;
                            }
                        }

                        .bottom-icon:not(.bottom-icon-isthink):hover {
                            background-color: #f9f9f9;
                        }

                        // .input-bottom-start{
                        //     margin-right: 60px;
                        // }

                        // .input-bottom-end{

                        // }
                    }

                }
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