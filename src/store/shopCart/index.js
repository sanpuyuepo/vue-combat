// search module store
import { reqShopCart, reqDeleteCartBySkuId, reqUpdateCheckStatus } from '@/api'

const state = {
  shopCartList: []
};

const mutations = {
  GET_SHOP_CART_LIST(state, value) {
    state.shopCartList = value;
  }
};

const actions = {
  async getShopCartList({commit}, parms) {
    let res = await reqShopCart(parms);
    if (res.code === 200) {
      commit('GET_SHOP_CART_LIST', res.data)
    }
  },
  async deleteCartListBySkuId({commit}, skuId) {
    let res = await reqDeleteCartBySkuId(skuId);
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async updateCheckStatus({commit}, {skuId, isChecked}) {
    let res = await reqUpdateCheckStatus(skuId, isChecked);
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
};

// 计算属性：简化数据
const getters = {
  cartList(state) {
    return state.shopCartList[0] || {}
  },
  // cartInfoList(state) {
  //   return state.cart
  // }
};

export default {
  state,
  mutations,
  actions,
  getters
}