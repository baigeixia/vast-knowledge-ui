import { securityLogin } from '@/api/admin/login'
import { usergetInfo } from  '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import userinfoAppStore  from '../user/userinfo'

 const useUserStore = defineStore(
    'user', () => {
        const userinfoAppStores =userinfoAppStore()
        const userToken = ref(getToken())
        const userinfo = ref({})
        const userInfoPo = ref({})
        const userInfoPoLoading = ref(false)
        const isnotlogin = ref(false)

        const login = (userInfo) => {
            return new Promise((resolve, reject) => {
                const email = userInfo.email.trim();
                const password = userInfo.password;
                const waitCode = userInfo.waitCode;
                const codeOrPas = userInfo.codeOrPas;
                
                securityLogin({
                    email,
                    password,
                    waitCode,
                    codeOrPas
                })

                .then( async(resp) => {
                    setToken(resp.data.access_token);
                    userToken.value = resp.data.access_token;
                    // console.log('resp', resp);
                   await  userinfoAppStores.getusergetLocalInfo()
                    isnotlogin.value = false;
                    // location.href='/'
                    window.location.reload();
                    resolve(resp); // 成功时将结果传递给 Promise 的 resolve
                })
                .catch((error) => {
                    reject(error); // 失败时将错误传递给 Promise 的 reject
                });
            });
        };

        const getUserInfoPo = async (id)=>{
            try {
              const resp =  await usergetInfo(id)
              return resp
            } catch (error) {
                console.error('Error loading more data:', error);
            }
        }


        return {
            isnotlogin,
            userToken,
            userinfo,
            login,
            getUserInfoPo,
            userInfoPo,

        }
    })


    export default useUserStore