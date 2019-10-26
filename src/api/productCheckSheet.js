import request from '@/utils/request'

export function initQualityCheckSheetCode() {
  return request({
    url: 'api/initQualityCheckSheetCode',
    method: 'get'
  })
}

export function qualityCheckSheetPageList() {
  return request({
    url: 'api/qualityCheckSheetPageList',
    method: 'get'
  })
}

export function qualityCheckSheet(id) {
  return request({
    url: `api/qualityCheckSheet/${id}`,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/qualityCheckSheet',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/qualityCheckSheet/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/qualityCheckSheet',
    method: 'put',
    data
  })
}
