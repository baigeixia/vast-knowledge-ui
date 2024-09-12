import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import useUserStore from '@/stores/admin/user'

// router.beforeEach((to, from, next) => {
//     NProgress.start();
//     let path=to.path;
//     if (path === '/' || path.startsWith('/post')){
//         next();
//     }else{
//         const userStore = useUserStore();
//         const token = getToken();
//         if (token) {
//             userStore.isnotlogin=false;
//             next();
//         }else{
//             userStore.isnotlogin=true;
//             next({ ...to, replace: true }, () => {
//                 NProgress.done();
//             });
//         }
//     }
// });

router.beforeEach( async  (to, from, next) => {
    NProgress.start();
    next();
    // let path=to.path;
    // if (path === '/' || path.startsWith('/post')){
    //     next();
    // }else{
    //     const userStore = useUserStore();
    //     const token = getToken();
    //     if (token) {
    //         userStore.isnotlogin=false;
    //         next();
    //     }else{
    //         userStore.isnotlogin=true;
    //         if (  to.name !== '/login' ) {
    //             // 将用户重定向到登录页面
    //             next({ name: '/login' })
    //           }else next()

              
    //     }
    // }
});

router.afterEach(() => {
    NProgress.done();
});

