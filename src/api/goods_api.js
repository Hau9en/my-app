import axios from '@/api/axios_box.js'

export const getAllGoods = () => {
  return axios({
    url: 'goods'
  })
}
