import request from '@/utils/request'

// 分页查询耗材采购单
export function queryConsumablesPurchaseOrderPageList(params) {
  return request({
    url: 'api/queryConsumablesPurchaseOrderPageList',
    method: 'get',
    params
  })
}

// 审核耗材采购单列表
export function auditConsumablesPurchaseOrder(data) {
  return request({
    url: 'api/auditConsumablesPurchaseOrder',
    method: 'post',
    data
  })
}

// 获取耗材采购单编码
export function initConsumablesPurchaseOrderCode() {
  return request({
    url: 'api/initConsumablesPurchaseOrderCode',
    method: 'get'
  })
}

// 根据id获取耗材采购单
export function queryConsumablesPurchaseOrderById(id) {
  return request({
    url: `/api/consumablesPurchaseOrder/${id}`,
    method: 'get'
  })
}

// 添加耗材采购单
export function add(data) {
  return request({
    url: 'api/consumablesPurchaseOrder',
    method: 'post',
    data
  })
}

// 修改耗材采购单
export function edit(data) {
  return request({
    url: 'api/consumablesPurchaseOrder',
    method: 'put',
    data
  })
}

// 删除耗材采购单
export function del(id) {
  return request({
    url: 'api/consumablesPurchaseOrder/' + id,
    method: 'delete'
  })
}
