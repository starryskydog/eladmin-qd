import request from '@/utils/request'

// 分页查询供应商类别
export function querySupplierCategoryPage() {
  return request({
    url: 'api/querySupplierCategoryPage',
    method: 'get'
  })
}

// 添加供应商类别
export function add(data) {
  return request({
    url: 'api/supplierCategory',
    method: 'post',
    data
  })
}

// 修改供应商类别
export function edit(data) {
  return request({
    url: 'api/supplierCategory',
    method: 'put',
    data
  })
}

// 删除供应商类别
export function del(id) {
  return request({
    url: 'api/supplierCategory/' + id,
    method: 'delete'
  })
}
