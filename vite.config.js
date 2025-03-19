import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import visualizer from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_URL, Vk_BUILD_COMPRESS } = env
  // 判断是否是生产环境
  const isProduction = mode === 'production'

  const compress = Vk_BUILD_COMPRESS === 'gzip' ? 'gzip' : Vk_BUILD_COMPRESS === 'brotli' ? 'brotli' : null;
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      visualizer.default({ // 使用 .default()
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'stats.html',
      }),
      viteCompression({
        algorithm: 'gzip',
      }),
    ],
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/api': {
          target: VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => {
            if (!isProduction) {
              return path.replace(/^\/api/, ''); // 移除 /api 前缀
            }
            return path; // 在生产环境中返回原始路径
          },
        },
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 将 node_modules 中的依赖单独打包
            if (id.includes('node_modules')) {
              return 'vendor'; // 所有 node_modules 中的依赖会打包到一个单独的 vendor 文件
            }
          },
        },
      },
    },
  }
})
