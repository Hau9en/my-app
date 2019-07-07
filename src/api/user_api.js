// 专门处理user用户

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

// 实现用户登录
export const login = data => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
export const getUserList = pa => {
  return axios({
    url: 'users',
    params: pa
  })
}
export const addUser = data => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}
// 根据用户id 来删除单个用户
export const delUser = id => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}
// 修改用户状态
export const updateUserState = (uid, type) => {
  return axios({
    method: 'put',
    url: `users/${uid}/state/${type}`
  })
}

// 分配用户角色
export const grantUserRole = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: {
      rid
    }
  })
}
