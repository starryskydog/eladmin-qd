import request from '@/utils/request'

export function initOutSourceInspectionCertificateCode() {
  return request({
    url: 'api/initOutSourceInspectionCertificateCode',
    method: 'get'
  })
}

export function queryOutSourceInspectionCertificatePageList() {
  return request({
    url: 'api/queryOutSourceInspectionCertificatePageList',
    method: 'get'
  })
}

export function queryOutSourceInspectionCertificateById(id) {
  return request({
    url: `api/outSourceInspectionCertificate/${id}`,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/outSourceInspectionCertificate',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/outSourceInspectionCertificate/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/outSourceInspectionCertificate',
    method: 'put',
    data
  })
}
