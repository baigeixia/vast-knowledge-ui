import axios from 'axios'
import { getToken,setToken } from '@/utils/auth'
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import useUserStore from '@/stores/admin/user'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const systemRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_SYSTEM + '/dev-system',
  timeout: 5000
})


const coreRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_CORE + '/dev-core',
  timeout: 5000
})


const collectionRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_COLLECTION + '/dev-collection',
  timeout: 5000,
})


setupInterceptors(systemRequest)
setupInterceptors(coreRequest)
setupInterceptors(collectionRequest)


function setupInterceptors(instance) {
  instance.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers['user-authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    config.withCredentials = true;

    return config;
  }, e => {
    console.log(e);
    return Promise.reject(e);
  });

  const queue = [];

  instance.interceptors.response.use(res =>{
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    const users= useUserStore()
    if (code === 401) {
      users.isnotlogin = true
      return Promise.reject('登录过期，请重新登录')
    } else if (code === 400) {
      console.log(res);
      let { data, config } = res;
      console.log(users.isrefresh);
      if (users.isrefresh) {
        return new Promise((resolve) => {
          queue.push({ config,resolve});
          console.log('queue'+queue);
        });
      }
      users.isrefresh=true
      const token =  refreshToken();
      // console.log(res);
      // if (res.status === 200) {
      //   //当刷新成功后，遍历异步请求队列清空所有请求
      //   queue.forEach(({ config, resolve }) => {
      //     resolve(systemRequest(config,data));
      //   });
      //   return systemRequest(config);
      // } else {
      //  //刷新失败，则说明refresh_token过期，用户需要重新登录
      //   users.isnotlogin = true
      // }

      users.isrefresh=false

      return Promise.reject(new Error(msg))
    }else if (code === 500) {
      // ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      // ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } 
    else if (code !== 200) {
      // ElNotification.error({ title: msg })
      return Promise.reject(new Error(msg))
    } 
    else {
      return Promise.resolve(res.data)
    }
  }, error => {
    let { message } = error;
    if (message == "Network Error") {
      message = "网络异常";
    } else if (message.includes("timeout")) {
      message = "请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  });
}

// 刷新token函数
async function refreshToken() {
  const token = await systemRequest.post("/user/refresh");
  console.log(token);
  // if(res){
  //   setToken(res)
  // }
}



export { collectionRequest, systemRequest, coreRequest }

