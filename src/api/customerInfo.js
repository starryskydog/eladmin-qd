import request from '@/utils/request'

// 初始化客户编号
export function initCustomerCode() {
  return request({
    url: 'api/initCustomerCode',
    method: 'get'
  })
}

// 分页查询客户资料列表
export function queryCustomerInfoPage(params) {
  return request({
    url: 'api/queryCustomerInfoPage',
    method: 'get',
    params
  })
}

// 查询客户资料列表
export function queryCustomerInfoList() {
  return request({
    url: 'api/queryCustomerInfoList',
    method: 'get'
  })
}

// 添加客户资料
export function add(data) {
  return request({
    url: 'api/customerInfo',
    method: 'post',
    data
  })
}

// 修改客户资料
export function edit(data) {
  return request({
    url: 'api/customerInfo/update',
    method: 'put',
    data
  })
}

// 删除供客户资料
export function del(id) {
  return request({
    url: 'api/customerInfo/' + id,
    method: 'delete'
  })
}

// 查询客户资料
export function getCustomerInfoById(id) {
  return request({
    url: 'api/customerInfo/' + id,
    method: 'get'
  })
}
