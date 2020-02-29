import request from '@/utils/request'

export function queryMessageList(params) {
  return request({
    url: 'api/queryMessageList',
    method: 'get',
    params
  })
}


export function deleteMessage(id) {
  return request({
    url: `api/message/${id}`,
    method: 'delete'
  })
}
