// 映入axios

import axios from '@/api/axios_box.js'

export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
