import { systemRequest } from '@/utils/request'


export function securityLogin({email,password,waitCode,codeOrPas}) {
    return systemRequest({
      url: '/auth/security/login',
      method: 'POST',
      data: {
        email,
        password,
        waitCode,
        codeOrPas
      }
    })
}