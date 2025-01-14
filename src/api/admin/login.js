import { request } from '@/utils/request'


export function securityLogin({email,password,waitCode,codeOrPas,uuid}) {
    return request({
      url: '/user/login',
      method: 'POST',
      headers:{
        'uuid-token':uuid,
        'longin-code': waitCode,
      },
      data: {
        email,
        password,
        codeOrPas
      }
    })
}


export function securitylogout() {
  return request({
    url: '/user/logout',
    method: 'DELETE',
  })
}



export function getcodeimgApi() {
  return request({
    url: '/system/code',
    method: 'GET',
  })
}