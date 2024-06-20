import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/styles/common.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'nprogress/nprogress.css';
import ExternalLinkGuard from './Layout/components/ExternalLinkGuard.vue';

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('ExternalLinkGuard', ExternalLinkGuard);

app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })
  
app.use(createPinia())

app.mount('#app')
