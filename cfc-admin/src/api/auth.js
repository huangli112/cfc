import request from '@/utils/request'

export function login (params) {
  return request.post('/user/login', { requestData: params })
}

export function userLogin (data) {
  return request.post('/user/login', { requestData: data })
}

export function logout () {
  return request.get('/logout')
}

export function modifyPassword (params) {
  return request.post('/modifyPassword', params)
}
