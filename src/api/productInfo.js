import request from '@/utils/request'

// 初始化产品资料编号
export function initProductCode() {
  return request({
    url: 'api/initProductInfoCode',
    method: 'get'
  })
}

// 添加产品资料
export function add(data) {
  return request({
    url: 'api/productInfo',
    method: 'post',
    data
  })
}

// 修改产品资料
export function edit(data) {
  return request({
    url: 'api/productInfo',
    method: 'put',
    data
  })
}

// 分页查询产品资料列表
export function queryProductInfoPage() {
  return request({
    url: 'api/queryProductInfoPage',
    method: 'get'
  })
}

// 删除产品资料
export function deleteProductInfoById(id) {
  return request({
    url: 'api/productInfo/' + id,
    method: 'delete'
  })
}

// 查询产品资料
export function getProductInfoById(id) {
  return request({
    url: 'api/productInfo/' + id,
    method: 'get'
  })
}

