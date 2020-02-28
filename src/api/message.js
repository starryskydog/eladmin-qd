import request from '@/utils/request'

export function queryMessageList(data) {
  return request({
    url: 'api/queryMessageList',
    method: 'get',
    data
  })
}
