import axios from 'axios'
import NProgress from 'nprogress';
import { getToken } from '@/utils/auth'

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


const systemRequest = axios.create({
  baseURL: import.meta.env.Vk_BASE_URL_SYSTEM +'/dev-api',
  timeout: 5000
})


const coreRequest = axios.create({
  baseURL: import.meta.env.Vk_BASE_URL_CORE +'/dev-api',
  timeout: 5000
})


const collectionRequest = axios.create({
  baseURL: import.meta.env.Vk_BASE_URL_COLLECTION +'/dev-api',
  timeout: 5000,
})


setupInterceptors(systemRequest)
setupInterceptors(coreRequest)
setupInterceptors(collectionRequest)


function setupInterceptors(instance) {
  instance.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false

    // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;
  }, e => {
    console.log(e);
    return Promise.reject(e);
  });

  instance.interceptors.response.use(res => {
    return res.data;
  }, e => {
      console.log(e);
      return Promise.reject(e);
  });
}


export {collectionRequest,systemRequest,coreRequest}

