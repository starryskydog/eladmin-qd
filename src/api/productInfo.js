import request from '@/utils/request'

// 分页查询计量单位
export function getMeasureUnit() {
  return request({
    url: 'api/measureUnit',
    method: 'get'
  })
}

// 添加计量单位
export function add(data) {
  return request({
    url: 'api/measureUnit',
    method: 'post',
    data
  })
}

// 修改计量单位
export function edit(data) {
  return request({
    url: 'api/measureUnit',
    method: 'put',
    data
  })
}

// 删除计量单位
export function del(id) {
  return request({
    url: 'api/measureUnit/' + id,
    method: 'delete'
  })
}
