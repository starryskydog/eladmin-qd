import request from '@/utils/request'

// 获取所有的菜单树
export function getMeasureUnit() {
  return request({
    url: 'api/measureUnit',
    method: 'get'
  })
}

// 添加单位
export function add(data) {
  return request({
    url: 'api/measureUnit',
    method: 'post',
    data
  })
}

// 修改单位
export function edit(data) {
  return request({
    url: 'api/measureUnit',
    method: 'put',
    data
  })
}
