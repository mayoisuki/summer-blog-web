import request from '@/utils/request'

export function pageList(params) {
  return request({
    url: '/article/page',
    method: 'get',
    params: params
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/article/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: '/article/getById',
    method: 'get',
    params: { id }
  })
}

export function removeById(id) {
  return request({
    url: '/article/removeById',
    method: 'post',
    params: { id }
  })
}
