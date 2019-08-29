import request from '@/utils/request'

// 初始化客户订单编号
export function initCustomerOrderCode() {
  return request({
    url: 'api/initCustomerOrderCode',
    method: 'get'
  })
}

// 分页查询客户订单列表
export function queryCustomerOrderPage() {
  return request({
    url: 'api/queryCustomerOrderPage',
    method: 'get'
  })
}

// 添加客户订单
export function add(data) {
  return request({
    url: 'api/customerOrder',
    method: 'post',
    data
  })
}

// 修改客户订单
export function edit(data) {
  return request({
    url: 'api/customerOrder',
    method: 'put',
    data
  })
}

// 删除客户订单
export function del(id) {
  return request({
    url: 'api/customerOrder/' + id,
    method: 'delete'
  })
}

// 查询客户订单详情
export function getCustomerOrderInfo(id) {
  return request({
    url: 'api/customerOrder/' + id,
    method: 'get'
  })
}
