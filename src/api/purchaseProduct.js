import request from '@/utils/request'

// 分页查询产品采购单
export function queryProductPurchaseOrderPageList(params) {
  return request({
    url: 'api/queryProductPurchaseOrderPageList',
    method: 'get',
    params
  })
}

// 审核产品采购单列表
export function auditProductPurchaseOrder(data) {
  return request({
    url: 'api/auditProductPurchaseOrder',
    method: 'post',
    data
  })
}

// 获取产品采购单编码
export function initProductPurchaseOrderCode() {
  return request({
    url: 'api/initProductPurchaseOrderCode',
    method: 'get'
  })
}

// 根据id获取产品采购单
export function queryProductPurchaseOrderById(id) {
  return request({
    url: `/api/productPurchaseOrder/${id}`,
    method: 'get'
  })
}

// 添加产品采购单
export function add(data) {
  return request({
    url: 'api/productPurchaseOrder',
    method: 'post',
    data
  })
}

// 修改产品采购单
export function edit(data) {
  return request({
    url: 'api/productPurchaseOrder',
    method: 'put',
    data
  })
}

// 删除产品采购单
export function del(id) {
  return request({
    url: 'api/productPurchaseOrder/' + id,
    method: 'delete'
  })
}
