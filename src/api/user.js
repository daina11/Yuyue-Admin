import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8080/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:8080/getUserinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:8080/loginOut',
    method: 'post',
  
  })
}
  export function register(data) {
    return request({
      url: 'http://localhost:8080/register',
      method: 'post',
      data
    })
}
