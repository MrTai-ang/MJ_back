import request from '@/utils/request'

export const ArticleListAPI = (params) => {
  return request.get('/admin/interview/query', { params })
}

// 添加面经
export const addArticleAPI = (data) => {
  return request.post('/admin/interview/create', data)
}
export const deleteArticleAPI = id => {
  return request({
    url: '/admin/interview/remove',
    method: 'DELETE',
    data: { id }

  })
}
// 获取单个面经详情
export const ArticleAPI = (id) => {
  return request({ url: '/admin/interview/show', params: { id } })
}

// 修改面经
export const updateArticleAPI = (data) => {
  return request({ method: 'PUT', url: '/admin/interview/update', data })
}
