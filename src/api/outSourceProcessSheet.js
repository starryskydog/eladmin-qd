import request from '@/utils/request'

export function initOutSourceProcessSheetCode() {
  return request({
    url: 'api/initOutSourceProcessSheetCode',
    method: 'get',
  })
}

export function queryOutSourceProcessSheetPage() {
  return request({
    url: 'api/queryOutSourceProcessSheetPage',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/outSourceProcessSheet',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/outSourceProcessSheet/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/dept',
    method: 'put',
    data
  })
}
