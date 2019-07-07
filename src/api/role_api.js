// 专门处理role管理

import axios from '@/api/axios_box.js'

export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
