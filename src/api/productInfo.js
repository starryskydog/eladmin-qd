import request from '@/utils/request'

// 初始化产品资料编号
export function initProductCode() {
  return request({
    url: 'api/initProductInfoCode',
    method: 'get'
  })
}
