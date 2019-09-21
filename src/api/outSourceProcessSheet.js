import request from '@/utils/request'

// 初始化委外加工单单据编号
export function initOutSourceProcessSheetCode() {
  return request({
    url: 'api/initOutSourceProcessSheetCode',
    method: 'get'
  })
}

// 分页查询委外加工单列表
export function queryOutSourceProcessSheetPage() {
  return request({
    url: 'api/queryOutSourceProcessSheetPage',
    method: 'get'
  })
}

// 添加委外加工单
export function add(data) {
  return request({
    url: 'api/outSourceProcessSheet',
    method: 'post',
    data
  })
}

// 修改委外加工单
export function edit(data) {
  return request({
    url: 'api/outSourceProcessSheet',
    method: 'put',
    data
  })
}

// 删除委外加工单
export function del(id) {
  return request({
    url: 'api/outSourceProcessSheet/' + id,
    method: 'delete'
  })
}

// 查询委外加工单详情
export function getCustomerOrderInfo(id) {
  return request({
    url: 'api/outSourceProcessSheet/' + id,
    method: 'get'
  })
}
