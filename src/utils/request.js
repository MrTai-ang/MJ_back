import axios from 'axios'
import router from '@/router'
import store from '@/store/index'

// 下面是克隆一份新的axios
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net'
//   timeout: 5000
})
// 添加请求拦截器
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么 --- 配置请求头
    const token = store.state.user.token
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 直接提取真实的响应，然后返回。后面组件中再使用的时候，就不用解构赋值了，直接可以得到真实的响应结果了
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 下面判断，服务器如果有返回结果，则...............

    if (error.response && error.response.status === 401) {
      store.commit('user/updateToken', '')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default request
