import request from '@/utils/request'

// 初始化委外公司编号
export function initOutSourceCompanyCode() {
  return request({
    url: 'api/initOutSourceCompanyCode',
    method: 'get'
  })
}

// 分页查询委外公司资料列表
export function queryOutSourceCompanyInfoPage() {
  return request({
    url: 'api/queryOutSourceCompanyInfoPage',
    method: 'get'
  })
}

// 查询委外公司资料列表
export function queryOutSourceCompanyInfoList() {
  return request({
    url: 'api/queryOutSourceCompanyInfoList',
    method: 'get'
  })
}

// 添加客委外公司资料
export function add(data) {
  return request({
    url: 'api/outSourceCompanyInfo',
    method: 'post',
    data
  })
}

// 修改客委外公司资料
export function edit(data) {
  return request({
    url: 'api/outSourceCompanyInfo/update',
    method: 'put',
    data
  })
}

// 删除委外公司资料
export function del(id) {
  return request({
    url: 'api/outSourceCompanyInfo/' + id,
    method: 'delete'
  })
}

// 查询委外公司资料
export function getOutSourceCompanyInfoById(id) {
  return request({
    url: 'api/outSourceCompanyInfo/' + id,
    method: 'get'
  })
}
