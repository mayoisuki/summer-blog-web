import request from '@/utils/request'

export function pageList(params) {
  return request({
    url: '/category/page',
    method: 'get',
    params: params
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/category/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: '/category/getById',
    method: 'get',
    params: { id }
  })
}

export function removeById(id) {
  return request({
    url: '/category/removeById',
    method: 'post',
    params: { id }
  })
}

export function tree() {
  return request({
    url: '/category/tree',
    method: 'get'
  })
}
