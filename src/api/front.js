import request from '@/utils/request'

export function pageList(params) {
  return request({
    url: '/front/article/page',
    method: 'get',
    params: params
  })
}


export function getById(id) {
  return request({
    url: '/front/article/details',
    method: 'get',
    params: { id }
  })
}


