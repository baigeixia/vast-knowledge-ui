<template>
    <div class="content-list">
        <el-skeleton class="skeleton" animated :loading="articleS.isLoadingEnd && !contents.length  ">
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
            <div class="content-skeleton-item" v-for="content in  localContents" :key="content.id"  >
                <MaincontentItme :content="content" @dislikeArticle="dislikeArticle"/>
            </div>
            <el-skeleton class="skeleton" animated :loading="articleS.isLoadingEnd && contents.length > 0">
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
                </template>
            </el-skeleton>
        </el-skeleton>
    </div>
</template>

<script setup>
import MaincontentItme from './MaincontentItme.vue';
import articleAppStore from "@/stores/admin/article";
import { ref } from 'vue';
const articleS = articleAppStore()

const props = defineProps({
    contents: {
        type: Array, // 定义接收的数据类型
        required: true,// 是否必须传递
        default: () => []
    },
});

const localContents = ref([...props.contents]);

const dislikeArticle =  (id) => {
    localContents.value = localContents.value.filter(post => post.id !== id);
}

const hasBrowsedevent=(id)=>{
    markAsBrowsed(id)
}

const markAsBrowsed = (id) => {
    console.log('子组件 id',id);
    const article = props.contents.find(record => record.id === id);
    if (article) {
        // 直接设置 hasBrowsed 字段为 true
        article.hasBrowsed = true; // 如果之前不存在，则会添加这个字段
        console.log(`文章 ID ${id} 的浏览状态已更新为: ${article.hasBrowsed}`);
      } else {
        console.log(`未找到 ID 为 ${id} 的文章`);
      }
};

</script>

<style lang="scss" scoped>
.content-list {
    flex: 1;
    background-color: #fff;

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
        
        :deep(.dots){
            display: block;
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

    }
}
</style>
