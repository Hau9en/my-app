// 专门处理role管理

import axios from '@/api/axios_box.js'

export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
// 添加指定权限
export const grantRightForRole = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}
// 添加角色
export const addrole = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data: data
  })
}
