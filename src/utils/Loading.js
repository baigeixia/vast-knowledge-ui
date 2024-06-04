import { ElLoading } from 'element-plus'
import { nextTick } from 'vue'

const defaultOptions ={
    lock: true,
    text: '加载中。。。',
    background: 'rgba(255, 255, 255,0.7)',
  }

  export const byLoading = (fn, options = {}) => {
    let loading
    const showLoading = (options) => {
      loading = ElLoading.service(options)
    }
   
    const hideLoading = () => {
      if (loading) {
        loading.close()
      }
    }

    // const _options = Object.assign(defaultOptions, options)
    const mergedOptions = { ...defaultOptions, ...options };
    const newFn =async  (...args) => {
      try {
        showLoading(mergedOptions)
        await nextTick();
        const result = await fn(...args)
        return result
      } catch (err) {
        hideLoading()
        throw err
      }finally{
        await nextTick();
        hideLoading()
      }
    }
    return newFn
}