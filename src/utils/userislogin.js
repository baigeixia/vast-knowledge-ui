import { getUserid } from "./auth";
import { ref } from 'vue';


//是否未登录
export const islogin = ref(!!getUserid());
