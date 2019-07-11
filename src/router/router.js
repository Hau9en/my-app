import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/index.vue'
import Role from '@/views/rights/roleList.vue'
import Right from '@/views/rights/rightList.vue'
import Goods from '@/views/goods/goods.vue'
import List from '@/views/goods/list.vue'
import Add from '@/views/goods/add.vue'

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
        },
        {
          name: 'Role',
          path: 'roles',
          component: Role
        },
        {
          name: 'Right',
          path: 'rights',
          component: Right
        },
        {
          name: 'Goods',
          path: 'goods',
          component: Goods,
          redirect: { name: 'List' },
          children: [
            {
              name: 'List',
              path: 'lists',
              component: List
            },
            {
              name: 'Add',
              path: 'add',
              component: Add
            }
          ]
        }
      ]
    }
  ]
})

export default router
