import { systemRequest } from '@/utils/request'


export function securityLogin({email,password,waitCode,codeOrPas,uuid}) {
    return systemRequest({
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
  return systemRequest({
    url: '/user/logout',
    method: 'DELETE',
  })
}



export function getcodeimgApi() {
  return systemRequest({
    url: '/system/code',
    method: 'GET',
  })
}