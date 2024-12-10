<template>
    <div class="presonal-view">
        <div class="nav-text">
            个人资料
        </div>
        <div class="user-infos">
            <div class="info-input">
                <el-form class="info-form" ref="formRef" :model="form" label-width="auto" style="max-width: 600px">
                    <div class="title">基本信息</div>
                    <el-form-item label="用户名" prop="name" :rules="[
                        { required: true, message: '请填写用户名' },
                    ]">
                        <el-input v-model="form.name" show-word-limit type="text" maxlength="20" placeholder="请填写用户名" />
                    </el-form-item>
                    <el-form-item label="您的生日" prop="birthday" :rules="[
                        { required: true, message: '您的生日时间' },
                    ]">
                        <el-date-picker style="width: 100%;" :clearable="false" v-model="form.birthday" type="date"
                            placeholder="请选择时间" :disabled-date="disabledDate" format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <!-- <el-form-item label="职业方向" prop="occupation" :rules="[
                        { required: true, message: '职业方向' },
                    ]">
                        <el-select v-model="form.occupation" placeholder="Select" style="width: 100%">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.sex">
                            <el-radio :value="0">男</el-radio>
                            <el-radio :value="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="职业方向">
                        <el-input v-model="form.occupation" type="text" show-word-limit maxlength="100"
                            placeholder="您的职业方向" />
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="form.position" type="text" show-word-limit maxlength="100" placeholder="您的职位" />
                    </el-form-item>
                    <el-form-item label="公司">
                        <el-input v-model="form.company" type="text" show-word-limit maxlength="100" placeholder="您的公司" />
                    </el-form-item>
                    <!-- <el-form-item label="个人主页">
                        <el-input v-model="form.homepage" type="text" show-word-limit maxlength="100"
                            placeholder="您的个人主页" />
                    </el-form-item> -->
                    <el-form-item label="个人介绍">
                        <el-input v-model="form.introduction" type="textarea" clearable
                            :autosize="{ minRows: 4, maxRows: 30 }" show-word-limit maxlength="200"
                            placeholder="请填写职业技能、擅长的事情、兴趣爱好等" />
                    </el-form-item>
                    <!-- <div class="title">兴趣标签管理 <div class="error-message" v-if="showError">请选择兴趣标签</div>
                    </div>
                    <el-form-item>
                        <div class="tag-manager">
                            <div class="tag-selection">
                                <div class="tags-container">
                                    <div v-for="tag in tags" :key="tag"
                                        :class="['tag', { selected: selectedTags.includes(tag) }]" @click="toggleTag(tag)">
                                        {{ tag }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button class="submitbutton" style="width: 150px;" type="primary"
                            @click="onSubmit(formRef)">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="avatar-input">
                <div class="avatar-upload">
                    <el-upload class="avatar-uploader" :action="uploadAction" :headers="fromValue" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <!-- <div :style="{ backgroundImage: `url(${avatarUrl})` }" class="avatar-background"></div> -->
                        <!-- <img class="avatar-background" :src="avatarUrl" alt=""> -->
                        <img class="avatar-background" :src="form.image" alt="">
                        <div class="avatar-placeholder">
                            <el-icon class="avatar-uploader-icon avatar-icon">
                                <Plus />
                            </el-icon>
                            <!-- <div class="upload-text">点击修改</div> -->
                        </div>
                    </el-upload>
                    <div class="upload-info">
                        <p>格式：支持JPG、PNG、JPEG</p>
                        <p>大小：5M以内</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from "vue"
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils/formDate'
import userinfoAppStore from "@/stores/user/userinfo"
const userinfoAppStores = userinfoAppStore();

import { getUserInfo, setUserInfo, getToken } from '@/utils/auth'

//头像容器
const fromValue = {
    from: 'avatar',
    Authorization: getToken()
}

// const uploadAction="http://localhost:19011/dfs/upload"
const uploadAction = "http://localhost:16003/dev-collection/dfs/dfs/upload"


const pageTitle = ref('个人设置');
onMounted(async () => {
    document.title = pageTitle.value;
    await userinfoAppStores.getusergetLocalInfo()
    upFrom()
});



const upFrom = () => {
    const {
        id,
        name,
        image,
        position,
        company,
        sex,
        birthday,
        occupation,
        introduction,
    } = userinfoAppStores.userLocalinfo

    form.id = id
    form.name = name
    form.image = image
    form.position = position
    form.company = company
    form.sex = sex
    form.occupation = occupation
    form.birthday = formatDate(birthday)
    // console.log(form.birthday);
    form.introduction = introduction

    // Object.assign(form, userinfoAppStores.userLocalinfo);
}

const form = reactive({
    id: '',
    name: '',
    image: '',
    occupation: '',
    position: '',
    company: '',
    sex: '',
    birthday: '',
    introduction: '',
})
const avatarUrl = ref('')

const disabledDate = (time) => {
    return time.getTime() > Date.now()
}

const handleAvatarSuccess =async (response, uploadFile) => {
    if(response?.data){
        let image =response.data.url
        form.image = image;
        await userinfoAppStores.getusergetLocalInfo()
        // const info = getUserInfo()
        // info.image = image
        // setUserInfo(info)

    }else {
        console.error("No file uploaded.");
    }


    // if (uploadFile.raw) {
    //     let image = URL.createObjectURL(uploadFile.raw);
    //     form.image = image;
    //     const info = getUserInfo()
    //     info.image = image
    //     setUserInfo(info)

    //     userinfoAppStores.userLocalinfo = info
    //     // avatarUrl.value = URL.createObjectURL(uploadFile.raw);
    // } else {
    //     console.error("No file uploaded.");
    // }
}


const handleAvatarChange = (file, fileList) => {
    removeUserInfo()
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
    if (!isJPG) {
        return
    }
    console.log(isJPG);
    const reader = new FileReader()
    reader.onload = (e) => {
        console.log(e);
        avatarUrl.value = e.target.result
    }
    reader.readAsDataURL(file.raw)
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

const tags = [
    '编程语言', '服务端', '游戏', '网络与信息安全', '前端', '移动开发', '大数据', '媒体',
    '前沿技术', '运维与开发效能', '硬件', '社交网络与平台', '人工智能', 'AIGC',
    '区块链', '操作系统', '软件设计与数据结构和算法', '专业成长', '开发工具', '应用软件',
    '云计算', '数据库'
]

const selectedTags = ref([])
const showError = ref(false)
const formRef = ref()

const onSubmit = async (formEl) => {
    // removeUserInfo()
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            console.log('form', toRaw(form));
            await userinfoAppStores.upuserInfo(toRaw(form))
            ElMessage.success('修改完成')
            await userinfoAppStores.getusergetLocalInfo()
        } else {
            console.log('error submit!')
        }
    })

}

const toggleTag = (tag) => {
    console.log(tag);
    if (selectedTags.value.includes(tag)) {
        selectedTags.value = selectedTags.value.filter(t => t !== tag)
    } else {
        selectedTags.value.push(tag)
    }
    showError.value = selectedTags.value.length === 0
}




const options = ref([
    {
        value: '1',
        label: '后端开发',
    },
    {
        value: '2',
        label: '前端开发',
    },
    {
        value: '3',
        label: '移动开发',
    },
    {
        value: '4',
        label: '测试',
    },

])
</script>

<style lang="scss" scoped>
.avatar-input {
    flex: 1;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;


    .avatar-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;


        .avatar-uploader {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            border: 1px dashed #d9d9d9;


            :deep(.el-upload) {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }

            .avatar-background {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .avatar-placeholder {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;

                .avatar-icon {
                    font-size: 28px;
                    color: #8c939d;
                }

                .upload-text {
                    font-size: 12px;
                    color: #8c939d;
                }

                .avatar-icon {
                    font-size: 28px;
                    color: #8c939d;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            .upload-text {
                position: absolute;
                top: 65%;
                left: 40%;
                transform: translateX(-50%);
                font-size: 12px;
                color: #8c939d;
            }
        }

        .upload-info {
            text-align: center;
            margin-top: 10px;

            p {
                margin: 0;
                font-size: 12px;
                color: #8c939d;
            }
        }
    }
}


:deep(.el-textarea__inner) {
    min-height: 85px;
    display: block;
    /* 禁止用户手动调整大小 */
    resize: none;
    /* 根据需要调整内边距 */
    padding: 10px;
    outline: none;
}

.title {
    display: flex;
    align-content: center;
    font-size: 1.2em;
    margin-bottom: 1em;

    .error-message {
        margin-left: 3em;
        color: red;
        font-size: 14px;
        // margin-top: 1em;
    }
}


.tag-manager {

    .tag-selection {
        label {
            font-weight: bold;
            margin-bottom: 0.2em;
            display: block;
        }

        .tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            .tag {
                padding: 0.2em 0.5em;
                border: 1px solid #ccc;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;

                &.selected {
                    background-color: #5cabfa;
                    color: white;
                    border-color: #5cabfa;
                }
            }
        }
    }


}

.presonal-view {
    .nav-text {
        font-size: 2em;
        color: #252933;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        padding: 16px 20px;
        border-bottom: 1px solid #e4e6eb;

    }

    .user-infos {
        display: flex;

        .info-input {
            min-width: 240px;
            width: calc(100% - 346px);

            .info-form {
                padding: 20px;


                .profile-title {
                    padding: 20px 0;
                    color: #252933;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 24px;
                }

                .submitbutton {
                    margin: 0 auto;
                    margin-top: 20px;
                }
            }

        }


    }

}
</style>
