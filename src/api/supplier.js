import request from '@/utils/request'

// 初始化供应商编号
export function initCode() {
  return request({
    url: 'api/initSupplierCode',
    method: 'get'
  })
}

// 分页查询供应商资料列表
export function getSupplierInfo() {
  return request({
    url: 'api/querySupplierInfoPage',
    method: 'get'
  })
}

// 添加供应商资料
export function add(data) {
  return request({
    url: 'api/supplier',
    method: 'post',
    data
  })
}

// 修改供应商资料
export function edit(data) {
  return request({
    url: 'api/supplier',
    method: 'put',
    data
  })
}

// 删除供应商资料
export function del(id) {
  return request({
    url: 'api/supplier/' + id,
    method: 'delete'
  })
}
