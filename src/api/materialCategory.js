import request from '@/utils/request'

// 分页查询物料类别
export function queryMaterialCategoryPage() {
  return request({
    url: 'api/queryMaterialCategoryPage',
    method: 'get'
  })
}

// 添加物料类别
export function add(data) {
  return request({
    url: 'api/materialCategory',
    method: 'post',
    data
  })
}

// 修改物料类别
export function edit(data) {
  return request({
    url: 'api/materialCategory',
    method: 'put',
    data
  })
}

// 删除物料类别
export function del(id) {
  return request({
    url: 'api/materialCategory/' + id,
    method: 'delete'
  })
}
