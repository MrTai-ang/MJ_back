import request from '@/utils/request.js'

export const loginAPI = (data) => {
  return request.post('/auth/login', data)
}

// 获取人员相关信息
export const getUserAPI = () => {
  return request.get('/auth/currentUser')
}

export const getLineAPI = () => {
  return request.get('/analysis/DailyVisitTrend')
}
