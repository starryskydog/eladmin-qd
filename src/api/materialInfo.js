import request from '@/utils/request'

// 初始化物料资料编号
export function initMaterialInfoCode() {
  return request({
    url: 'api/initMaterialInfoCode',
    method: 'get'
  })
}

// 添加物料资料
export function add(data) {
  return request({
    url: 'api/materialInfo',
    method: 'post',
    data
  })
}

// 修改物料资料
export function edit(data) {
  return request({
    url: 'api/materialInfo/update',
    method: 'put',
    data
  })
}

// 分页查询物料资料列表
export function queryMaterialInfoPage() {
  return request({
    url: 'api/queryMaterialInfoPage',
    method: 'get'
  })
}

// 删除物料资料
export function deleteMaterialInfoById(id) {
  return request({
    url: 'api/materialInfo/' + id,
    method: 'delete'
  })
}

// 查询物料资料
export function getMaterialInfoById(id) {
  return request({
    url: 'api/materialInfo/' + id,
    method: 'get'
  })
}

