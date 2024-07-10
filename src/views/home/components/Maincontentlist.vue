<template>
    <div class="content-list">
        <el-skeleton class="skeleton" animated :loading="mainLoading">
            <template #template>
                <div class="main-skeleton">
                    <el-skeleton-item variant="h1" />
                    <el-skeleton-item variant="h1" style="margin-bottom: 5px;" />
                    <div class="skeleton-right">
                        <el-skeleton-item variant="image" style="width:20%; height: 90px; margin-bottom: 10px;" />
                        <div class="skeleton-right-p">
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                        </div>
                    </div>
                    <div class="skeleton-bottom-p">
                        <el-skeleton-item variant="p" style="width: 40%;" />
                        <el-skeleton-item variant="p" style="width: 40%;" />
                    </div>
                </div>
                <div class="main-skeleton">
                    <el-skeleton-item variant="h1" />
                    <el-skeleton-item variant="h1" style="margin-bottom: 5px;" />
                    <div class="skeleton-right">
                        <el-skeleton-item variant="image" style="width:20%; height: 90px; margin-bottom: 10px;" />
                        <div class="skeleton-right-p">
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                        </div>
                    </div>
                    <div class="skeleton-bottom-p">
                        <el-skeleton-item variant="p" style="width: 40%;" />
                        <el-skeleton-item variant="p" style="width: 40%;" />
                    </div>
                </div>
                <div class="main-skeleton">
                    <el-skeleton-item variant="h1" />
                    <el-skeleton-item variant="h1" style="margin-bottom: 5px;" />
                    <div class="skeleton-right">
                        <el-skeleton-item variant="image" style="width:20%; height: 90px; margin-bottom: 10px;" />
                        <div class="skeleton-right-p">
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                            <el-skeleton-item variant="p" />
                        </div>
                    </div>
                    <div class="skeleton-bottom-p">
                        <el-skeleton-item variant="p" style="width: 40%;" />
                        <el-skeleton-item variant="p" style="width: 40%;" />
                    </div>
                </div>
            </template>
            <div class="content-skeleton-item" v-for="content in  contents" :key="content.id">
                <div class="content-skeleton-main" @click="router.push(`/post/${content.id}`)">
                    <!-- <div class="title-row" v-html=" content.title">{{ content.title }}</div> -->
                    <div class="title-row" v-html="escapeHtml(content.title)"></div>
                    <div class="row-text">
                        <img class="thumb" :src="content.thumb">
                        <div class="abstract" v-html="escapeHtml(content.abstract)"></div>
                    </div>
                </div>
                <div class="row-footer">
                    <div class="action-list">
                        <div class="item-li">
                            <RouterLink to="/user" class="user-message">
                                <div class="user-popover">{{ content.author.username }}</div>
                            </RouterLink>
                        </div>
                        <div class="item-li view">
                            <el-icon>
                                <View />
                            </el-icon>
                            <span> {{ content.browse }}</span>
                        </div>
                        <div class="item-li like">
                            <i class="bi bi-suit-heart"></i>
                            <span> {{ content.like }}</span>
                        </div>
                        <div class="dislike-item">
                            <el-icon>
                                <More />
                            </el-icon>
                        </div>
                        <div class="item-li">
                            <el-dropdown class="dropdown-menu">
                                <div><i class="bi bi-three-dots dots"></i></div>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <div @click="dislike(content.id)">不感兴趣</div>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <div @click="report(content.id)">举报</div>
                                            <!-- <div @click="reportdialog=true">举报</div> -->
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                    <div class="row-footer-tags">
                        <a class="footer-tag " :href='tag.url' v-for="tag in content.tags" :key="tag.id">{{ tag.name
                            }}</a>
                    </div>
                </div>
            </div>
        </el-skeleton>
        <el-dialog class="report-dialog" v-model="reportdialog" title="举报" width="650"
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
                    <el-button :disabled="!reporting" type="primary" round @click="reportsubmit()">
                        提交举报
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue"
import { escapeHtml } from '@/utils/escapeHtml'
import { useRouter } from 'vue-router';

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

const reporting = ref(null)
const reportdialog = ref(false);
const reportuserid = ref('')

const reportsubmit = () => {
    console.log('举报理由', reporting.value)
    if (reporting.value) {
        ElMessage.success('已提交举报申请')
    } else {
        ElMessage.warning('请选择举报理由')
    }
    console.log('id',reportuserid.value,'举报',reporting.value);
    reportdialog.value = false
    reporting.value = ''
    reportuserid.value=''
}

const reportdialogClose = () => {
    reportdialog.value = false
    reporting.value = null
    reportuserid.value=''
}

const dislike = (id) => {
    console.log('不喜欢', id);
}


const report = (id) => {
    console.log('举报', id);
    reportdialog.value=true
    reportuserid.value=id
}


const router = useRouter();
const mainLoading = ref(true)

onMounted(() => {
    nextTick(() => {
        mainLoading.value = false;
    });

})


const props = defineProps({
    contents: {
        type: Array, // 定义接收的数据类型
        required: true // 是否必须传递
    },
});

</script>

<style lang="scss" scoped>


.content-list {
    flex: 1;
    background-color: #fff;

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

    .skeleton {
        .main-skeleton {
            padding: 12px 20px;

            .skeleton-bottom-p {
                display: flex;
                justify-content: space-between;
            }

            .skeleton-right {
                display: flex;
                align-items: center;

                .skeleton-right-p {
                    width: 80%;
                    margin-left: 10px;
                }
            }
        }
    }

    .content-skeleton-item:hover {
        background-color: #f7f8fa;

        .row-footer {
            .action-list {
                .item-li {
                    .dots {
                        display: block;
                    }
                }
            }
        }

    }

    .content-skeleton-item {
        // display: flex;
        transition: all .3s ease-in;
        cursor: pointer;
        position: relative;
        background: #fff;
        padding: 12px 20px 0;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #f1f2f5;

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

                .like {
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
    }
}
</style>
