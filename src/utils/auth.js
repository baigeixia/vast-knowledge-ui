import Cookies from 'js-cookie'
import useUserStore from '@/stores/admin/user'
const TokenKey = 'user-authorization'

export function getToken() {
  const token =Cookies.get(TokenKey)
  return token ? token : ''
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{
    secure: true,
    domain: '.aidighub.com',
    path: '/',
    expires: 7   
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


const UserInfoIdKey = 'u-0-1'

export function setUserid(id) {
  return Cookies.set(UserInfoIdKey, id,{
    sameSite: 'None', 
    secure: true,
  })
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
  return Cookies.set(UserInfoKey, JSON.stringify(info) || '',{
    sameSite: 'None', 
    secure: true,
  })
}


export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
