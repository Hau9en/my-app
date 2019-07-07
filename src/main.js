import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

import router from '@/router/router.js'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加导航守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('my_app_token')
  if (token || to.path === '/login') {
    next()
  } else if (!token || to.path !== 'login') {
    next({ name: 'login' })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
