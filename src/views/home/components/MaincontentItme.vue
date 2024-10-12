<template>
    <div class="content-skeleton-main" @click="openInNewTab(content.id)">
        <div class="title-row" v-html="content.title"></div>
        <div class="row-text">
            <img v-if="content.images" class="thumb" :src="content.images">
            <!-- <div class="abstract" v-html="escapeHtml(content.simpleDescription)"></div> -->
            <div class="abstract">{{ content.simpleDescription }}</div>
        </div>
    </div>
    <div class="row-footer">
        <div class="action-list">
            <div class="item-li">
                <RouterLink :to="`/user/${content.authorId}`" class="user-message">
                    <div class="user-popover">{{ content.authorName }}</div>
                </RouterLink>
            </div>
            <div class="item-li view" >
                <el-icon>
                    <View />
                </el-icon>
                <span> {{ content.views }}</span>
            </div>
            <div class="item-li item-li-like " v-if="content.authorId == userinfoAppStores.userid">
                <i class="bi bi-heart-fill noLike"></i>
                <span> {{ content.likes }}</span>
            </div>
            <div v-else class="item-li item-li-like " @click="Articlelike(content.id, content.authorId, content.authorName, 0)">
                <i class="bi" :class="iconClass"></i>
                <span> {{ content.likes }}</span>
            </div>
            <!-- <div class="dislike-item">
                <el-icon>
                    <More />
                </el-icon>
            </div> -->
            <div class="item-li">
                <el-dropdown class="dropdown-menu" trigger="click">
                    <div><i class="bi bi-three-dots dots"></i></div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="dislike(content.id)">
                                <div>不感兴趣</div>
                            </el-dropdown-item>
                            <el-dropdown-item @click="report(content.id)">
                                <div>举报</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <el-dialog class="report-dialog" v-model="reportdialog" :lock-scroll="false" title="举报" width="650"
        :before-close="reportdialogClose">
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
                <el-button :disabled="!reporting" type="primary" round
                    @click="reportsubmit(content.id, content.authorId, content.authorName)">
                    提交举报
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, ref, nextTick, computed, reactive } from "vue"
import { escapeHtml } from '@/utils/escapeHtml'
import { ElMessage } from 'element-plus'

import notificationAppStore from "@/stores/admin/notification";
const notificationS = notificationAppStore()
import reportAppStore from "@/stores/user/report";
const reportAppStores = reportAppStore()
import articleAppStore from "@/stores/admin/article";
const articleStore = articleAppStore()
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();
import behaviourAppStore from "@/stores/collection/behaviour"
const behaviourAppStoreS = behaviourAppStore();

import { useRouter } from 'vue-router';

const router = useRouter();

const openInNewTab = (contentid) => {
    const path = `/post/${contentid}`;
    router.push(path)
    // const url = router.resolve(path).href;
    // window.open(url);
    // window.open(url, '_blank');
}


const Articlelike = (id, authorId, authorName, type) => {
    notificationS.likeArticle(id, authorId, authorName, type)
    behaviourAppStoreS.postoperation.set(props.content.id, noislikeArticle.value ? 0 : 1)
    noislikeArticle.value ? props.content.likes-- : props.content.likes++
}


const props = defineProps({
    content: {
        type: Object, // 定义接收的数据类型
        required: true,// 是否必须传递
    },
});

const noislikeArticle = computed(() => (behaviourAppStoreS.postoperation.get(props.content.id) ?? 1) == 1)


const iconClass = computed(() => {
  return {
    'bi-heart-fill islike': !noislikeArticle.value,
    'bi-heart like': noislikeArticle.value
  };
});



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

// const islikeArticle = ref(false)




const reporting = ref(null)
const reportdialog = ref(false);
const reportuserid = ref('')

const reportsubmit = (contentid, authorId, authorName) => {
    if (reporting.value) {
        reportAppStores.userReportSeve(authorId, authorName, contentid, reporting.value)
        ElMessage.success('已提交举报申请')
    } else {
        ElMessage.warning('请选择举报理由')
    }
    // console.log('id', reportuserid.value, '举报', reporting.value);
    reportdialog.value = false
    reporting.value = ''
    reportuserid.value = ''
}

const reportdialogClose = () => {
    reportdialog.value = false
    reporting.value = null
    reportuserid.value = ''
}

const dislike = (id) => {
    console.log('不喜欢', id);
    ElMessage.success("已减少此类内容出现")
}


const report = (id) => {
    reportdialog.value = true
    reportuserid.value = id
}




</script>

<style lang="scss" scoped>
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
            text-align: center;
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

.content-skeleton-main {

    // flex: 1 1 auto;
    .title-row {
        font-weight: 600;
        font-size: 18px;
        line-height: 1.6;
        display: flex;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }


    .row-text {
        margin-top: 10px;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        line-height: 1.8;
        font-size: 15px;

        .thumb {
            flex: 0 0 auto;
            // width: 120px;
            height: 90px;
            margin-right: 24px;
            background-color: #ffffff;
            border-radius: 4px;
            border: 1px solid #f1f2f5;
            

        }

        .abstract {
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
}

.row-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 10px;

    .row-footer-tags {
        display: flex;
        flex-direction: row;
        align-items: center;

        .footer-tag {
            background-color: #f2f3f5;
            // padding: 0 6px;
            border-radius: 2px;
            // max-width: 76px;
            box-sizing: border-box;
            margin-left: 6px;
            color: #8a919f;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            min-height: 18px;
            line-height: 18px;
        }

        .footer-tag:hover {
            color: #1e80ff;
        }

        // .width-limited {
        //   // max-width: 65px;
        // }
    }

    .action-list {
        display: flex;
        align-items: center;

        .dislike-item {
            display: none;
        }

        .like:hover {
            color: #1e80ff;
        }

        .noLike {
            color: #bdbfc2;
            cursor: default;
        }



        .islike {
            color: #1e80ff;
        }

        .item-li-like {
            color: #000;
        }

        .view {
            cursor: default;
        }


        .item-li {
            display: flex;
            align-items: center;
            position: relative;
            margin-right: 24px;
            font-size: 13px;
            line-height: 20px;
            color: #8a919f;
            flex-shrink: 0;

            .dropdown-menu {
                .menu-item {
                    line-height: 40px;
                    box-sizing: border-box;
                    cursor: pointer;
                    display: block;
                    padding: 0 20px;
                    text-align: left;
                }
            }


            .dots {
                display: none;
                cursor: pointer;
            }

            .el-icon {
                font-size: 16px;
            }

            span {
                margin-left: 4px;
            }

            .user-message {
                display: flex;
                align-items: center;
                // max-width: 132px;
                font-size: 13px;
                line-height: 22px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                color: #8a919f;

                .user-popover {
                    display: inline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 10px;

                }
            }

            .user-message :hover {
                color: #1e80ff;
            }

        }
    }
}
</style>
