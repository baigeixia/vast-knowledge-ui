import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/styles/common.scss'
import '@/assets/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'nprogress/nprogress.css';
import { sanitizeHtml } from './utils/helpers/sanitizeHtml';
import { formatTime,formatDateTime,formatDate } from './utils/formDate';
// import debounce from './utils/debouncing';
import './loginblocking' 
import Avatar from '@/components/Avatar.vue'
import { islogin} from './utils/userislogin';

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component( Avatar);
// app.config.globalProperties.$debounce = debounce;
app.config.globalProperties.$sanitizeHtml = sanitizeHtml;
app.config.globalProperties.$formatTime = formatTime;
app.config.globalProperties.$formatDateTime = formatDateTime;
app.config.globalProperties.$formatDate = formatDate;
app.config.globalProperties.$islogin = islogin;

app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })

app.use(createPinia())

app.mount('#app')

