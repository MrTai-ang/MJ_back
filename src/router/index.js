import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
// import Article from '@/views/article/HtIndex.vue'
// import Dashboard from '@/views/dashboard/HtIndex.vue'
// import Layout from '@/views/layout/HtIndex.vue'
// import Login from '@/views/login/HtIndex.vue'

// (路由懒加载，函数不调用不执行，当访问哈希地址时，这个函数才调用,路由才加载)
// 导入所需路由，按需导入，需要哪个组件临时导入
// const Login = () => {
//   return ('@/views/login/HtIndex.vue')
// }
// const Login=()=>import('@/views/login/HtIndex.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向,希望打开就是数据看板
    redirect: '/dashboard',
    component: () => import('@/views/layout/HtIndex.vue'),
    children: [
      { path: 'article', component: () => import('@/views/article/HtIndex.vue') },
      { path: 'dashboard', component: () => import('@/views/dashboard/HtIndex.vue') }
    ]
  },
  { path: '/login', component: () => import('@/views/login/HtIndex.vue') }

]

const router = new VueRouter({
  routes
})

// 导航守卫：如果没有登录则不许访问其他页面
router.beforeEach((to, from, next) => {
  // to.path 要访问的地址
  // from.path 你从哪里来
  // next()--放行  next('/login')---不放行，并跳转到登录
  if (to.path !== '/login' && store.state.user.token === '') {
    next('/login') // 跳转到登录区
    return
  }
  next()
})

export default router
