// 引入axios
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么？ 手动传递token
    var token = localStorage.getItem('my_app_token')
    // console.log(config)
    // 必须在请求头中使用 Authorization字段提供 token
    config.headers.Authorization = token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default axios
