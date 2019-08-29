import request from '@/utils/request'

// 分页查询产品统计列表
export function queryProductCountPage() {
  return request({
    url: 'api/queryProductCountPage',
    method: 'get'
  })
}

// 新增产品统计
export function add(data) {
  return request({
    url: 'api/productCount',
    method: 'post',
    data
  })
}

// 修改产品统计数据
export function edit(data) {
  return request({
    url: 'api/productCount',
    method: 'put',
    data
  })
}

// 删除产品统计
export function del(id) {
  return request({
    url: 'api/productCount/' + id,
    method: 'delete'
  })
}

// 查询客户订单详情
export function getProductCountInfo(id) {
  return request({
    url: 'api/productCount/' + id,
    method: 'get'
  })
}
