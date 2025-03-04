import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) =>{
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_API} = env
 
 return{
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    
  ],
  server: {
    port: 8080,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api': {
        target: VITE_APP_BASE_API ,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    }
  },
  rollupOptions: {
    output: {
      manualChunks: {
        // 将 lodash 单独打包
        lodash: ['lodash'],
        // 将 vue 相关库单独打包
        vue: ['vue', 'vue-router', 'vuex'],
      },
    },
  },
 }
})
