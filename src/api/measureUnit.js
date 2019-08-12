import request from '@/utils/request'

// 获取所有的菜单树
export function getMeasureUnit() {
  return request({
    url: 'api/measureUnit',
    method: 'get'
  })
}
