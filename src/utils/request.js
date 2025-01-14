import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import useUserStore from '@/stores/admin/user'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

request
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_SYSTEM + '/dev-system',
  timeout: 5000
})

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


setupInterceptors(request)


function setupInterceptors(instance) {
  instance.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
      config.headers['authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    config.withCredentials = true;

    return config;
  }, e => {
    console.log(e);
    return Promise.reject(e);
  });

  const queue = [];

  instance.interceptors.response.use(async res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    const users = useUserStore()

    if (code === 401) {
      users.isnotlogin = true
      return Promise.reject('登录过期，请重新登录')
    } else if (code === 400) {
      console.log(res);
      let { data, config } = res;
      // 如果正在刷新token，加入队列
      if (users.isrefresh) {
        return new Promise((resolve) => {
          queue.push({ config, resolve });
          console.log('queue', queue); // 优化为直接打印队列内容
        });
      }
      // 开始刷新token
      users.isrefresh = true;

      try {
        const response = await request.post("/user/refresh");

        if (response.code === 200) {
          const token = response.data;
          console.log(token);
          setToken(token);

          // 刷新成功后，遍历队列，执行所有等待请求
          for (const { config, resolve } of queue) {
            try {
              const retryResponse = await request(config);
              resolve(retryResponse); // 返回重试的请求结果
            } catch (err) {
              resolve(Promise.reject(err)); // 如果重试失败，也要resolve，防止队列卡住
            }
          }
          queue.length = 0; // 清空队列
          return request(config); // 重试当前请求
        } else {
          // 刷新失败，跳转到重新登录流程
          users.isnotlogin = true;
          throw new Error('Refresh token expired, please login again.');
        }
      } catch (err) {
        console.error('Token refresh error:', err);
        return Promise.reject(new Error('Token refresh failed'));
      } finally {
        users.isrefresh = false; // 无论如何，都将刷新标志位重置
      }

    } else if (code === 500) {
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



export { request }

