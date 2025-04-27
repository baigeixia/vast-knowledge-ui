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
                    <div class="box-text-list" v-infinite-scroll="listscroll" :infinite-scroll-immediate="false"
                        :infinite-scroll-disabled="InfoPage.noMore" :infinite-scroll-distance="25">
                        <div v-for="(group, groupName) in groups " :key="groupName">
                            <div class="group-title" v-if="group.length > 0">{{ groupName }}</div>
                            <div class="list-text" :class="{ active: info.chatSessionId === itme.id }"
                                v-for=" itme in group" :key="itme.id">
                                <div class="list-itme" @click="toChat(itme)">
                                    <!-- <div class="itme-text " v-if="editingTitleId === itme.id"> -->
                                    <div class="itme-text itme-text-input" v-if="editingTitleId === itme.id">
                                        <el-input v-model="newTitle" size="small" @blur="confirmRename(itme)"
                                            @keyup.enter="confirmRename(itme)" />
                                    </div>
                                    <div v-else :title="itme.title" class="itme-text">
                                        {{ !itme.title ? "无标题" : itme.title }}
                                    </div>

                                    <el-dropdown class="itme-icon" popper-class="itme-icon-popper" placement="bottom"
                                        trigger="click" :teleported="false" :persistent="false" @click.stop.prevent>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                d="M3 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click.stop="upTitleclick(itme)">重命名</el-dropdown-item>
                                                <el-dropdown-item @click.stop="deTitleclick(itme)">删除</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </div>
                            </div>
                        </div>
                        <div v-if="InfoPage.loading" class="loading-animation  loading-bottom ">
                            <div class="dot-pulse"></div>
                            <div class="dot-pulse"></div>
                            <div class="dot-pulse"></div>
                            <div class="dot-pulse"></div>
                            <div class="dot-pulse"></div>
                            <div class="dot-pulse"></div>
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
                <RouterLink to="/">
                    <div class="logo">
                        <img src="/src/assets/img/logo.svg" alt="logo">
                    </div>
                </RouterLink>
                <div class="model">
                    <el-dropdown class="dropdown-model" popper-class="itme-icon-popper" placement="bottom" trigger="click"
                        :teleported="false" :persistent="false">
                        <div class="display-model">
                            <span class="name"> {{ aimodelAppS?.topModel.modelName }}</span>
                            <div class="icon">
                                <i class="bi bi-chevron-compact-down"></i>
                            </div>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in aimodelAppS.modelList" :key="item.id"
                                    @click="upTopModel(item)">
                                    {{ item.modelName }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

            <div class="chat-container">
                <div class="messages-box" ref="messagesRef" @scroll="handleScroll">
                    <div v-if="conversationPage.loading" class="loading-animation">
                        <div class="dot-pulse"></div>
                        <div class="dot-pulse"></div>
                        <div class="dot-pulse"></div>
                        <div class="dot-pulse"></div>
                        <div class="dot-pulse"></div>
                        <div class="dot-pulse"></div>
                    </div>
                    <div class="text-typewriter" :class="{ 'text-typewriter-right': item.role === 'user' }"
                        v-for=" (item, index)  in aiInfoAppS.conversationList?.content" :key="item.id" :data-id="item.id">
                        <div class="reasoning-text">
                            <article class="reasoning-html markdown-body" v-html="markedHtml(item.thinkingContent)">
                            </article>
                        </div>
                        <article class=" html-right html-highlight  markdown-body" v-html="markedHtml(item.content)">
                        </article>
                        <div v-if="index === aiInfoAppS.conversationList?.content.length - 1" ref="bottomMarker"></div>
                    </div>
                    <div class="assistant-loading" v-if="senderLoading">
                        <div class="typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
                <div class="input-area" :class="{ 'input-area-center': isNewChat }">
                    <div class="new-wrap" v-show="isNewChat">
                        有什么可以帮忙的？
                    </div>
                    <div class="input-external">
                        <div class="input-text">
                            <el-input class="internal-textarea" v-model="inputContent" @keydown.enter="handleEnter"
                                :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="询问任何内容"
                                resize="none" />
                        </div>
                        <div class="input-bottom">
                            <div class="input-bottom-start">
                                <div class="bottom-icon" @click="clickthinking()"
                                    :class="{ 'bottom-icon-isthink': info.thinkingEnabled }">
                                    <!-- <el-icon>
                                        <Cpu />
                                    </el-icon> -->
                                    <i class="bi bi-infinity"></i>
                                    <p>深度思考</p>
                                </div>
                            </div>
                            <div class="input-bottom-end" @click="canSubmit && !senderLoading ? handleSubmit() : null"
                                :class="{ 'sender': canSubmit || senderLoading }"
                                :style="{ pointerEvents: canSubmit ? 'auto' : 'none' }">
                                <i v-if="senderLoading" class="bi bi-diamond"></i>
                                <!-- <i v-else class="bi bi-stop-circle-fill"></i> -->
                                <i v-else class="bi bi-caret-up-fill"></i>
                            </div>
                        </div>
                    </div>
                    <!-- <el-button @click="handleSubmit">发送</el-button> -->
                </div>
                <div class="tips-text">内容由 AI 生成，请仔细甄别</div>
            </div>
        </div>

        <el-dialog class="box-dialog" v-model="dialogVisible" top="35vh" width="500" :before-close="handleClose">
            <template #header>
                <div class="box-dialog-header">
                    <span>删除聊天？</span>
                </div>
            </template>
            <template #default>
                <div class="box-dialog-default">
                    这会删除
                    <span>{{ `“${dialogdeTitle.title ?? ""}”。` }}</span>
                </div>
            </template>
            <template #footer>
                <div class="dialog-footer">
                    <el-button class="close" @click="handleClose" round>取消</el-button>
                    <el-button class="delete" type="danger" round @click="handledelete">
                        删除
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch, reactive, computed, toRaw, onUpdated } from "vue"
// import AiMarkdown from './components/AiMarkdown.vue'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Marked, Renderer } from 'marked';
import { safeHtml } from '@/utils/domPurifyConfig'
import { ElNotification } from 'element-plus'
import hljs from 'highlight.js';
import 'github-markdown-css';
import 'highlight.js/styles/a11y-light.css';
import { markedHighlight } from "marked-highlight";
import aimodelAppStore from '@/stores/ai/model'
import aimessageAppStore from '@/stores/ai/message'
import aiInfoAppStore from '@/stores/ai/info'
const aimodelAppS = aimodelAppStore()
const aimessageAppS = aimessageAppStore()
const aiInfoAppS = aiInfoAppStore()
import { useRouter } from 'vue-router';
const router = useRouter();
import { getToken } from '@/utils/auth'
import { getTimeGroup } from '@/utils/formDate'


// const marked = new Marked(
//     markedHighlight({
//         emptyLangClass: 'hljs',
//         langPrefix: 'hljs language-',
//         highlight(code, lang, info) {
//             const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//             return hljs.highlight(code, { language }).value;
//         }
//     })
// )

const groups = ref({
    '今天': [],
    '昨天': [],
    '7天前': [],
    '30天前': [],
    '更久': []
});

const renderer = new Renderer();

renderer.code = (code) => {
    const validLang = code.lang ? code.lang : 'plaintext';
    return `
    <div class="code-block">
      <div class="code-block-wrap">
        <div class="code-toolbar">
            <span class="lang-label">${validLang}</span>
            <button class="copy-btn"><i class="bi bi-files"></i>复制</button>
        </div>
      </div>
      <pre><code class="hljs language-${validLang}">${code.text}</code></pre>
    </div>
  `;
};

const marked = new Marked(
    markedHighlight({
        highlight(code, lang, info) {
            const validLang = hljs.getLanguage(lang) ? lang : 'plaintext'
            const highlighted = hljs.highlight(code, { language: validLang }).value
            return highlighted;
        }
    }),
    { renderer }
)



// document.addEventListener('click', function (e) {
//     if (e.target.classList.contains('copy-btn')) {
//         const code = e.target.closest('.code-block').querySelector('code').innerText;
//         navigator.clipboard.writeText(code).then(() => {
//             e.target.innerHTML = '<i class="bi bi-check2"></i> 已复制';
//             setTimeout(() => {
//                 e.target.innerHTML = '<i class="bi bi-files"></i> 复制';
//             }, 1000);
//         });
//     }
// });

document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest('.copy-btn'); // 关键改动
    if (copyBtn) {
        const code = copyBtn.closest('.code-block').querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerHTML = '<i class="bi bi-check2"></i> 已复制';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="bi bi-files"></i> 复制';
            }, 1000);
        });
    }
});


function handleCopyClick(e) {
    const btn = e.target.closest('.copy-btn')
    if (btn) {
        const code = decodeURIComponent(btn.getAttribute('data-code'))
        navigator.clipboard.writeText(code).then(() => {
            btn.innerText = '已复制'
            setTimeout(() => (btn.innerText = '复制'), 1500)
        })
    }
}

// 发送内容对象
const info = reactive({
    chatSessionId: null,
    parentMessageId: null,
    modelId: null,
    prompt: null,
    refFileIds: null,
    thinkingEnabled: false,
    searchEnabled: false,
})

const InfoPage = reactive({
    loading: false,
    noMore: false,
    offset: 1,
    limit: 15,
})

const conversationPage = reactive({
    loading: false,
    noMore: false,
    offset: 0,
    limit: 6,
})

const userList = ref({})

const dialogVisible = ref(false)
const dialogdeTitle = reactive({
    id: '',
    title: '',
})

// 输出框是否可用
const canSubmit = computed(() => {
    return inputContent.value && inputContent.value.length <= 20000;
})

// 侧边控制
const isCollapse = ref(true)
//新窗口
const isNewChat = ref(false)
// 消息加载
const senderLoading = ref(false)

const editingTitleId = ref(null)
const newTitle = ref(null)
const inputContent = ref('')

const messagesRef = ref(null)


const bottomMarker = ref(null) // 最后一个元素的 ref

const props = defineProps({
    chatid: {
        type: String,
        required: false,
        default: ''
    },
})

let hasScrolledToBottom = false

onUpdated(() => {
    if (hasScrolledToBottom) return;
    nextTick(() => {
        if (bottomMarker.value) {
            console.log("bottomMarker.value", bottomMarker.value);
            if (bottomMarker.value[0]) {
                bottomMarker.value[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })

                hasScrolledToBottom = true;
            }
        }
    })
})

// watch(
//     () => bottomMarker.value,
//     () => {
//         nextTick(() => {
//             if (bottomMarker.value) {
//                 console.log("bottomMarker.value",bottomMarker.value);
//                 if (bottomMarker.value[0]) {
//                     bottomMarker.value[0].scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'start',
//                     })
//                 }
//             }
//         })
//     },
// )


watch(
    () => props.chatid,
    (newVal, oldVal) => {
        if (newVal) {
            getConversationList(newVal, true)
            hasScrolledToBottom = false;

        }
    },
)

onMounted(async () => {

    aiInfoAppS.conversationList = {
        content: []
    }

    document.title = "AiDigHub"
    getModelS()
    getUserList()
    const chatid = props.chatid
    if (chatid) {
        //有值获取消息列表
        newChart(chatid)
        getConversationList(chatid, true)
    } else {
        // 新聊天
        isNewChat.value = true
        // 默认打开侧边
        isCollapse.value = true
    }
    // nextTick(() => {
    //     //顶部加载
    //     messagesRef.value.addEventListener('scroll', handleScroll)
    // })
})

let timeScroll = null;
// 顶部加载
const handleScroll = () => {
    if (messagesRef.value) {
        if (messagesRef.value.scrollTop >= 10) return;
    }

    if (conversationPage.noMore) {
        return
    }

    if (timeScroll) {
        clearTimeout(timeScroll)
        timeScroll = null
    }


    timeScroll = setTimeout(async () => {
        if (conversationPage.loading) return;

        conversationPage.loading = true

        const message = messagesRef.value;
        const oldHeight = message.scrollHeight;

        if (message.scrollTop < 10) {
            try {
                await Conversationlistscroll()
                nextTick(() => {
                    message.scrollTop = (message.scrollHeight - oldHeight) - 70;
                });
            } catch (e) {
                console.error("加载对话失败", e)
            }
        }

        conversationPage.loading = false

    }, 300)
}

const upTitleclick = async (itme) => {
    editingTitleId.value = itme.id
    newTitle.value = itme.title // 预填原始值

}

const deTitleclick = (itme) => {
    dialogVisible.value = true
    dialogdeTitle.id = itme.id // 预填原始值
    dialogdeTitle.title = itme.title // 预填原始值
}

const handleClose = () => {
    dialogVisible.value = false
    dialogdeTitle.title = ''
}
const handledelete = async () => {
    await aimessageAppS.deChat(dialogdeTitle.id)
    getUserList(true)

    dialogVisible.value = false
}

const confirmRename = async (itme) => {
    if (!newTitle.value.trim()) {
        ElMessage.warning('标题不能为空')
        return
    }

    // 调用接口或本地更新

    itme.title = newTitle.value.trim()

    await aimessageAppS.upTitle(itme.id, itme.title)

    // await api.updateTitle(itme.id, newTitle.value)

    editingTitleId.value = null
    newTitle.value = ''
}


const Conversationlistscroll = async () => {
    if (!conversationPage.noMore) {
        conversationPage.offset = conversationPage.offset + 1
        await getConversationList(info.chatSessionId, false);
        //顶部加载  从上 填充数据
        // const conversationData = await aiInfoAppS.getConversation(id, conversationPage.offset, conversationPage.limit)

    }
}

const getConversationList = async (id, isReply) => {
    const conversationData = await aiInfoAppS.getConversation(id, conversationPage.offset, conversationPage.limit)
    if (conversationData) {
        conversationPage.noMore = !conversationData.hasNext ?? false
        if (conversationData.infoData?.currentMessageId != 1) {
            document.title = conversationData.infoData.title
            if (!aiInfoAppS.conversationList || aiInfoAppS.conversationList.content === 0) {
                // 如果为空，直接赋值
                aiInfoAppS.conversationList = infoData
            } else {
                // 如果不为空，将新数据合并
                if (isReply) {
                    aiInfoAppS.conversationList = {
                        ...aiInfoAppS.conversationList,
                        content: [...aiInfoAppS.conversationList.content, ...conversationData.content,]
                    }
                } else {
                    //加载
                    aiInfoAppS.conversationList = {
                        ...aiInfoAppS.conversationList,
                        content: [...conversationData.content, ...aiInfoAppS.conversationList.content]
                    }
                }

            }

            // aiInfoAppS.conversationList = conversationData
        }
    } else {
        router.push({ name: 'ai' })
    }
}

const getUserList = async (isResh = false) => {
    if (InfoPage.noMore && !isResh) return

    const newgroups = {
        '今天': [],
        '昨天': [],
        '7天前': [],
        '30天前': [],
        '更久': []
    }

    const infoData = await aiInfoAppS.getInfolist(InfoPage.offset, InfoPage.limit)
    if (!infoData || infoData?.records.length === 0) {
        InfoPage.noMore = true
    } else {
        if (isResh || !userList.value.records || userList.value.records.length === 0) {
            // 如果为空，直接赋值
            userList.value = infoData
        } else {
            // 如果不为空，将新数据合并到 records 中
            userList.value.records = [...userList.value.records, ...infoData.records];
        }
    }

    userList.value?.records.forEach(itme => {
        // groups.value[group]=[]
        const group = getTimeGroup(itme.creatingTime);
        newgroups[group].push(itme);
    });

    groups.value = newgroups;

}

let timeInfoPage = null;
const listscroll = async () => {
    if (InfoPage.loading || InfoPage.noMore) return;

    if (timeInfoPage) {
        clearTimeout(timeInfoPage)
        timeInfoPage = null
    }


    timeInfoPage = setTimeout(async () => {
        if (InfoPage.loading) return;
        InfoPage.loading = true

        InfoPage.offset = InfoPage.offset + 1
        await getUserList();

        InfoPage.loading = false
    }, 300)
}



const getModelS = async () => {
    await aimodelAppS.getModelList()
    if (aimodelAppS.topModel) {
        const { id, isThink, isSearch } = aimodelAppS.topModel
        info.modelId = id
        info.thinkingEnabled = isThink
        info.searchEnabled = isSearch
    }


}

const clickthinking = () => {
    const { isThink, modelName } = aimodelAppS.topModel
    if (isThink) {
        info.thinkingEnabled = !info.thinkingEnabled
    } else {
        ElNotification({
            message: h('i', { style: 'color: teal; --el-notification-width: none;' }, `${modelName}不支持深度思考`),
            duration: 1500,
        })
    }
}

const upTopModel = (model) => {
    aimodelAppS.topModel = model
    //模型id更新
    const { id, isThink, isSearch } = model
    info.modelId = id
    info.thinkingEnabled = isThink
    info.searchEnabled = isSearch
}

const toChat = async (itme) => {
    // console.log(itme.title);
    if (itme.id === info.chatSessionId) return
    isNewChat.value = false
    conversationPage.offset = 0
    conversationPage.limit = 6

    info.chatSessionId = itme.id
    info.parentMessageId = itme.currentMessageId


    aiInfoAppS.conversationList = {
        content: []
    }

    router.push({
        name: 'ai',
        params: { chatid: itme.id }
    })

    document.title = itme.title


    // await getConversationList(itme.id)

}
//新聊天 
const newchatclick = () => {
    document.title = "新聊天"

    isNewChat.value = true
    info.chatSessionId = null
    info.parentMessageId = null

    // conversationList.value = {
    //     content: []
    // }
    aiInfoAppS.conversationList = {
        content: []
    }

    router.push({ name: 'ai' })
}

//侧边控制
const handleOpen = () => {
    isCollapse.value = !isCollapse.value
}

// 发送间隔
let timeValue = null
// 发送 内容
const handleSubmit = async () => {
    if (!inputContent) {
        ElMessage.warning(`发点什么吧`)

        return
    }
    if (!canSubmit.value) {
        ElMessage.warning(`字数过大`)
        return
    }
    // 禁用发送按钮
    canSubmit.value = false

    // 清除之前的定时器，防止多次触发
    if (timeValue) {
        clearTimeout(timeValue)
        timeValue = null
    }

    //新窗口
    if (isNewChat.value) {
        isNewChat.value = false
        await newChart()
    }

    // 发送内容 侧边收起
    // isCollapse.value = false
    // 开启加载

    timeValue = setTimeout(async () => {
        // 可以在控制台 查看打印结果
        console.log('submit-> inputContent', inputContent.value)
        try {
            info.prompt = inputContent.value
            inputContent.value = ''
            getreply()
            info.prompt = null
        } catch (error) {
            console.error('获取回复失败:', error)
            ElMessage.error('发送失败，请稍后重试')
        } finally {
            canSubmit.value = true
            timeValue = null
            // info.parentMessageId = (info.parentMessageId) ? 1 : info.parentMessageId + 1
            info.parentMessageId = info.parentMessageId + 1
        }
    }, 100)
}

const newChart = async (id) => {
    const chatinfo = await aimessageAppS.createChat(id)
    if (!chatinfo) router.push({
        name: 'ai',
    })

    info.chatSessionId = chatinfo.id
    info.parentMessageId = chatinfo.currentMessageId
    router.push({
        name: 'ai',
        params: { chatid: chatinfo.id }
    })
    // return chatinfo
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

class RetriableError extends Error { }
class FatalError extends Error { }
const maxRetries = 5;
let retryCount = 0;

const getreply = async () => {
    if (senderLoading.value) return

    senderLoading.value = true

    aiInfoAppS.conversationList.content.push({
        role: 'user',
        infoId: info.chatSessionId,
        content: info.prompt
    })


    aiInfoAppS.conversationList.content.push({
        role: 'assistant',
        infoId: info.chatSessionId,
        thinkingContent: '',
        content: ''
    })

    try {
        await fetchEventSource(`${import.meta.env.VITE_APP_BASE_API}/ai/chat/stream-chat`, {
            openWhenHidden: true,
            method: 'POST',
            headers: {
                'authorization': getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toRaw(info)),
            async onopen(response) {
                const contentType = response.headers.get('content-type');

                if (response.ok && contentType === 'text/event-stream') {
                    retryCount = 0; // reset retry count on success
                    return;
                }

                // Non-retriable errors:
                if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                    throw new FatalError(`Client error: ${response.status}`);
                }

                // 5xx errors are considered fatal in your case:
                if (response.status >= 500) {
                    throw new FatalError(`Server error: ${response.status}`);
                }

                // Other retriable cases (like 429, network error, etc.)
                throw new RetriableError(`Temporary issue: ${response.status}`);
            },
            onmessage(msg) {
                if (msg.event === 'FatalError') {
                    throw new FatalError(msg.data);
                }
                const message = JSON.parse(msg.data)

                if (message?.r) {
                    appendToLastAssistant(info.chatSessionId, 'thinkingContent', message.r);
                } else if (message?.v) {
                    appendToLastAssistant(info.chatSessionId, 'content', message.v);
                }
            },
            onclose() {
                console.log("EventStream onclose");
                if (info.parentMessageId === 2) {
                    getUserList(true)
                }
                info.parentMessageId = info.parentMessageId + 1
                // if (streamEndedNormally) {
                //     console.log("连接正常关闭");
                //     // 不抛错，不重试
                // } else {
                //     console.warn("连接异常中断，准备重试");
                //     throw new RetriableError("连接异常关闭");
                // }
                // throw new RetriableError("Connection closed");
            },
            onerror(err) {
                console.log("err：", err.message);
                throw new FatalError("Too many retries");

                // if (err instanceof FatalError) {
                //     console.error("Fatal error, stopping:", err.message);
                //     throw err; // stops retry
                // }

                // retryCount++;
                // console.warn(`Retry attempt ${retryCount}/${maxRetries}`);

                // if (retryCount >= maxRetries) {
                //     console.error("Max retries reached, stopping.");
                //     throw new FatalError("Too many retries");
                // }
            }
        })

    } finally {
        senderLoading.value = false
    }
}

const appendToLastAssistant = (id, key, value) => {
    // const target = conversationList.value.content.slice().reverse().find(
    //     item => item.role === 'assistant' && item.infoId === id
    // )
    const target = aiInfoAppS.conversationList.content.slice().reverse().find(
        item => item.role === 'assistant' && item.infoId === id
    )
    if (target) {
        target[key] = (target[key] || '') + value
    }
}

const markedHtml = (content) => {
    if (content) {
        const html = marked.parse(content);
        return safeHtml(html)
    }
}

const scrollToLastMessage = async () => {
    nextTick(() => {
        if (bottomMarker.value) {
            bottomMarker.value.scrollIntoView({ behavior: 'smooth' });
        }
    });

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/highlight.scss";
@import "@/assets/styles/loading.scss";

.loading-bottom {
    min-height: 60px;
    position: static;
    transform: none;
    bottom: 0;
    left: 0;
    top: 0;
    // padding: 20px 0;
}

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

    :deep(.box-dialog) {
        border-radius: 24px;

        .box-dialog-header {
            font-weight: bold;
            font-size: 1.2rem;
            color: #000;
        }

        .box-dialog-default {
            font-size: 1rem;
            color: #000;

            span {
                font-weight: bold;
            }
        }

        .dialog-footer {
            .close {
                --el-button-hover-border-color: #ececec;
                --el-button-hover-bg-color: #ececec;
                --el-button-hover-text-color: #000;
            }

            .delete {
                --el-button-hover-border-color: #911e1b;
                --el-button-hover-bg-color: #911e1b;
            }
        }
    }

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

                .box-text-list {


                    .group-title {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        height: 50px;
                        margin: 10px;
                        font-weight: bold;
                        color: #000;
                        // border-bottom: 1px solid #e4e7ed;
                        border-top: 1px solid #e4e7ed;
                    }

                    // .group-title:first-child {
                    //     border-top: none;
                    //     /* 取消第一个 .group-title 的 border-top */
                    // }

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

                            .itme-text-input {
                                width: 80%;

                                .el-input {
                                    width: 100%;
                                    /* 让宽度填满父容器 */
                                }
                            }



                            .itme-icon {
                                // pointer-events: none;
                                // padding: 10px;
                                display: none;
                                position: absolute;
                                left: 90%;
                                font-size: 16px;
                                width: 16px;
                                height: 16px;
                                // visibility: hidden;
                                // pointer-events: none;
                                // transition: opacity 0.2s ease;
                            }


                        }


                    }
                }

                // .list-text:hover .itme-icon,
                // .list-text.active .itme-icon {
                //     display: inline-block;
                // }

                .list-text.active {
                    border-radius: 10px;
                    background-color: #ececec;
                }



                .list-text:hover {
                    border-radius: 10px;
                    background-color: #ececec;
                }

                .list-text.active .itme-icon {
                    display: inline-block;
                }

                // .list-text:hover .itme-icon {
                //     display: inline-block;
                // }
                .list-text:active .list-itme .itme-icon {
                    display: inline-block;
                }

                .list-text:hover .list-itme .itme-icon {
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
                cursor: pointer;

                img {
                    height: 32px;
                }
            }

            .model {
                margin-left: 16px;
                font-weight: 500;
                color: #303133;

                .dropdown-model {
                    .display-model {

                        padding: 10px;
                        color: #000;
                        display: flex;
                        cursor: pointer;

                        .name {
                            margin-right: 10px;
                        }
                    }

                    .display-model:hover {
                        box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
                        background-color: #e7e6e6;
                        border-radius: 18px;

                    }
                }

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
                // padding: 0 20px 20px 20px;


                .text-typewriter {
                    margin: 20px auto;
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

                .assistant-loading {
                    width: 60%;
                    margin: auto;

                    .typing-indicator {
                        display: flex;
                        gap: 4px;
                        padding: 10px 16px;
                        justify-content: flex-start;
                    }

                    .typing-indicator span {
                        width: 8px;
                        height: 8px;
                        background-color: #999;
                        border-radius: 50%;
                        animation: blink 1.4s infinite both;
                    }

                    .typing-indicator span:nth-child(2) {
                        animation-delay: 0.2s;
                    }

                    .typing-indicator span:nth-child(3) {
                        animation-delay: 0.4s;
                    }

                    @keyframes blink {

                        0%,
                        80%,
                        100% {
                            opacity: 0;
                        }

                        40% {
                            opacity: 1;
                        }
                    }
                }

                .text-typewriter-right {
                    text-align: right;
                    // direction: rtl;

                    .html-right {
                        max-width: 50%;
                        background-color: #f4f4f4;
                        padding: 15px;
                        border-radius: 1.5rem;
                        display: inline-block;
                        word-wrap: break-word;
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