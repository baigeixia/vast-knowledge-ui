import Cookies from 'js-cookie'
import useUserStore from '@/stores/admin/user'
const TokenKey = 'user-authorization'

export function getToken() {
  const token =Cookies.get(TokenKey)
  return token ? token : ''
}


// 获取 Cookie 设置的公共函数
function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    secure: isProduction,     // 生产环境启用 Secure（HTTPS）
    path: '/',                // 全路径共享
    expires: 2,               // 2 天有效期
    sameSite: isProduction ? 'Lax' : 'Strict'  // 本地开发 Strict，生产环境 Lax
  };

  // 只在生产环境设置 domain
  if (isProduction) {
    options.domain = '.aidighub.com';
  }

  return options;
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, getCookieOptions())
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


const UserInfoIdKey = 'u-0-1'

export function setUserid(id) {
  return Cookies.set(UserInfoIdKey, id,getCookieOptions())
}

export function getUserid() {
  const id =Cookies.get(UserInfoIdKey)
  if(id){
    useUserStore.isnotlogin=true
  }
  return id ? id : undefined
}


export function removeUserid() {
  return Cookies.remove(UserInfoIdKey,{
    sameSite: 'None', 
    secure: true,
  })
}


const UserInfoKey = 'u-0-2'

export function getUserInfo() {
  const info = Cookies.get(UserInfoKey);
  return info ? JSON.parse(info) : '';
}


export function setUserInfo(info) {
  return Cookies.set(UserInfoKey, JSON.stringify(info) || '',getCookieOptions())
}


export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
