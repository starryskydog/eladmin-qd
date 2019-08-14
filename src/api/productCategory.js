import request from '@/utils/request'

// 分页查询产品类别
export function getProductCategory() {
  return request({
    url: 'api/productCategory',
    method: 'get'
  })
}

// 添加产品类别
export function add(data) {
  return request({
    url: 'api/productCategory',
    method: 'post',
    data
  })
}

// 修改产品类别
export function edit(data) {
  return request({
    url: 'api/productCategory',
    method: 'put',
    data
  })
}

// 删除产品类别
export function del(id) {
  return request({
    url: 'api/productCategory/' + id,
    method: 'delete'
  })
}
