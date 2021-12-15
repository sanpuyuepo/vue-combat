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
  deleteAllCheckedCart({dispatch, getters}) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      if (item.isChecked == 1) {
        let promise = dispatch('deleteCartListBySkuId', item.skuId)
        promiseAll.push(promise);
      }
    });
    return Promise.all(promiseAll);
  },

  async updateCheckStatus({commit}, {skuId, isChecked}) {
    let res = await reqUpdateCheckStatus(skuId, isChecked);
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // updateAllCheckStatus
  updateAllCheckStatus({dispatch, state}, checked) {
    let promiseAll = [];
    console.log(state.shopCartList[0].cartInfoList);
    state.shopCartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckStatus', {skuId: item.skuId, isChecked: checked})
        promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
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