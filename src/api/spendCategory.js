import request from '@/utils/request'

// 分页查询支出类别
export function querySpendCategoryPage() {
  return request({
    url: 'api/querySpendCategoryPage',
    method: 'get'
  })
}

// 添加支出类别
export function add(data) {
  return request({
    url: 'api/spendCategory',
    method: 'post',
    data
  })
}

// 修改支出类别
export function edit(data) {
  return request({
    url: 'api/spendCategory',
    method: 'put',
    data
  })
}

// 删除支出类别
export function del(id) {
  return request({
    url: 'api/spendCategory/' + id,
    method: 'delete'
  })
}
