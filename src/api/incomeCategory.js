import request from '@/utils/request'

// 分页查询收入类别
export function queryIncomeCategoryPage() {
  return request({
    url: 'api/queryIncomeCategoryPage',
    method: 'get'
  })
}

// 添加收入类别
export function add(data) {
  return request({
    url: 'api/incomeCategory',
    method: 'post',
    data
  })
}

// 修改收入类别
export function edit(data) {
  return request({
    url: 'api/incomeCategory',
    method: 'put',
    data
  })
}

// 删除收入类别
export function del(id) {
  return request({
    url: 'api/incomeCategory/' + id,
    method: 'delete'
  })
}
