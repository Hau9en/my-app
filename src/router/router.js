import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/index.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { path: '/home/wel' },
      children: [
        {
          // 嵌套路由不用添加 ‘ / ’ 否则会破环嵌套结构的完整性
          path: 'wel',
          component: Welcome
        },
        {
          name: 'Users',
          path: 'users',
          component: Users
        }
      ]
    }
  ]
})

export default router
