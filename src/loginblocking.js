import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/stores/admin/user'

router.beforeEach((to, from, next) => {
    NProgress.start();
    let path=to.path;
    if (path === '/' || path.startsWith('/post')){
        next();
    }else{
        const userStore = useUserStore();
        const token = getToken();
        console.log('token',token);
        if (token) {
            userStore.isnotlogin=false;
            next();
        }else{
            userStore.isnotlogin=true;
            next({ ...to, replace: true }) 
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});

