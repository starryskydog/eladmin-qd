import request from '@/utils/request'

// 分页查询仓库设置
export function queryWareHousePage() {
  return request({
    url: 'api/queryWareHousePage',
    method: 'get'
  })
}

// 查询仓库列表
export function queryWareHouseList() {
  return request({
    url: 'api/queryWareHouseList',
    method: 'get'
  })
}

// 初始化仓库编号
export function initWareHouseCode() {
  return request({
    url: 'api/initWareHouseCode',
    method: 'get'
  })
}

// 添加仓库设置
export function add(data) {
  return request({
    url: 'api/wareHouse',
    method: 'post',
    data
  })
}

// 修改仓库设置
export function edit(data) {
  return request({
    url: 'api/wareHouse',
    method: 'put',
    data
  })
}

// 删除仓库设置
export function del(id) {
  return request({
    url: 'api/wareHouse/' + id,
    method: 'delete'
  })
}
