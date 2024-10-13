import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) =>{
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_API_SYSTEM ,VITE_APP_BASE_API_CORE,VITE_APP_BASE_API_COLLECTION} = env
 
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
      '/dev-system': {
        target: 'http://localhost:16001' ,
        changeOrigin: true,
      },
      '/dev-core': {
        target: 'http://localhost:16002',
        changeOrigin: true,
      },
      '/dev-collection': {
        target: 'http://localhost:16003',
        changeOrigin: true,
      },
    }
    // proxy: {
    //   '/dev-collection': 'http://localhost:16003',
    //   '/dev-core': 'http://localhost:16002',
    //   '/dev-system': 'http://localhost:16001',
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    }
  }
 }
})
