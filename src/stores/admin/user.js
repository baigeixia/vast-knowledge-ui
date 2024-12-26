import { securityLogin, securitylogout, getcodeimgApi } from '@/api/admin/login'
import { usergetInfo } from '@/api/user/userinfo'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import userinfoAppStore from '../user/userinfo'
import { getUserid } from '@/utils/auth'
import { ElMessage } from 'element-plus'

const useUserStore = defineStore(
    'user', () => {
        const userinfoAppStores = userinfoAppStore()
        const userToken = ref(getToken())
        const userinfo = ref({})
        const userInfoPo = ref({})
        const userInfoPoLoading = ref(false)
        const isnotlogin = ref(false)
        const isrefresh = ref(false)

        const login = async (userInfo) => {
            const email = userInfo.email.trim();
            const password = userInfo.password;
            const waitCode = userInfo.waitcode;
            const codeOrPas = userInfo.codeOrPas;
            const uuid = userInfo.uuid;

            const resp = await securityLogin({
                email,
                password,
                waitCode,
                codeOrPas,
                uuid,
            })

            setToken(resp.data.access_token);
            userToken.value = resp.data.access_token;
            // console.log('resp', resp);
            isnotlogin.value = false;
            return resp;
        };

        const getUserInfoPo = async (id) => {
            try {
                const resp = await usergetInfo(id)
                return resp
            } catch (error) {
                console.error('Error loading more data:', error);
            }
        }

        const isloginReLongin = () => {
            const islogin = !!getUserid()
            if (!islogin) {
                isnotlogin.value = true
            }
            return islogin
        };


        const userExit = async () => {
            await securitylogout()
        }

        const getcodeimg = async () => {
            return await getcodeimgApi()
        }

        return {
            isnotlogin,
            userToken,
            userinfo,
            login,
            getUserInfoPo,
            userInfoPo,
            isloginReLongin,
            isrefresh,
            userExit,
            getcodeimg,

        }
    })


export default useUserStore