import { securityLogin } from '@/api/admin/login'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'


export const useUserStore = defineStore(
    'user', () => {
        const userToken = ref(getToken())
        const userinfo = ref({})
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

                .then((resp) => {
                    setToken(resp.data.access_token);
                    userToken.value = resp.data.access_token;
                    console.log('resp', resp);
                    isnotlogin.value = false;
                    resolve(resp); // 成功时将结果传递给 Promise 的 resolve
                })
                .catch((error) => {
                    reject(error); // 失败时将错误传递给 Promise 的 reject
                });
            });
        };


        return {
            isnotlogin,
            userToken,
            userinfo,
            login,

        }
    })