// 映入axios

import axios from '@/api/axios_box.js'

export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
// 获取 左侧菜单按钮
export const getRightMenuList = () => {
  return axios({
    url: `menus`
  })
}
