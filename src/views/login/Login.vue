<template>
  <el-dialog class="login-dialog-box" v-model="userStore.isnotlogin" width="740" :show-close="false" lock-scroll>
    <div class="login-dialog-form">
      <div class="login-dialog-form-left">
        <!-- <img class="form-left-img" src="@/assets/img/welcome@2x.4e80f44.png" alt=""> -->
        <!-- <img class="form-left-img" src="@/assets/img/10615.png" alt=""> -->
        <!-- <img class="form-left-img" src="@/assets/img/00336.jpg" alt=""> -->
        <!-- <img class="form-left-img" src="@/assets/img/202406.png" alt=""> -->
        <img class="form-left-img" src="@/assets/img/DBF3380.jpg" alt="">
        <!-- <img class="form-left-img" src="https://data.wujiebantu.com/38b78203b3e81031e05dc25af893c7f2d4481de1563f25e55e76d7ff974e4cf4.1536%C3%972112.png" alt=""> -->
      </div>
      <div class="login-dialog-form-right" v-loading="longinloading">
        <div class="login-dialog-title">
          <span class="title-item " :class="{ 'tab--active': codeOrPas === 1 }" @click=" upcodeOrPas(1)">验证码登录</span>
          <span class="title-item" :class="{ 'tab--active': codeOrPas === 2 }" @click=" upcodeOrPas(2)">密码登录</span>
        </div>
        <div class="login-dialog-content">
          <el-form class="dialog-content-from" ref="contentFormRef" :model="loginform" :rules="rules">
            <el-form-item prop="email">
              <el-input class="content-input" placeholder="邮箱" v-model="loginform.email" />
            </el-form-item>
            <el-form-item v-if="codeOrPas == 1" prop="waitcode">
              <el-input class="content-input" placeholder="验证码" v-model="loginform.waitcode" />
              <div v-if="!countingDown" class="smsInputButton" @click="startCountdown">获取邮箱验证码</div>
              <div class="CountingDownButton " v-else>
                {{ countdownSeconds }} 秒后可重发
              </div>
            </el-form-item>
            <el-form-item v-if="codeOrPas == 2" prop="password">
              <el-input class="content-input" placeholder="密码" show-password v-model="loginform.password" />
            </el-form-item>
            <el-form-item class="onSubmit-button">
              <el-button type="primary" @click="onSubmit(contentFormRef)">
                {{ codeOrPas === 1 ? '登录/注册' : '登录' }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="login-dialog-segmentation">
          <span class="segmentation-line"></span>
          <span class="segmentation-text">其他方式登录</span>
          <span class="segmentation-line"></span>
        </div>

        <div class="Login-socialLogin">
          <div class="Login-socialButtonGroup">
            <div title="微博" class="Login-socialButton" @click="loginsocial(1)"><svg data-v-7842a212="" width="32"
                height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="weibo-icon">
                <circle data-v-7842a212="" cx="16" cy="16" r="16" fill="white"></circle>
                <path data-v-7842a212="" fill-rule="evenodd" clip-rule="evenodd"
                  d="M22.1331 15.4473L22.1344 15.4477C23.4174 15.8481 24.8452 16.8165 24.8452 18.523C24.8452 21.3474 20.7992 24.9049 14.7166 24.9049C10.0767 24.9049 5.33398 22.6414 5.33398 18.9183C5.33398 16.9719 6.55896 14.721 8.66864 12.5969C11.4856 9.762 14.7706 8.47063 16.0061 9.71506C16.5513 10.263 16.604 11.2126 16.2536 12.3459C16.0798 12.8894 16.7191 12.6292 16.7811 12.6039C16.7843 12.6026 16.7859 12.602 16.7859 12.602C19.0629 11.6424 21.0493 11.5858 21.7754 12.6302C22.1628 13.1867 22.1257 13.967 21.7686 14.8714C21.6037 15.2874 21.8189 15.3524 22.1331 15.4473ZM7.59017 19.8067C7.83068 22.2538 11.0266 23.9386 14.7291 23.5707C18.432 23.202 21.2382 20.9199 20.9981 18.4721C20.7581 16.0261 17.5619 14.3414 13.8591 14.7099C10.1571 15.0784 7.34967 17.3603 7.59017 19.8067Z"
                  fill="#D52A2B"></path>
                <path data-v-7842a212=""
                  d="M14.7295 23.5706C11.027 23.9385 7.83104 22.2537 7.59054 19.8066C7.35004 17.3601 10.1575 15.0783 13.8595 14.7098C17.5623 14.3413 20.7584 16.026 20.9984 18.472C21.2385 20.9198 18.4324 23.2019 14.7295 23.5706Z"
                  fill="white"></path>
                <path data-v-7842a212=""
                  d="M26.1734 8.63411C24.7045 6.99476 22.5379 6.36975 20.5381 6.79783H20.5373C20.0744 6.8975 19.7795 7.35582 19.8785 7.82073C19.9772 8.28612 20.4323 8.5835 20.8951 8.48419C22.3177 8.18002 23.8574 8.62485 24.9016 9.7894C25.9449 10.9539 26.2282 12.5422 25.7814 13.9346L25.7816 13.9349C25.636 14.3884 25.8825 14.8736 26.3336 15.0202C26.7829 15.1667 27.2659 14.9189 27.4117 14.4664C27.4117 14.4656 27.4117 14.4639 27.412 14.4631C28.0388 12.5045 27.6428 10.2719 26.1734 8.63411Z"
                  fill="#E59211"></path>
                <path data-v-7842a212=""
                  d="M23.9181 10.6831C23.2032 9.88462 22.1476 9.58138 21.1731 9.78997C20.7748 9.87543 20.521 10.27 20.6064 10.6713C20.6916 11.0709 21.0832 11.3276 21.4806 11.2406V11.2414C21.9569 11.14 22.4734 11.2879 22.8229 11.6774C23.1728 12.0678 23.2668 12.5997 23.1167 13.0665H23.1175C22.9926 13.456 23.2045 13.8749 23.5918 14.0012C23.9793 14.126 24.3949 13.9134 24.5199 13.5228C24.8261 12.5689 24.6345 11.4813 23.9181 10.6831Z"
                  fill="#E59211"></path>
                <path data-v-7842a212="" fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.0999 16.5925C13.3381 16.1311 11.3467 17.0149 10.5815 18.5777C9.80209 20.1714 10.5557 21.9407 12.3358 22.519C14.1796 23.1175 16.3529 22.2003 17.1084 20.48C17.8537 18.7983 16.9232 17.0668 15.0999 16.5925ZM13.7546 20.6626C13.3964 21.2377 12.6295 21.4898 12.0519 21.2243C11.4827 20.9633 11.3146 20.2954 11.6728 19.7346C12.0265 19.1761 12.7677 18.9273 13.341 19.1693C13.921 19.4181 14.1062 20.0818 13.7546 20.6626ZM14.2943 19.3757C14.5186 19.4685 14.8048 19.3612 14.9343 19.1385C15.0579 18.914 14.9775 18.6619 14.754 18.5797C14.534 18.4918 14.259 18.5982 14.13 18.816C14.0046 19.035 14.0738 19.2843 14.2943 19.3757Z"
                  fill="#21201E"></path>
              </svg></div>
            <div title="QQ" class="Login-socialButton" @click="loginsocial(2)"><svg width="24" height="24"
                viewBox="0 0 24 24" fill="#50C8FD" class="ZDI ZDI--Qq24">
                <path fill-rule="evenodd"
                  d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.483 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.288.687 6.288 0 0-.688-1.77-1.182-1.77-1.182 2.086-1.77 1.906-3.967 1.906-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.165-6.954-2.165-6.954V9.325C18.29 3.364 14.268 2 12.003 2Z"
                  clip-rule="evenodd"></path>
              </svg></div>
            <div title="微信" class="Login-socialButton" @click="loginsocial(3)">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" class="ZDI ZDI--Wechat24">
                <path fill="#07C160"
                  d="M20.314 18.59c1.333-.968 2.186-2.397 2.186-3.986 0-2.91-2.833-5.27-6.325-5.27-3.494 0-6.325 2.36-6.325 5.27 0 2.911 2.831 5.271 6.325 5.271.698.001 1.393-.096 2.064-.288l.186-.029c.122 0 .232.038.336.097l1.386.8.12.04a.21.21 0 0 0 .212-.211l-.034-.154-.285-1.063-.023-.135a.42.42 0 0 1 .177-.343ZM9.09 3.513C4.9 3.514 1.5 6.346 1.5 9.84c0 1.905 1.022 3.622 2.622 4.781a.505.505 0 0 1 .213.412l-.026.16-.343 1.276-.04.185c0 .14.113.254.252.254l.146-.047 1.663-.96a.793.793 0 0 1 .403-.116l.222.032c.806.231 1.64.348 2.478.348l.417-.01a4.888 4.888 0 0 1-.255-1.55c0-3.186 3.1-5.77 6.923-5.77l.411.011c-.57-3.02-3.71-5.332-7.494-5.332Zm4.976 10.248a.843.843 0 1 1 0-1.685.843.843 0 0 1 0 1.684v.001Zm4.217 0a.843.843 0 1 1 0-1.685.843.843 0 0 1 0 1.684v.001ZM6.561 8.827a1.012 1.012 0 1 1 0-2.023 1.012 1.012 0 0 1 0 2.023Zm5.061 0a1.012 1.012 0 1 1 0-2.023 1.012 1.012 0 0 1 0 2.023Z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <div title="Github" class="Login-socialButton" @click="loginsocial(4)">
              <svg width="46px" height="46px" viewBox="0 0 46 46" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" class="github-icon">
                <desc data-v-7842a212="">Created with sketchtool.</desc>
                <defs data-v-7842a212=""></defs>
                <g data-v-7842a212="" id="状态" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g data-v-7842a212="" id="注册" transform="translate(-758.000000, -600.000000)">
                    <g data-v-7842a212="" id="Group-4" transform="translate(758.000000, 600.000000)">
                      <rect data-v-7842a212="" id="Rectangle-314" fill-opacity="0" fill="#D8D8D8" x="0" y="0" width="46"
                        height="46"></rect>
                      <path data-v-7842a212=""
                        d="M5,23.4307576 C5,31.1317497 10.1024923,37.6642712 17.179508,39.9691117 C18.0705582,40.1296159 18.3952722,39.5913918 18.3952722,39.1291397 C18.3952722,38.7161088 18.3799658,37.61933 18.3712193,36.1651618 C13.4174176,37.2180695 12.3722103,33.8282205 12.3722103,33.8282205 C11.5620653,31.8144276 10.3944069,31.2783436 10.3944069,31.2783436 C8.77739677,30.1976152 10.5168579,30.2190158 10.5168579,30.2190158 C12.3044248,30.342069 13.2446741,32.0155929 13.2446741,32.0155929 C14.8332581,34.6788928 17.413477,33.9095426 18.4280715,33.4633409 C18.5898819,32.3376714 19.0501667,31.5693912 19.5585573,31.1338898 C15.6040438,30.6941082 11.4461741,29.198209 11.4461741,22.5190936 C11.4461741,20.6165837 12.1404279,19.0596928 13.2796601,17.8420009 C13.0959835,17.4011493 12.4848215,15.6281127 13.4545902,13.2291098 C13.4545902,13.2291098 14.9491492,12.7604375 18.3515396,15.0160567 C19.7717533,14.6287065 21.2958318,14.4361015 22.8100705,14.4286113 C24.3232158,14.4361015 25.846201,14.6287065 27.2686013,15.0160567 C30.6688051,12.7604375 32.1611774,13.2291098 32.1611774,13.2291098 C33.1331328,15.6281127 32.5219708,17.4011493 32.3393875,17.8420009 C33.4808064,19.0596928 34.1695936,20.6165837 34.1695936,22.5190936 C34.1695936,29.2153294 30.005164,30.6887581 26.0386241,31.1199794 C26.6771189,31.6582035 27.246735,32.7218115 27.246735,34.3482542 C27.246735,36.6777053 27.2248688,38.5577447 27.2248688,39.1291397 C27.2248688,39.5956719 27.5463028,40.1381761 28.4493795,39.9680417 C35.5209286,37.657851 40.6190476,31.1296097 40.6190476,23.4307576 C40.6190476,13.8037149 32.6444218,6 22.8078838,6 C12.9746258,6 5,13.8037149 5,23.4307576 Z"
                        id="Fill-3" fill="#161614"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div class="SignContainer-tip">
          未注册手机验证后自动登录，注册即代表同意
          <a class="tip-a" href="https://www.baidu.com" target="_blank">《隐私保护指引》</a>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import useUserStore from '@/stores/admin/user'
const userStore = useUserStore()

import {socket ,useSockets} from '@/utils/socketclient'

const contentFormRef = ref(null);
const codeOrPas = ref(1);
const longinloading = ref(false);

const loginsocial = (type) => {
  //第三方登录
  console.log(type);
}

const onSubmit = async (formEl) => {
  if (!formEl) return
  longinloading.value = true;

  try {
    const valid = await new Promise((resolve) => {
      formEl.validate((valid, fields) => {
        resolve({ valid, fields });
      });
    });

    if (valid.valid) {
      await userStore.login({ ...loginform, codeOrPas: codeOrPas.value });
      // formEl.resetFields();
      socket.connect();
      useSockets()
    } else {
      console.log('error submit!', valid.fields);
    }
  } catch (error) {
    console.error('Error login:', error);
  } finally {
    longinloading.value = false;
  }

}


const loginform = reactive({
  email: '',
  password: '',
  waitcode: '',
})

const rules = reactive({
  email: [
    { required: true, message: '邮箱不要为空', trigger: ['blur', 'change'] },
  ],
  password: [
    {
      required: true,
      message: '密码不要为空',
      trigger: ['blur', 'change'],
    },
  ],
  waitcode: [
    {
      required: true,
      message: '验证码不要为空',
      trigger: ['blur', 'change'],
    },
  ],
})


const countingDown = ref(false); // 是否在倒计时中
const countdownSeconds = ref(59); // 倒计时剩余秒数

const startCountdown = () => {
  countingDown.value = true; // 设置为正在倒计时状态
  countdownSeconds.value = 59; // 重置倒计时秒数

  const timer = setInterval(() => {
    countdownSeconds.value--; // 每秒减少1秒

    if (countdownSeconds.value === 0) {
      clearInterval(timer); // 倒计时结束，清除定时器
      countingDown.value = false; // 设置为非倒计时状态
    }
  }, 1000); // 每1000毫秒（即1秒）执行一次
};


const upcodeOrPas = (type) => {
  if (type !== codeOrPas.value) {
    resetLoginForm()
    codeOrPas.value = type
  }
}

const resetLoginForm = () => {
  // loginform.email = '';
  loginform.password = '';
  loginform.waitcode = '';
}

</script>

<style lang="scss" scoped>
.login-dialog-box {

  .login-dialog-form {
    display: flex;
    box-sizing: border-box;

    .login-dialog-form-left {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 280px;
      padding-right: 20px;
      height: 500px;
      border-right: 2px solid #e2e4e8;

      .form-left-img {
        height: 100%;
        width: 100%;
      }
    }

    .login-dialog-form-right {
      flex: 1;
      box-sizing: border-box;
      padding-left: 20px;

      .login-dialog-title {
        font-size: 1.1rem;
        font-weight: 500;
        margin: 0 0 1.2rem 1rem;

        .title-item {
          height: 49px;
          line-height: 46px;
          margin-right: 24px;
          cursor: pointer;

        }

        .tab--active {
          color: #191b1f;
          padding-bottom: 10px;
          border-bottom: 3px solid #1772f6;
          font-weight: 600;
          font-size: 16px;
        }
      }

      .login-dialog-content {
        position: relative;
        padding: 0 10px 30px;

        .dialog-content-from {
          padding-top: 30px;
        }


        .onSubmit-button {
          margin-top: 40px;


          .el-button {
            width: 100%;
            height: 40px;
          }
        }

        .content-input {
          height: 48px;
        }

        .smsInputButton {
          position: absolute;
          right: 10px;
          color: #1772f6;
          cursor: pointer;
        }

        .CountingDownButton {
          position: absolute;
          right: 10px;
          color: #8491a5;
        }

        .smsInputButton:hover {
          color: #758195;
        }
      }

      .SignContainer-tip {
        font-size: 12px;
        line-height: 19px;
        padding: 12px 24px 30px;
        color: #9196a1;

        .tip-a {
          color: #9196a1;
          text-decoration: underline;

        }
      }

      .Login-socialLogin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;

        .Login-socialButtonGroup {
          width: 204px;
          transition: opacity .3s ease;
          margin: auto;
          display: flex;
          justify-content: space-between;
          -webkit-box-pack: justify;

          .Login-socialButton {
            -webkit-box-align: center;
            -webkit-box-pack: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
            display: inline-flex;
            height: 36px;
            justify-content: center;
            width: 36px;
          }
        }

      }

      .login-dialog-segmentation {
        box-sizing: border-box;
        display: flex;
        margin: 0 24px 12px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        .segmentation-line {
          box-sizing: border-box;
          margin: 0;
          min-width: 0;
          border-top: 1px solid;
          border-color: #ebeced;
          width: 124px;
        }

        .segmentation-text {
          box-sizing: border-box;
          margin: 0;
          min-width: 0;
          color: #9196a1;
          font-size: 12px;
          margin-left: 16px;
          margin-right: 16px;
          width: 72px;
          overflow: hidden;
          line-height: 17px;
          white-space: nowrap;
        }
      }
    }

  }
}
</style>
