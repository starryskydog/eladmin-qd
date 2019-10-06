import request from '@/utils/request'

// 分页查询耗材
export function queryConsumablesInfoPageList(params) {
  return request({
    url: 'api/queryConsumablesInfoPageList',
    method: 'get',
    params
  })
}

// 查询耗材列表
export function queryConsumablesInfoList() {
  return request({
    url: 'api/queryConsumablesInfoList',
    method: 'get'
  })
}

// 添加耗材
export function add(data) {
  return request({
    url: 'api/consumablesInfo',
    method: 'post',
    data
  })
}

// 修改耗材
export function edit(data) {
  return request({
    url: 'api/consumablesInfo',
    method: 'put',
    data
  })
}

// 删除耗材
export function del(id) {
  return request({
    url: 'api/consumablesInfo/' + id,
    method: 'delete'
  })
}
