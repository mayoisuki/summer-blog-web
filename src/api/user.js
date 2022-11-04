import request from '@/utils/request'

export function pageList(params) {
  return request({
    url: '/user/page',
    method: 'get',
    params: params
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/user/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: '/user/getById',
    method: 'get',
    params: { id }
  })
}

export function removeById(id) {
  return request({
    url: '/user/removeById',
    method: 'post',
    params: { id }
  })
}
