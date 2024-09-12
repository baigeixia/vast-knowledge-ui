import Cookies from 'js-cookie'
import useUserStore from '@/stores/admin/user'
const TokenKey = 'Admin-Token'

export function getToken() {
  const token =Cookies.get(TokenKey)
  return token ? token : ''
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


const UserInfoKey = 'u-0-1'

export function setUserid(id) {
  return Cookies.set(UserInfoKey, id)
}

export function getUserid() {
  const id =Cookies.get(UserInfoKey)
  if(id){
    useUserStore.isnotlogin=true
  }
  return id ? id : ''
}


export function removeUserid() {
  return Cookies.remove(UserInfoKey)
}
