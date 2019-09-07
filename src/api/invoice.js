import request from '@/utils/request'

// 分页查询发货单 列表
export function queryInvoicePage() {
  return request({
    url: 'api/queryInvoicePage',
    method: 'get'
  })
}

// 初始化发货单编号
export function initInvoiceCode() {
  return request({
    url: 'api/initInvoiceCode',
    method: 'get'
  })
}

// 添加发货单
export function add(data) {
  return request({
    url: 'api/invoice',
    method: 'post',
    data
  })
}

// 修改发货单
export function edit(data) {
  return request({
    url: 'api/invoice',
    method: 'put',
    data
  })
}

// 删除发货单
export function del(id) {
  return request({
    url: 'api/invoice/' + id,
    method: 'delete'
  })
}

// 查询发货单详情
export function getInvoiceInfo(id) {
  return request({
    url: 'api/invoice/' + id,
    method: 'get'
  })
}

