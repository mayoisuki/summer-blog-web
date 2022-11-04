import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    params: params
  })
}

export function register(params) {
  return request({
    url: '/register',
    method: 'post',
    params: params
  })
}

export function getCurrentUser(token) {
  return request({
    url: '/getCurrentUser',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/logout',
    method: 'get',
    params: { token }
  })
}
