// 专门处理user用户

// 引入axios
import axios from '@/api/axios_box.js'

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

// 实现用户编辑
export const editUser = data => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: { email: data.email, mobile: data.mobile }
  })
}
