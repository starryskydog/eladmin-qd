import request from '@/utils/request'

// 分页查询产品系列
export function queryProductSeriesPage() {
  return request({
    url: 'api/queryProductSeriesPage  ',
    method: 'get'
  })
}

// 查询产品系列列表
export function queryProductSeriesList() {
  return request({
    url: 'api/queryProductSeriesList',
    method: 'get'
  })
}

// 添加产品系列
export function add(data) {
  return request({
    url: 'api/productSeries',
    method: 'post',
    data
  })
}

// 修改产品系列
export function edit(data) {
  return request({
    url: 'api/productSeries',
    method: 'put',
    data
  })
}

// 删除产品系列
export function del(id) {
  return request({
    url: 'api/productSeries/' + id,
    method: 'delete'
  })
}
